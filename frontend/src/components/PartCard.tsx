import type { Part } from "../types/assembly";

interface PartCardProps {
  part: Part;
  scannedBarcode?: string;
}

export default function PartCard({ part, scannedBarcode }: PartCardProps) {

  const isCompleted = Boolean(scannedBarcode)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">

      <div className="flex h-24 items-center justify-center rounded-md bg-slate-100">
        <span className="text-xs font-medium text-slate-400">
          Part Image
        </span>
      </div>

      <h3 className="mt-2 truncate text-xs font-semibold text-slate-900">
        {part.partType}
      </h3>

      <p className="mt-0.5 truncate text-[10px] text-slate-500">
        {scannedBarcode ?? "---"}
      </p>

      <div
        className={`mt-2 rounded-md px-2 py-1.5 text-center text-[11px] font-semibold ${
          isCompleted
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {isCompleted ? "✓ COMPLETE" : "○ PENDING"}
      </div>

    </div>
  );
}































// import type { Part } from "../types/assembly";

// interface PartCardProps {
//   part: Part;
// }

// export default function PartCard({
//   part,
// }: PartCardProps) {
//   const isComplete = part.status === "COMPLETE";
//   const isFailed = part.status === "FAILED";

//   return (
//     <div className="rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
//       {/* Image */}
//       <div className="flex h-24 items-center justify-center rounded-md bg-slate-100">
//         <span className="text-xs font-medium text-slate-400">
//           Part Image
//         </span>
//       </div>

//       {/* Name */}
//       <h3 className="mt-2 truncate text-xs font-semibold text-slate-900">
//         {part.name}
//       </h3>

//       {/* ID */}
//       <p className="mt-0.5 truncate text-[10px] text-slate-500">
//         {part.id}
//       </p>

//       {/* Status */}
//       <div
//         className={`mt-2 rounded-md px-2 py-1.5 text-center text-[11px] font-semibold ${
//           isComplete
//             ? "bg-green-100 text-green-700"
//             : isFailed
//               ? "bg-red-100 text-red-700"
//               : "bg-yellow-100 text-yellow-700"
//         }`}
//       >
//         {isComplete
//           ? "✓ COMPLETE"
//           : isFailed
//             ? "✕ FAILED"
//             : "○ PENDING"}
//       </div>
//     </div>
//   );
// }
// /*
// LED-001775
// BAT-002901
// BTN-000841
// */