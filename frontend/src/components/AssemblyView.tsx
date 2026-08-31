import { products } from "../data/mockPart";
import { useAssemblyStore } from "../store/assemblyStore";
import type { Part } from "../types/assembly";
import PartCard from "./PartCard";

interface AssemblyViewProps {
  parts: Part[];
}

export default function AssemblyView({
  parts,
}: AssemblyViewProps) {

  const currentAssembly = useAssemblyStore(
    (state) => state.currentAssembly
  );

  const scannedParts = useAssemblyStore(
    (state) => state.scannedParts
  );

  const product = currentAssembly 
                  ? products.find((product) => product.productCode === currentAssembly?.productCode)
                  : products[0]

  const requiredPartType = product?.requiredPartTypes ?? [];


  return (
    <section className="min-w-0 flex-1">

      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Product
        </p>

        <h1 className="text-xl font-bold text-slate-900">
          Remote Control V1
        </h1>

        <p className="text-xs text-slate-500">
          Assembly:{" "}
          {currentAssembly?.assemblyNumber ?? "Waiting"}
        </p>
      </div>

      <div className="mb-4 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">

        <div className="flex h-32 items-center justify-center rounded-md bg-slate-100">
          <span className="text-sm font-semibold text-slate-400">
            Main Frame Image
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">

          <h2 className="text-sm font-semibold text-slate-900">
            Main Frame
          </h2>

          <p className="text-xs text-slate-500">
            {currentAssembly?.barcode ?? "---"}
          </p>

        </div>
      </div>

      <div>

        <h2 className="mb-2 text-sm font-semibold text-slate-900">
          Components
        </h2>

        <div className="grid grid-cols-4 gap-3">

          {requiredPartType.map((partType) => {

            const part = parts.find(
              (part) => part.partType === partType
            )
            if(!part) return null;

            const scannedPart = scannedParts.find(
              (scannedPart) =>
                scannedPart.partType === partType
            );

            return (
              <PartCard
                key={partType}
                part={part}
                scannedBarcode={scannedPart?.barcode}
              />
            );
          })}

        </div>

      </div>

    </section>
  );
}