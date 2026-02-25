import { createContext, useContext } from "react";
import type { GridContextValue } from "./types";

export const GridContext = createContext<GridContextValue | null>(null);

export function useGrid(): GridContextValue {
  const ctx = useContext(GridContext);
  if (!ctx) {
    throw new Error("useGrid must be used within a GridLayout provider");
  }
  return ctx;
}
