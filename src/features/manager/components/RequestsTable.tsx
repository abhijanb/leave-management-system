'use client'

import type { LeavesResponse } from "../managerApi";
import { useApproveLeaveMutation, useRejectLeaveMutation } from "../managerApi";
import Pagination from "@/features/shared/ui/Pagination";
import Tooltip from "@/features/shared/ui/Tooltip";
import StatusBadge from "@/features/shared/ui/StatusBadge";
import StatusFilter from "./StatusFilter";
import TypeFilter from "./TypeFilter";
import DataState from "@/features/shared/ui/DataState";
import { cn } from "@/features/shared/utils/cn";
import { ChevronUp, Search } from "lucide-react";
import { formatDate } from "@/features/shared/utils/date";
import { STATUS_LABELS } from "@/features/shared/constants/messages";
import type { StatusFilterValue, TypeFilterValue, SortOrder } from "@/features/shared/types";
import { memo } from "react";

interface Props {
  leaves: LeavesResponse | undefined;
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  status: StatusFilterValue;
  setStatus: (status: StatusFilterValue) => void;
  type: TypeFilterValue;
  setType: (type: TypeFilterValue) => void;
  employee: string;
  setEmployee: (employee: string) => void;
  sortOrder: SortOrder;
  onSortToggle: () => void;
}

function RequestsTable({ leaves, loading, page, setPage, status, setStatus, type, setType, employee, setEmployee, sortOrder, onSortToggle }: Props) {
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
              <th className="p-4 font-medium">
                <div className="flex items-center gap-2">
                  <span>Employee</span>
                  <div className="relative">
                    <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={employee}
                      onChange={(e) => setEmployee(e.target.value)}
                      className="pl-6 pr-2 py-1 text-xs bg-background border border-outline-variant rounded-md text-on-surface placeholder-outline focus:outline-none focus:border-primary w-28"
                    />
                  </div>
                </div>
              </th>
              <th className="p-4 font-medium">
                <TypeFilter value={type} onChange={setType} />
              </th>
              <th className="p-4 font-medium">
                <button onClick={onSortToggle} className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
                  Dates
                  <ChevronUp className={cn("w-3 h-3 transition-transform", sortOrder === "asc" ? "" : "rotate-180")} />
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
            <DataState loading={loading} empty={rows.length === 0} colSpan={6}>
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low">
                  <td className="p-4">
                    <div className="font-medium text-on-surface">{row.user.name}</div>
                    <div className="text-xs text-on-surface-variant">{row.user.role}</div>
                  </td>
                  <td className="p-4 text-on-surface">{row.type}</td>
                  <td className="p-4 text-on-surface">{formatDate(row.startDate)} — {formatDate(row.endDate)}</td>
                  <td className="p-4 text-on-surface text-xs whitespace-nowrap">
                    <Tooltip content={row.reason}>
                      <span className="max-w-40 inline-block truncate cursor-default">{row.reason}</span>
                    </Tooltip>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="p-4 text-right">
                    {row.status === STATUS_LABELS.Pending ? (
                      <div className="flex gap-1 justify-end">
                        <button
                          onClick={() => approve(row.id)}
                          className="px-2 py-1 text-xs font-medium bg-approved-bg text-approved-text rounded hover:opacity-80"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(row.id)}
                          className="px-2 py-1 text-xs font-medium bg-rejected-bg-strong text-on-error rounded hover:opacity-80"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-on-surface-variant">—</span>
                    )}
                  </td>
                </tr>
              ))}
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
  )
}

export default memo(RequestsTable);
