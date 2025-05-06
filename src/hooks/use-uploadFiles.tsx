import { api } from "@/api";
import { useState } from "react";
import { toast } from "sonner";

export const useUploadFiles = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const uploadFiles = async (files: File[]) => {
    setLoading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        await api.post("/files/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast("Fichier téléversé", {
          description: `Fichier ${i + 1} sur ${files.length} terminé : ${
            file.name
          }`,
        });
      }

      setSuccess(true);
    } catch (e) {
      console.error("Upload failed", e);
      setError("Erreur lors de l'upload des fichiers");
      toast("Erreur lors du téléversement", {
        description: "Une erreur est survenue lors de l'upload des fichiers",
      });
    } finally {
      setLoading(false);
    }
  };

  return { uploadFiles, progress, loading, error, success };
};
