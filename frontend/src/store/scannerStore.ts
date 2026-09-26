import { create } from "zustand";
import { getAssemblyByParentBarcode, addPartToAssembly, getProductByProductCode } from "../services/api";
import { useAssemblyStore } from "./assemblyStore";

// import { parents } from "../data/mockPart";
// import { findPartByBarcode, findProduct, validateChildPart } from "../services/helper";

interface ScannerStore {
  barcode: string;
  message: string;
  isProcessing: boolean;

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
  isProcessing: false,

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

  scanParent: async () => {
  const barcode = useScannerStore.getState().barcode;

  try {
    const response = await getAssemblyByParentBarcode(barcode);
    const assembly = response.data;
    if (assembly.status === "COMPLETE") {
      set({
        message: "Assembly is completed. Scan next Parent part",
        barcode: "",
      });
      
      return;
    }

    const productResponse = await getProductByProductCode(assembly.productCode)
    const product = productResponse.data
    console.log("product: ",product)
    
    console.log("Assembly response:", response);
    const { setCurrentAssembly, setScannedParts, setProduct } = useAssemblyStore.getState();
    setCurrentAssembly(assembly);
    setScannedParts([]);
    setProduct(product)
    set({
      barcode: "",
      message: "",
    });

  } catch (error) {
    console.log("Error:", error);
    set({
      message: "Unable to find assembly",
      barcode: "",
    });
  }
},

scanChild: async () => {
  const barcode = useScannerStore.getState().barcode;

  const {
    currentAssembly,
    setCurrentAssembly,
    setScannedParts,
    setIsCompleted,
  } = useAssemblyStore.getState();

  if (!currentAssembly) {
    set({
      message: "Please scan the Parent part first",
    });
    return;
  }

  set({isProcessing: true})
  try {
    const response = await addPartToAssembly(
      currentAssembly.parentBarcode,
      barcode
    );

    console.log("Child response:", response);
    const assembly = response.data.assembly;

    setCurrentAssembly(assembly);
    setScannedParts(assembly.children);
    set({barcode: ""})

    if(assembly.status === "COMPLETE"){
      setIsCompleted(true);
      set({message: "Assembly completed successfully"})
    }else{
      set({message: "Part added successfully"})
    }

  } catch (error) {
    console.log("Child scan error:", error);

     set({
      message: error instanceof Error
        ? error.message
        : "Unable to add part",
      barcode: "",
  });
  } finally {
    set({ isProcessing: false })
  }
},
  
  setIsProcessing: (value: boolean) => 
    set({ isProcessing: value }),

}));