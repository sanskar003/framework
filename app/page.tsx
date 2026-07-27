"use client"

import { nunito } from "./ui/fonts";
import { useState } from "react";

let list = [
  { no: 1, item: "Optimizing Fonts and Images" },
  { no: 2, item: "Creating Layout and Pages" },
  { no: 3, item: "Navigating between Pages" },
  { no: 4, item: "Setting up Database" },
  { no: 5, item: "Fetching Data" },
  { no: 6, item: "Dynamic and Static Rendering" },
  { no: 7, item: "Streaming" },
  { no: 8, item: "Adding Search and Pagination" },
  { no: 9, item: "Mutating data" },
  { no: 10, item: "Handaling Errors" },
  { no: 11, item: "Improving Accessibility" },
  { no: 12, item: "Adding Authentication" },
  { no: 13, item: "Adding Metadata" },
]



export default function Home() {

  return (
    <div className={`${nunito.className} flex flex-col items-center gap-6 p-6`}>
      <h1 className="text-3xl font-bold text-red-600">
        The NEXT.JS lists
      </h1>

      <section className="w-full max-w-xl">
        <h3 className="mb-3 text-xl font-semibold">Topics to cover</h3>

        <h3>totalDone </h3>
        <ol className="space-y-1.5 rounded-2xl bg-black/10 p-4">
          {list.map((val, key) => (
            <li
              key={key}
              className="flex items-center justify-between rounded-lg bg-white/50 p-2"
            >
              <span>{val.item}</span>
              <button >
                <input type="checkbox" className="h-5 w-5 cursor-pointer" />
              </button>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
