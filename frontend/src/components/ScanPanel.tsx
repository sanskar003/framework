// import { useState } from "react";
// import type { PartStatus } from "../types/assembly";

// interface ScanPanelProps {
//   onScan: (barcode: string) => void;
//   scannedBarcode: string;
//   scannedPartName: string;
//   status: PartStatus | null;
//   message: string;
// }

// export default function ScanPanel({
//   onScan,
//   scannedBarcode,
//   scannedPartName,
//   status,
//   message,
// }: ScanPanelProps) {
//   const [barcode, setBarcode] = useState("");

//   function handleSubmit(
//     event: React.FormEvent<HTMLFormElement>,
//   ) {
//     event.preventDefault();

//     if (!barcode.trim()) {
//       return;
//     }

//     onScan(barcode.trim());

//     setBarcode("");
//   }

//   return (
//     <section className="w-full lg:w-[380px]">
//       <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
//         <h2 className="text-lg font-semibold text-slate-900">
//           Scan Part
//         </h2>

//         <p className="mt-1 text-sm text-slate-500">
//           Enter or scan the component barcode.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-6"
//         >
//           <label
//             htmlFor="barcode"
//             className="mb-2 block text-sm font-medium text-slate-700"
//           >
//             Barcode
//           </label>

//           <input
//             id="barcode"
//             value={barcode}
//             onChange={(event) =>
//               setBarcode(event.target.value)
//             }
//             autoFocus
//             placeholder="Scan barcode..."
//             className="w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
//           />

//           <button
//             type="submit"
//             className="mt-3 w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700"
//           >
//             Scan
//           </button>
//         </form>

//         {/* Latest scan */}
//         {scannedBarcode && (
//           <div className="mt-8 border-t border-slate-200 pt-6">
//             <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
//               Scanned Part
//             </p>

//             <p className="mt-1 text-lg font-bold text-slate-900">
//               {scannedBarcode}
//             </p>

//             {scannedPartName && (
//               <p className="mt-1 text-sm text-slate-500">
//                 {scannedPartName}
//               </p>
//             )}

//             {status && (
//               <div
//                 className={`mt-4 rounded-lg px-4 py-3 text-center font-semibold ${
//                   status === "COMPLETE"
//                     ? "bg-green-100 text-green-700"
//                     : status === "FAILED"
//                       ? "bg-red-100 text-red-700"
//                       : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {status}
//               </div>
//             )}

//             {message && (
//               <p className="mt-3 text-center text-sm text-slate-600">
//                 {message}
//               </p>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }