import { api } from "@/api";
import { useAOs } from "@/contexts/ao/ao-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export type AOEvent = {
  event_type: "AO_NEW_STATE" | "GENERATION_COMPLETE";
  state: "DONE" | "PENDING" | "IN_PROGRESS";
  ao_id: string;
};

type IsLockedResponse = {
  is_locked: boolean;
};

export function useReportGeneration() {
  const [loading, setLoading] = useState(false);
  const { updateOneAO } = useAOs();
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  const startGeneration = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get<IsLockedResponse>("/reports/status");

      if (res.data.is_locked) {
        toast("Génération déjà en cours", {
          description:
            "Une autre génération est actuellement en traitement. Veuillez patienter.",
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      console.error("Erreur lors de la vérification du verrou :", e);
      toast("Erreur réseau", {
        description: "Impossible de vérifier l’état de génération.",
      });
      setError("Erreur réseau");
      setLoading(false);
      return;
    }

    const url = `${api.defaults.baseURL}/reports`;
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const ao_event: AOEvent = JSON.parse(event.data);

        if (ao_event.event_type === "AO_NEW_STATE") {
          updateOneAO(ao_event);
        }

        if (ao_event.event_type === "GENERATION_COMPLETE") {
          eventSource.close();
          setLoading(false);
          toast("Génération terminée", {
            description: "Tous les rapports ont été générés avec succès.",
          });
        }
      } catch (err) {
        console.error("Erreur de parsing SSE:", err);
      }
    };

    eventSource.onerror = (err) => {
      if (eventSource.readyState === EventSource.CLOSED) return;

      console.error("Erreur SSE:", err);
      setError("Erreur de connexion SSE");
      toast("Erreur SSE", {
        description: "La connexion a été interrompue.",
      });
      setLoading(false);
      eventSource.close();
    };
  }, [updateOneAO]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    if (loading) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [loading]);

  return {
    startGeneration,
    loading,
    error,
  };
}
