'use client'

import { useState, useRef, useEffect } from "react";

const options = ["All", "Pending", "Approved", "Rejected"];

interface Props {
  value: string;
  onChange: (status: string) => void;
}

export function StatusFilter({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 text-xs text-on-surface hover:text-primary transition-colors"
      >
        Status
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-surface border border-outline-variant rounded-lg shadow-lg py-1 min-w-[120px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt === "All" ? "" : opt); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-surface-container-high transition-colors ${(opt === "All" ? !value : value === opt) ? "text-primary font-medium" : "text-on-surface"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
