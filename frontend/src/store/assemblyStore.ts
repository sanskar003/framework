import { create } from "zustand";
import { parents } from "../data/mockPart";
import type { Part } from "../types/assembly";

type Parent = (typeof parents)[number];

export type CompletedAssembly = {
  assemblyNumber: string;
  parentBarcode: string;
  parts: Part[];
  completedAt: Date;
};

interface AssemblyStore {
  currentAssembly: Parent | null;
  scannedParts: Part[];

  isCompleted: boolean;
  completedAssemblies: CompletedAssembly[];

  setCurrentAssembly: (assembly: Parent | null) => void;

  setScannedParts: (
    parts: Part[] | ((currentParts: Part[]) => Part[])
  ) => void;

  setIsCompleted: (value: boolean) => void;

  addCompletedAssembly: (
    assembly: CompletedAssembly
  ) => void;
}

export const useAssemblyStore = create<AssemblyStore>((set) => ({
  currentAssembly: null,
  scannedParts: [],

  isCompleted: false,
  completedAssemblies: [],

  setCurrentAssembly: (assembly) =>
    set({
      currentAssembly: assembly,
    }),

  setScannedParts: (parts) =>
    set((state) => ({
      scannedParts:
        typeof parts === "function"
          ? parts(state.scannedParts)
          : parts,
    })),

  setIsCompleted: (value) =>
    set({
      isCompleted: value,
    }),

  addCompletedAssembly: (assembly) =>
    set((state) => ({
      completedAssemblies: [
        ...state.completedAssemblies,
        assembly,
      ],
    })),
}));