'use client'

import { useGetEmployeeStatsQuery } from "@/features/employee/employeeApi";
import LeaveHistoryTable from "@/features/employee/components/LeaveHistoryTable";
import SummaryItem from "@/features/shared/ui/SummaryItem";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import { MESSAGES } from "@/features/shared/constants/messages";
import { Calendar, CalendarX, CalendarCheck } from "lucide-react";

export default function LeaveHistoryPage() {
  const { data: stats, isLoading: statsLoading, isError: statsError } = useGetEmployeeStatsQuery();

  return (
    <div className="space-y-6">
      {/* Summary Strip */}
      <div className="bg-surface border border-outline-variant rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-6">
        <SummaryItem icon={Calendar} label="Total Allowed" value={`${stats?.totalAllowed ?? 20} Days`} loading={statsLoading} />
        <div className="w-px h-8 bg-outline-variant" />
        <SummaryItem icon={CalendarX} label="Used Leave" value={`${stats?.used ?? 0} Days`} loading={statsLoading} />
        <div className="w-px h-8 bg-outline-variant" />
        <SummaryItem icon={CalendarCheck} label="Available" value={`${stats?.available ?? 20} Days`} valueClassName="text-primary" loading={statsLoading} />
      </div>

      {statsError && <ErrorMessage message={MESSAGES.errorStats} />}

      {/* Table */}
      <LeaveHistoryTable />
    </div>
  );
}
