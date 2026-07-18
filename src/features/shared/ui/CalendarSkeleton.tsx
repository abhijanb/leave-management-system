import { memo } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarSkeleton() {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className="grid grid-cols-7 border-b border-outline-variant">
        {DAYS.map((d) => (
          <div key={d} className="p-2 text-xs font-medium text-center text-on-surface-variant">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="min-h-16 md:min-h-24 p-1 border-r border-b border-outline-variant last:border-r-0">
            <div className="w-6 h-4 rounded bg-surface-container-high animate-pulse mb-2" />
            <div className="space-y-1">
              <div className="h-3 rounded bg-surface-container-high animate-pulse" />
              <div className="h-3 rounded bg-surface-container-high animate-pulse w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(CalendarSkeleton);
