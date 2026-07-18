'use client'

import { useGetEmployeeLeavesQuery } from "@/features/employee/employeeApi";
import ActivityItem from "@/features/shared/ui/ActivityItem";
import ErrorMessage from "@/features/shared/ui/ErrorMessage";
import DataState from "@/features/shared/ui/DataState";
import { memo } from "react";

function RecentActivity() {
  const { data: leaves, isLoading, isError } = useGetEmployeeLeavesQuery({ page: 1, limit: 5, sortBy: "startDate", sortOrder: "desc" });

  const leavesData = leaves?.data ?? [];

  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <h2 className="text-sm font-semibold text-on-surface">Recent Activity</h2>
      </div>
      <div className="divide-y divide-outline-variant">
        {isError ? (
          <ErrorMessage message="Failed to load recent activity." />
        ) : (
          <DataState loading={isLoading} empty={leavesData.length === 0}>
            {leavesData.map((row) => <ActivityItem key={row.id} leave={row} />)}
          </DataState>
        )}
      </div>
    </div>
  );
}

export default memo(RecentActivity);
