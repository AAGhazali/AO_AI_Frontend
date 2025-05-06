import { api } from "@/api";
import { useUpload } from "@/contexts/upload/upload-context";
import { Ao } from "@/types/AO";
import { AoDto } from "@/types/AO-dto";
import { AOAssembler } from "@/utils/AO-assembler";
import { useCallback, useEffect, useState } from "react";
import { AOEvent } from "./use-reportGeneration";

export const useFetchAOs = () => {
  const [data, setData] = useState<Ao[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { timeToRefetch, setTimeToRefetch } = useUpload();

  const fetchAOs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<AoDto[]>("/aos");
      const newAOs = response.data.map((ao) => AOAssembler.fromDto(ao));

      setData([...newAOs]);
    } catch (e) {
      console.error(e);
      setError("Erreur lors de la récupération des AO");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOneAO = useCallback((ao: AOEvent) => {
    setData((prevData) => {
      const updatedData = prevData.map((item) => {
        if (item.id === ao.ao_id) {
          return {
            ...item,
            state: AOAssembler.AOStateFromKey(ao.state),
          };
        }
        return item;
      });
      return updatedData;
    });
  }, []);

  useEffect(() => {
    fetchAOs();
  }, [fetchAOs]);

  useEffect(() => {
    if (timeToRefetch) {
      fetchAOs();
      setTimeToRefetch(false);
    }
  }, [timeToRefetch, fetchAOs, setTimeToRefetch]);

  return { data, updateOneAO, loading, error };
};
