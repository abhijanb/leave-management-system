'use client'

import { useState, useRef, useEffect } from "react";
import { cn } from "@/features/shared/utils/cn";
import { ChevronDown } from "lucide-react";
import { STATUS_OPTIONS } from "@/features/shared/constants/messages";
import type { StatusFilterValue } from "@/features/shared/types";

interface Props {
  value: StatusFilterValue;
  onChange: (status: StatusFilterValue) => void;
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
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-surface border border-outline-variant rounded-lg shadow-lg py-1 min-w-[120px]">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                "w-full text-left px-3 py-1.5 text-xs hover:bg-surface-container-high transition-colors",
                (opt === "All" ? value === "All" : value === opt) ? "text-primary font-medium" : "text-on-surface"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
