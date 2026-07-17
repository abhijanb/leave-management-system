import { cn } from "@/features/shared/utils/cn";

const columns = [
  { label: "Type" },
  { label: "Applied On" },
  { label: "Date Range" },
  { label: "Duration" },
  { label: "Reason" },
  { label: "Status" },
  { label: "Actions", align: "right" as const },
];

export function TableHead() {
  return (
    <thead>
      <tr className="border-b border-outline-variant text-left text-xs text-on-surface-variant uppercase tracking-wider">
        {columns.map((col) => (
          <th key={col.label} className={cn("p-4 font-medium", col.align === "right" && "text-right")}>
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
