import { create } from "zustand";
// import { parents } from "../data/mockPart";
import { persist } from "zustand/middleware";
import type { Assembly, Part, Product } from "../types/assembly";

// type Parent = (typeof parents)[number];

export type CompletedAssembly = {
  assemblyNumber: string;
  parentBarcode: string;
  productCode: string;
  parts: Part[];
  completedAt: Date;
};

interface AssemblyStore {
  currentAssembly: Assembly | null;
  scannedParts: Part[];

  isCompleted: boolean;
  completedAssemblies: CompletedAssembly[];
  product: Product | null;

  setCurrentAssembly: (assembly: Assembly | null) => void;

  setScannedParts: (
    parts: Part[] | ((currentParts: Part[]) => Part[])
  ) => void;

  setIsCompleted: (value: boolean) => void;

  addCompletedAssembly: (assembly: CompletedAssembly) => void;

  setProduct: (product: Product | null) => void;
}


export const useAssemblyStore = create<AssemblyStore>()(
  persist(
    (set) => ({
      currentAssembly: null,
      scannedParts: [],

      isCompleted: false,
      completedAssemblies: [],
      product: null,

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

      setProduct: (product) =>
        set({ product })

    }), { name: "assembly-tracker-storage" }
  )
);


// export const useAssemblyStore = create<AssemblyStore>((set) => ({
//   currentAssembly: null,
//   scannedParts: [],

//   isCompleted: false,
//   completedAssemblies: [],
//   product: null,

//   setCurrentAssembly: (assembly) =>
//     set({
//       currentAssembly: assembly,
//     }),

//   setScannedParts: (parts) =>
//     set((state) => ({
//       scannedParts:
//         typeof parts === "function"
//           ? parts(state.scannedParts)
//           : parts,
//     })),

//   setIsCompleted: (value) =>
//     set({
//       isCompleted: value,
//     }),

//   addCompletedAssembly: (assembly) =>
//     set((state) => ({
//       completedAssemblies: [
//         ...state.completedAssemblies,
//         assembly,
//       ],
//     })),

//     setProduct: (product) => 
//       set({ product })
// }));