import { useAssemblyStore } from "../store/assemblyStore";
import { useScannerStore } from "../store/scannerStore";

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
  )

  const scanChild = useScannerStore(
    (state) => state.scanChild
  )

  const currentAssembly = useAssemblyStore(
    (state) => state.currentAssembly
  )


  return (
    <div className="mb-4">

      <label className="mb-2 block text-sm font-medium text-slate-700">
        Scan Barcode
      </label>

      <div className="flex gap-2">

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
          className="rounded-xl bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700"
        >
          Scan
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