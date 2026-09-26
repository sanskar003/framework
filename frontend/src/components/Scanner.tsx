import { useAssemblyStore } from "../store/assemblyStore";
import { useScannerStore } from "../store/scannerStore";
import ButtonLoader from "./ButtonLoader";

function Scanner() {
  const barcode = useScannerStore(
    (state) => state.barcode
  );

  const message = useScannerStore(
    (state) => state.message
  );

  const setBarcode = useScannerStore(
    (state) => state.setBarcode
  );

  const scanParent = useScannerStore(
    (state) => state.scanParent
  );

  const scanChild = useScannerStore(
    (state) => state.scanChild
  );

  const currentAssembly = useAssemblyStore(
    (state) => state.currentAssembly
  );

  const isProcessing = useScannerStore(
    (state) => state.isProcessing
  )

  return (
    <div className="mb-4">

      <label className="mb-2 text-sm font-medium text-slate-700">
        Scan Barcode
      </label>

      <div>Barcode scanner view</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-1 sm:gap-2">

        <input
          type="text"
          value={barcode}
          onChange={(e) =>
            setBarcode(e.target.value)
          }
          placeholder="Scan or enter barcode"
          autoFocus
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          onClick={currentAssembly ? scanChild : scanParent}
          disabled={isProcessing}
          className="rounded-xl w-[100px] h-[45px] bg-blue-400 px-6 py-2 font-semibold text-white shadow-[0_3px_0_#1e40af] transition-all hover:bg-blue-500 active:translate-y-[2px] active:shadow-none cursor-pointer"
        >
          {isProcessing ? <ButtonLoader/> : "Scan"}
        </button>

      </div>

      {message && (
        <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3">
          <p className="text-sm font-medium text-slate-800">
            {message}
          </p>
        </div>
      )}

    </div>
  );
}

export default Scanner;