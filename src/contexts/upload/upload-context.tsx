import { createContext, useContext } from "react";

interface UploadContextType {
  loading: boolean;
  uploadAndRefetch: (files: File[]) => Promise<void>;
  timeToRefetch: boolean;
  setTimeToRefetch: (value: boolean) => void;
}

export const UploadContext = createContext<UploadContextType | undefined>(
  undefined
);

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};
