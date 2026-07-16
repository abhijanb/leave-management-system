'use client'

import { useState } from "react";
import { useGetStatsQuery, useGetLeavesQuery } from "@/features/manager/managerApi";
import { RequestsTable } from "@/features/manager/components/RequestsTable"
import { StatsGrid, StatsCard } from "@/features/shared/ui/StatsCard";

const statConfig = [
  { label: "Total Requests", key: "total" as const, color: "text-primary", value: "" },
  { label: "Pending", key: "pending" as const, color: "text-amber-600", value: "Pending" },
  { label: "Approved", key: "approved" as const, color: "text-emerald-600", value: "Approved" },
  { label: "Rejected", key: "rejected" as const, color: "text-rose-600", value: "Rejected" },
];

export default function ManagerPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();
  const { data: leaves, isLoading: leavesLoading } = useGetLeavesQuery({
    page, limit: 10,
    status: status || undefined,
    sortBy: "startDate",
    sortOrder,
  });

  const handleStatus = (s: string) => { setStatus(s); setPage(1); };

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

      <RequestsTable
        leaves={leaves}
        loading={leavesLoading}
        page={page}
        setPage={setPage}
        status={status}
        setStatus={handleStatus}
        sortOrder={sortOrder}
        onSortToggle={() => setSortOrder((o) => o === "asc" ? "desc" : "asc")}
      />
    </>
  )
}
