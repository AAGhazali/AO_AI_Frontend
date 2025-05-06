// src/contexts/ao/ao-context.ts
import { useFetchAOs } from "@/hooks/use-fetchao";
import { createContext, useContext } from "react";

const AoContext = createContext<ReturnType<typeof useFetchAOs> | undefined>(
  undefined
);

export const AoProvider = ({ children }: { children: React.ReactNode }) => {
  const ao = useFetchAOs();
  return <AoContext.Provider value={ao}>{children}</AoContext.Provider>;
};

export const useAOs = () => {
  const context = useContext(AoContext);
  if (!context) {
    throw new Error("useAOs must be used within an AoProvider");
  }
  return context;
};
