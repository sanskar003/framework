import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ShowScannedPart from "./components/ShowScannedPart";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <MainPage/> }/>
        <Route path="/dashboard" element={ <ShowScannedPart/> }/>
      </Routes>
    </BrowserRouter>
  )
}




// import { parents, parts } from "./data/mockPart"
// import { useEffect } from "react"
// import { useAssemblyStore } from "./store/assemblyStore";
// import { useScannerStore } from "./store/scannerStore";
// import AssemblyView from "./components/AssemblyView";
// import Scanner from "./components/Scanner";
// import ShowScannedPart from "./components/ShowScannedPart"

// export type completedAssembly = {
//   assemblyNumber: string;
//   parentBarcode: string;
//   parts: (typeof parts)[number][];
//   completedAt: Date;
// }

// export default function App(){

// const currentAssembly = useAssemblyStore(
//   (state) => state.currentAssembly
// );

// const scannedParts = useAssemblyStore(
//   (state) => state.scannedParts
// );

// const setCurrentAssembly = useAssemblyStore(
//   (state) => state.setCurrentAssembly
// );

// const setScannedParts = useAssemblyStore(
//   (state) => state.setScannedParts
// );

// const clearBarcode = useScannerStore(
//   (state) => state.clearBarcode
// )

// const clearMessage = useScannerStore(
//   (state) => state.clearMessage
// )

// const isCompleted = useAssemblyStore(
//   (state) => state.isCompleted
// )

// const setIsCompleted = useAssemblyStore(
//   (state) => state.setIsCompleted
// )
 

//   useEffect(() => {
//   if (!isCompleted) return;

//   const timer = setTimeout(() => {
//     setIsCompleted(false);
//     setCurrentAssembly(null);
//     setScannedParts([]);

//     clearBarcode();
//     clearMessage();
//   }, 3000);

//   return () => clearTimeout(timer);
//     }, [ isCompleted, setIsCompleted, setCurrentAssembly, setScannedParts, clearBarcode, clearMessage ]
//   );


//   return (
//   <main className="h-screen overflow-auto bg-slate-100">
    
//     <div className="flex h-full flex-col">

//       {/* HEADER */}
//       <header className="flex justify-between h-16 shrink-0 items-center border-b bg-white px-6">
//         <div>
//           <h1 className="text-xl font-bold text-slate-900">
//             Assembly Tracker
//           </h1>

//           <p className="text-xs text-slate-500">
//             Remote Control V1
//           </p>
//         </div>
//         <div>
//           <p className="flex gap-2 text-black/50">
//           {parents.map((val) => (
//             <p>{val.barcode}</p>
//           ))}
//           </p>
//           <p className="flex gap-2 text-black/50 text-xs">
//           {parts.map((val) => (
//             <p>{val.barcode}</p>
//           ))}
//           </p> 
//         </div>
//       </header>


//       {/* MAIN CONTENT */}
//       <div className="grid min-h-0 flex-1 grid-cols-2 gap-4 p-4">

//         {/* LEFT - PRODUCT */}
//         <AssemblyView parts={parts}/>


//         {/* RIGHT - SCAN */}
//         <section className="flex min-h-0 flex-col rounded-2xl bg-white p-5 shadow-sm">

//           <h2 className="mb-4 text-lg font-semibold text-slate-900">
//             Scan Station
//           </h2>


//           {/* CURRENT ASSEMBLY */}
//           <div className="mb-4 rounded-xl bg-slate-50 p-4">

//             <p className="text-xs font-medium uppercase text-slate-400">
//               Current Assembly
//             </p>

//             <p className="mt-1 text-xl font-bold text-slate-800">
//               {currentAssembly
//                 ? currentAssembly.assemblyNumber
//                 : "Waiting for parent"}
//             </p>

//             {currentAssembly && (
//               <p className="text-xs text-slate-500">
//                 {currentAssembly.barcode}
//               </p>
//             )}

//           </div>


//           {/* SCANNER */}
//          <Scanner/>

//           {/* SCANNED PARTS */}
//           <div className="min-h-0 flex-1">

//             <div className="mb-3 flex items-center justify-between">

//               <h3 className="font-semibold text-slate-800">
//                 Scanned Parts
//               </h3>

//               <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
//                 {scannedParts.length} / 4
//               </span>

//             </div>


//             <div className="space-y-2">

//               {scannedParts.length === 0 ? (

//                 <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
//                   <p className="text-sm text-slate-400">
//                     No parts scanned yet
//                   </p>
//                 </div>

//               ) : (

//                 <div className="grid grid-cols-2 gap-2">
//                 {scannedParts.map((part) => (
//                   <div
//                     key={part.barcode}
//                     className="flex items-center justify-between rounded-xl border border-slate-200 p-3"
//                   >
//                     <div>
//                       <p className="text-sm font-semibold text-slate-800">
//                         {part.partType}
//                       </p>

//                       <p className="text-xs text-slate-500">
//                         {part.barcode}
//                       </p>
//                     </div>

//                     <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
//                       COMPLETE
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               )}

//             </div>

//           </div>

//         </section>

//       </div>

//     </div>

//     {isCompleted && (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/40">
//       <div className="rounded-2xl bg-white p-8 text-center shadow-xl">
//         <div className="text-4xl">✓</div>

//         <h2 className="mt-3 text-2xl font-bold">
//           Assembly Completed
//         </h2>

//         <p className="mt-2 text-sm text-slate-500">
//           All required parts have been scanned.
//         </p>
//       </div>
//     </div>
//     )}

//   <ShowScannedPart/>
   
//   </main>
// );
// }





































































































// // import { useState } from "react";
// // import AssemblyView from "./components/AssemblyView";
// // import ScanPanel from "./components/ScanPanel";
// // import ScanStats from "./components/ScanStats";
// // import { mockParts } from "./data/mockPart";
// // import type { Part, PartStatus } from "./types/assembly";

// // function App() {
// //   const [parts, setParts] = useState<Part[]>(
// //     mockParts,
// //   );

// //   const [scannedBarcode, setScannedBarcode] =
// //     useState("");

// //   const [scannedPartName, setScannedPartName] =
// //     useState("");

// //   const [status, setStatus] =
// //     useState<PartStatus | null>(null);

// //   const [message, setMessage] = useState("");

// //   const [successCount, setSuccessCount] =
// //     useState(0);

// //   const [failedCount, setFailedCount] =
// //     useState(0);

// //   const [showCompleteModal, setShowCompleteModal] = useState(false);

// //   function handleScan(barcode: string) {
// //     setScannedBarcode(barcode);

// //     const part = parts.find(
// //       (item) => item.id === barcode,
// //     );

// //     // Barcode doesn't exist
// //     if (!part) {
// //       setScannedPartName("");
// //       setStatus("FAILED");
// //       setMessage("Barcode not found.");
// //       setFailedCount((count) => count + 1);
// //       return;
// //     }

// //     // Already scanned
// //     if (part.status === "COMPLETE") {
// //       setScannedPartName(part.name);
// //       setStatus("FAILED");
// //       setMessage("This part has already been scanned.");
// //       setFailedCount((count) => count + 1);
// //       return;
// //     }

// //     // Mark part complete
// //     const updatedParts = parts.map((item) =>
// //       item.id === barcode
// //         ? {
// //           ...item,
// //           status: "COMPLETE" as const,
// //         }
// //         : item,
// //     );

// //     setParts(updatedParts);

// //     setScannedPartName(part.name);

// //     const allComplete = updatedParts.every(
// //       (item) => item.status === "COMPLETE",
// //     );

// //     setStatus(
// //       allComplete ? "COMPLETE" : "PENDING",
// //     );

// //     setMessage(
// //       allComplete
// //         ? "Assembly completed successfully."
// //         : "Part accepted. Waiting for remaining parts.",
// //     );

// //     if (allComplete) {
// //       setShowCompleteModal(true);
// //     }

// //     setSuccessCount((count) => count + 1);
// //   }

// //   return (
// //     <main className="min-h-screen bg-slate-50">
// //       <div className="mx-auto max-w-7xl px-6 py-8">
// //         {/* Header */}
        

// //         {/* Main layout */}
// //         <div className="flex flex-col gap-6 lg:flex-row">
// //           {/* Left */}
// //           <AssemblyView parts={parts} />

// //           {/* Right */}
// //           <div className="flex w-full flex-col gap-4 lg:w-[380px]">
// //             <ScanPanel
// //               onScan={handleScan}
// //               scannedBarcode={scannedBarcode}
// //               scannedPartName={scannedPartName}
// //               status={status}
// //               message={message}
// //             />

// //             <ScanStats
// //               successCount={successCount}
// //               failedCount={failedCount}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       {showCompleteModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
// //           <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
// //             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
// //               <span className="text-3xl text-green-600">
// //                 ✓
// //               </span>
// //             </div>

// //             <h2 className="mt-5 text-2xl font-bold text-slate-900">
// //               Assembly Completed
// //             </h2>

// //             <p className="mt-2 text-sm text-slate-500">
// //               All required components have been successfully
// //               scanned.
// //             </p>

// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }

// // export default App;
