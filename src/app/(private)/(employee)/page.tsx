'use client'

import { useAppSelector } from "@/features/shared/app/hooks";
import { useGetStatsQuery } from "@/features/employee/employeeApi";
import { StatsGrid, StatsCard } from "@/features/shared/ui/StatsCard";
import { RecentActivity } from "@/features/employee/components/RecentActivity";

export default function EmployeePage() {
  const auth = useAppSelector((s) => s.auth);
  const { data: stats, isLoading: statsLoading } = useGetStatsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Welcome back, {auth.email?.split("@")[0]}</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage your leave requests and track their status.</p>
      </div>

      <StatsGrid>
        <StatsCard label="Total Requests" value={stats?.total ?? 0} color="text-primary" loading={statsLoading} />
        <StatsCard label="Pending" value={stats?.pending ?? 0} color="text-amber-600" loading={statsLoading} />
        <StatsCard label="Approved" value={stats?.approved ?? 0} color="text-emerald-600" loading={statsLoading} />
        <StatsCard label="Rejected" value={stats?.rejected ?? 0} color="text-rose-600" loading={statsLoading} />
      </StatsGrid>

      <RecentActivity />
    </div>
  )
}
