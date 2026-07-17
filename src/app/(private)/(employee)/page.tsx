'use client'

import { useAppSelector } from "@/features/shared/app/hooks";
import { useGetStatsQuery } from "@/features/employee/employeeApi";
import { StatsGrid, StatsCard } from "@/features/shared/ui/StatsCard";
import { RecentActivity } from "@/features/employee/components/RecentActivity";
import { ErrorMessage } from "@/features/shared/ui/ErrorMessage";
import { STATUS_LABELS, MESSAGES } from "@/features/shared/constants/messages";

export default function EmployeePage() {
  const auth = useAppSelector((s) => s.auth);
  const { data: stats, isLoading: statsLoading, isError: statsError } = useGetStatsQuery();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Welcome back, {auth.email?.split("@")[0]}</h1>
        <p className="text-sm text-on-surface-variant mt-1">Manage your leave requests and track their status.</p>
      </div>

      <StatsGrid>
        <StatsCard label="Total Requests" value={stats?.total ?? 0} color="text-primary" loading={statsLoading} />
        <StatsCard label={STATUS_LABELS.Pending} value={stats?.pending ?? 0} color="text-pending-text-strong" loading={statsLoading} />
        <StatsCard label={STATUS_LABELS.Approved} value={stats?.approved ?? 0} color="text-approved-text-strong" loading={statsLoading} />
        <StatsCard label={STATUS_LABELS.Rejected} value={stats?.rejected ?? 0} color="text-rejected-text-strong" loading={statsLoading} />
      </StatsGrid>

      {statsError && <ErrorMessage message={MESSAGES.errorStats} />}

      <RecentActivity />
    </div>
  )
}
