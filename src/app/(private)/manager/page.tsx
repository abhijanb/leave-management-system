'use client'

import { useState, useCallback } from "react";
import { useGetStatsQuery, useGetLeavesQuery } from "@/features/manager/managerApi";
import RequestsTable from "@/features/manager/components/RequestsTable"
import StatsCard, { StatsGrid } from "@/features/shared/ui/StatsCard";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import { STATUS_LABELS, MESSAGES } from "@/features/shared/constants/messages";
import { useDebounce } from "@/features/shared/hooks/useDebounce";
import type { StatusFilterValue, TypeFilterValue, SortOrder } from "@/features/shared/types";

const statConfig: { label: string; key: "total" | "pending" | "approved" | "rejected"; color: string; value: StatusFilterValue }[] = [
  { label: "Total Requests", key: "total", color: "text-primary", value: "All" },
  { label: STATUS_LABELS.Pending, key: "pending", color: "text-pending-text-strong", value: STATUS_LABELS.Pending },
  { label: STATUS_LABELS.Approved, key: "approved", color: "text-approved-text-strong", value: STATUS_LABELS.Approved },
  { label: STATUS_LABELS.Rejected, key: "rejected", color: "text-rejected-text-strong", value: STATUS_LABELS.Rejected },
];

export default function ManagerPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<StatusFilterValue>("All");
  const [type, setType] = useState<TypeFilterValue>("All");
  const [employee, setEmployee] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const debouncedEmployee = useDebounce(employee, 300);
  const { data: stats, isLoading: statsLoading, isError: statsError } = useGetStatsQuery();
  const { data: leaves, isLoading: leavesLoading, isError: leavesError } = useGetLeavesQuery({
    page, limit: 10,
    status: status === "All" ? undefined : status,
    type: type === "All" ? undefined : type,
    employee: debouncedEmployee || undefined,
    sortBy: "startDate",
    sortOrder,
  });

  const handleStatus = useCallback((s: StatusFilterValue) => { setStatus(s); setPage(1); }, []);
  const handleType = useCallback((t: TypeFilterValue) => { setType(t); setPage(1); }, []);
  const handleEmployee = useCallback((e: string) => { setEmployee(e); setPage(1); }, []);

  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-on-surface">Dashboard</h2>
        <p className="text-sm text-on-surface-variant">Monitor team presence and approve time-off requests.</p>
      </div>

      <StatsGrid>
        {statConfig.map((stat) => (
          <StatsCard
            key={stat.label}
            label={stat.label}
            value={stats?.[stat.key] ?? 0}
            color={stat.color}
            loading={statsLoading}
            active={status === stat.value}
            onClick={() => handleStatus(stat.value)}
          />
        ))}
      </StatsGrid>

      {statsError && <ErrorMessage message={MESSAGES.errorStats} />}
      {leavesError && <ErrorMessage message={MESSAGES.errorLeaves} />}

      <RequestsTable
        leaves={leaves}
        loading={leavesLoading}
        page={page}
        setPage={setPage}
        status={status}
        setStatus={handleStatus}
        type={type}
        setType={handleType}
        employee={employee}
        setEmployee={handleEmployee}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
      />
    </>
  )
}
