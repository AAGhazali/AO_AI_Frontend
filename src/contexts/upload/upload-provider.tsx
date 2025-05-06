import { useUploadFiles } from "@/hooks/use-uploadFiles";
import { ReactNode, useState } from "react";
import { UploadContext } from "./upload-context";

export const UploadProvider = ({ children }: { children: ReactNode }) => {
  const { uploadFiles } = useUploadFiles();
  const [loading, setLoading] = useState(false);
  const [timeToRefetch, setTimeToRefetch] = useState<boolean>(false);

  const uploadAndRefetch = async (files: File[]) => {
    setLoading(true);
    try {
      await uploadFiles(files);
      setTimeToRefetch(true);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadContext.Provider
      value={{ loading, uploadAndRefetch, timeToRefetch, setTimeToRefetch }}
    >
      {children}
    </UploadContext.Provider>
  );
};
