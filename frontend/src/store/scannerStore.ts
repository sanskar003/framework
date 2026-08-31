import { create } from "zustand";
import { parents } from "../data/mockPart";
import { findPartByBarcode, findProduct, validateChildPart } from "../services/helper";
import { useAssemblyStore } from "./assemblyStore";

interface ScannerStore {
  barcode: string;
  message: string;

  setBarcode: (barcode: string) => void;
  setMessage: (message: string) => void;

  clearBarcode: () => void;
  clearMessage: () => void;

  scanParent: () => void;
  scanChild: () => void;
}

export const useScannerStore = create<ScannerStore>((set) => ({
  barcode: "",
  message: "",

  setBarcode: (barcode) =>
    set({
      barcode,
    }),

  setMessage: (message) =>
    set({
      message,
    }),

  clearBarcode: () =>
    set({
      barcode: "",
    }),

  clearMessage: () =>
    set({
      message: "",
    }),

  scanParent: () => {
    const barcode = useScannerStore.getState().barcode;

    const parent = parents.find(
      (parent) => parent.barcode === barcode
    );

    if (!parent) {
      set({
        message: "Parent part not found.",
      });

      return;
    }

    const { completedAssemblies, setCurrentAssembly, setScannedParts } = useAssemblyStore.getState()

    const alreadyCompleted = completedAssemblies.some(
      (assembly) => assembly.parentBarcode === parent.barcode
    )
    if(alreadyCompleted){
      set({ message: "Parent is already scanned", barcode: "" })
      return;
    }

    setCurrentAssembly(parent);
    setScannedParts([]);

    set({
      barcode: "",
      message: `Assembly ${parent.assemblyNumber} selected successfully.`,
    });
  },

  scanChild: () => {
    const barcode = useScannerStore.getState().barcode;
    const { currentAssembly, scannedParts, completedAssemblies, setScannedParts, setIsCompleted, addCompletedAssembly } = useAssemblyStore.getState();

    const part = findPartByBarcode(barcode);
    if(!part){
      set({ message: "Barcode not found" })
      return;
    }

    if(!currentAssembly){
      set({ message: "Please scan the Parent part first" });
      return;
    }

    const product = findProduct(currentAssembly.productCode);
    if(!product){
      set({ message: "Product configuration not found" });
      return;
    }

    const validateMessage = validateChildPart({ part, product, scannedParts, completedAssemblies });
    if(validateMessage){
      set({ message: validateMessage });
      return;
    }

    setScannedParts((currentParts) => {
      const updatedParts = [...currentParts, part];
      const isNowCompleted = updatedParts.length === product.requiredPartTypes.length;

      if(isNowCompleted){
        setIsCompleted(true);
        set({ message : "Assembly completed successfully" });

        addCompletedAssembly({
          assemblyNumber: currentAssembly.assemblyNumber,
          parentBarcode: currentAssembly.barcode,
          parts: updatedParts,
          completedAt: new Date(),
        })
      }else{
        set({ message: `${part.partType} accepted successfully` })
      }

      return updatedParts;
    });

    set({ barcode: "" });
  }

}));