'use client'

import type { LeavesResponse } from "../managerApi";
import { useApproveLeaveMutation, useRejectLeaveMutation } from "../managerApi";
import type { LeaveResponse } from "../managerApi";
import { Pagination } from "@/features/shared/ui/Pagination";
import { Tooltip } from "@/features/shared/ui/Tooltip";
import { StatusFilter } from "./StatusFilter";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

interface Props {
  leaves: LeavesResponse | undefined;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  status: string;
  setStatus: (status: string) => void;
  sortOrder: "asc" | "desc";
  onSortToggle: () => void;
}

export function RequestsTable({ leaves, loading, page, setPage, status, setStatus, sortOrder, onSortToggle }: Props) {
  const [approve] = useApproveLeaveMutation();
  const [reject] = useRejectLeaveMutation();

  const rows = leaves?.data ?? [];
  const total = leaves?.total ?? 0;
  const totalPages = leaves?.totalPages ?? 1;

  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant text-left text-xs text-on-surface-variant uppercase tracking-wider">
              <th className="p-4 font-medium">Employee</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">
                <button onClick={onSortToggle} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                  Dates
                  <svg className={`w-3 h-3 transition-transform ${sortOrder === "asc" ? "" : "rotate-180"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </th>
              <th className="p-4 font-medium">Reason</th>
              <th className="p-4 font-medium">
                <StatusFilter value={status} onChange={setStatus} />
              </th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">Loading...</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-sm text-on-surface-variant">No leave requests yet.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low">
                  <td className="p-4">
                    <div className="font-medium text-on-surface">{row.user.name}</div>
                    <div className="text-xs text-on-surface-variant">{row.user.role}</div>
                  </td>
                  <td className="p-4 text-on-surface">{row.type}</td>
                  <td className="p-4 text-on-surface">{row.startDate} — {row.endDate}</td>
                  <td className="p-4 text-on-surface text-xs whitespace-nowrap">
                    <Tooltip content={row.reason}>
                      <span className="max-w-40 inline-block truncate cursor-default">{row.reason}</span>
                    </Tooltip>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[row.status] ?? ""}`}>{row.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    {row.status === "Pending" ? (
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => approve(row.id)}
                          className="px-2 py-1 text-xs font-medium bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(row.id)}
                          className="px-2 py-1 text-xs font-medium bg-rose-600 text-white rounded hover:bg-rose-700"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-on-surface-variant">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
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
  )
}
