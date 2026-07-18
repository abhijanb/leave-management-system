import { cn } from "@/features/shared/utils/cn";
import { memo, useMemo } from "react";

interface Props {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}

function Pagination({ page, totalPages, total, pageSize, onPageChange }: Props) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = useMemo(() => getPageNumbers(page, totalPages), [page, totalPages]);

  return (
    <div className="p-4 border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
      <span>Showing {from}–{to} of {total}</span>
      <div className="flex gap-1 items-center">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-2 py-1 hover:bg-surface-container-high rounded text-xs disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-on-surface-variant">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={cn("px-2 py-1 rounded text-xs font-medium", p === page ? "bg-primary text-on-primary" : "hover:bg-surface-container-high")}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-2 py-1 hover:bg-surface-container-high rounded text-xs disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default memo(Pagination);
