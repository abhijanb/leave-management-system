'use client'

import { useGetLeavesQuery } from "@/features/employee/employeeApi";
import { Pagination } from "@/features/shared/ui/Pagination";
import { TableHead } from "./TableHead";
import { ErrorMessage } from "@/features/shared/ui/ErrorMessage";
import { DataState } from "@/features/shared/ui/DataState";
import { LeaveHistoryRow } from "./LeaveHistoryRow";
import { useState } from "react";
import { cn } from "@/features/shared/utils/cn";
import { ChevronUp } from "lucide-react";
import { STATUS_OPTIONS, TYPE_OPTIONS, MESSAGES } from "@/features/shared/constants/messages";
import type { SortOrder, StatusFilterValue, TypeFilterValue } from "@/features/shared/types";

export function LeaveHistoryTable() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilterValue>("All");
  const [type, setType] = useState<TypeFilterValue>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const { data: leaves, isLoading, isError } = useGetLeavesQuery({
    page,
    limit: 10,
    sortBy: "startDate",
    sortOrder,
    ...(status !== "All" && { status }),
    ...(type !== "All" && { type }),
  });

  const rows = leaves?.data ?? [];
  const total = leaves?.total ?? 0;
  const totalPages = leaves?.totalPages ?? 1;

  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className="p-4 border-b border-outline-variant flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs text-on-surface-variant mb-1 block">Leave Type</label>
          <select
            value={type}
            onChange={(e) => { setType(e.target.value as TypeFilterValue); setPage(1); }}
            className="w-full border border-outline-variant rounded-lg px-3 py-1.5 text-sm bg-surface focus:ring-1 focus:ring-primary focus:border-primary"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[140px]">
          <label className="text-xs text-on-surface-variant mb-1 block">Status</label>
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value as StatusFilterValue); setPage(1); }}
            className="w-full border border-outline-variant rounded-lg px-3 py-1.5 text-sm bg-surface focus:ring-1 focus:ring-primary focus:border-primary"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
          className="flex items-center gap-1 px-3 py-1.5 text-sm border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors"
        >
          Date
          <ChevronUp className={cn("w-3 h-3 transition-transform", sortOrder === "asc" ? "" : "rotate-180")} />
        </button>
      </div>

      {isError && <ErrorMessage message={MESSAGES.errorLeaves} />}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <TableHead />
          <tbody className="divide-y divide-outline-variant">
            <DataState loading={isLoading} empty={rows.length === 0} colSpan={7}>
              {rows.map((row) => <LeaveHistoryRow key={row.id} row={row} />)}
            </DataState>
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={10}
        onPageChange={setPage}
      />
    </div>
  );
}
