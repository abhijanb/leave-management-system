'use client'

import { useGetLeavesQuery } from "@/features/employee/employeeApi";
import { ActivityItem } from "@/features/shared/ui/ActivityItem";

export function RecentActivity() {
  const { data: leaves, isLoading } = useGetLeavesQuery({ page: 1, limit: 5, sortBy: "startDate", sortOrder: "desc" });

  const leavesData = leaves?.data ?? [];

  return (
    <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
      <div className="p-4 border-b border-outline-variant">
        <h2 className="text-sm font-semibold text-on-surface">Recent Activity</h2>
      </div>
      <div className="divide-y divide-outline-variant">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-on-surface-variant">Loading...</div>
        ) : leavesData.length === 0 ? (
          <div className="p-8 text-center text-sm text-on-surface-variant">No leave requests yet.</div>
        ) : (
          leavesData.map((row) => <ActivityItem key={row.id} leave={row} />)
        )}
      </div>
    </div>
  );
}
