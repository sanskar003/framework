import { Link } from "react-router-dom"
import { useState } from "react";
import { useAssemblyStore } from "../store/assemblyStore";

export default function ShowScannedPart() {
    const completedAssemblies = useAssemblyStore(
        (state) => state.completedAssemblies
    );

    const totalAssemblies = completedAssemblies.length;

    const totalParts = completedAssemblies.reduce(
        (total, assembly) => total + assembly.parts.length,
        0
    );

    return (
        <section className="min-w-0 flex-1 bg-slate-50 p-6">

            {/* Header */}
            <div className="mb-6 w-full flex justify-between items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    Assembly Dashboard
                    </p>

                    <h1 className="mt-1 text-2xl font-bold text-slate-900">
                        Completed Assemblies
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Overview of completed assemblies and their scanned components.
                    </p>
                </div>

                <div>
                    <Link
                        to="/"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        ← Scanner
                    </Link>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Completed Assemblies
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {totalAssemblies}
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                        ✓ Successfully completed
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Parts Scanned
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {totalParts}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Across all assemblies
                    </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Product
                    </p>

                    <p className="mt-2 text-lg font-bold text-slate-900">
                        Remote Control V1
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        4 required components
                    </p>
                </div>

            </div>

            {/* Assembly List */}
            <div className="space-y-3">

                {completedAssemblies.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            No completed assemblies yet.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Scan all required parts to complete an assembly.
                        </p>
                    </div>
                ) : (
                    completedAssemblies.map((assembly) => (
                        <AssemblyCard
                            key={assembly.assemblyNumber}
                            assembly={assembly}
                        />
                    ))
                )}

            </div>

        </section>
    );
}


function AssemblyCard({
    assembly,
}: {
    assembly: {
        assemblyNumber: string;
        parentBarcode: string;
        parts: {
            partType: string;
            partNumber: string;
            barcode: string;
        }[];
        completedAt: Date;
    };
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Clickable Header */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50"
            >

                <div className="flex items-center gap-4">

                    {/* Expand Icon */}
                    <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""
                            }`}
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-slate-900">
                                {assembly.assemblyNumber}
                            </h2>

                            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                                ✓ COMPLETED
                            </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-500">
                            Parent Barcode:{" "}
                            <span className="font-semibold text-slate-700">
                                {assembly.parentBarcode}
                            </span>
                        </p>
                    </div>

                </div>

                <div className="hidden text-right sm:block">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                        Completed
                    </p>

                    <p className="text-xs font-medium text-slate-600">
                        {new Date(assembly.completedAt).toLocaleString()}
                    </p>
                </div>

            </button>


            {/* Expandable Content */}
            {isOpen && (
                <div className="border-t border-slate-200 bg-slate-50/50 p-5">

                    <div className="mb-3 flex items-center justify-between">

                        <div>
                            <h3 className="text-sm font-bold text-slate-900">
                                Scanned Components
                            </h3>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Parts used to complete this assembly
                            </p>
                        </div>

                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            {assembly.parts.length} Parts
                        </span>

                    </div>


                    {/* Parts */}
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">

                        {assembly.parts.map((part) => (
                            <div
                                key={part.barcode}
                                className="rounded-lg  border border-slate-200 bg-blue-white p-4 shadow-sm"
                            >

                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-600">
                                        {part.partType
                                            .split("_")
                                            .map((word) => word[0])
                                            .join("")
                                            .slice(0, 2)}
                                    </div>

                                    <span className="rounded-full bg-green-100 px-2 py-1 text-[9px] font-bold text-green-700">
                                        ✓ SCANNED
                                    </span>
                                </div>

                                <p className="text-xs font-bold text-slate-900">
                                    {part.partType}
                                </p>

                                <p className="mt-1 text-[11px] text-slate-500">
                                    {part.partNumber}
                                </p>

                                <div className="mt-3 rounded-md bg-slate-100 px-2.5 py-2">
                                    <p className="font-mono text-[11px] font-semibold text-slate-700">
                                        {part.barcode}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            )}

        </div>
    );
}
