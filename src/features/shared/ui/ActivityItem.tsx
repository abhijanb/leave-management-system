import { Clock, CheckCircle, XCircle } from "lucide-react";
import type { LeaveResponse } from "@/features/manager/managerApi";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/features/shared/utils/cn";
import { statusStyles } from "@/features/shared/constants/status";
import type { LeaveStatus } from "@/features/shared/types";

const statusIconMap: Record<LeaveStatus, React.ComponentType<{ className?: string }>> = {
  Pending: Clock,
  Approved: CheckCircle,
  Rejected: XCircle,
};

interface Props {
  leave: LeaveResponse;
}

export function ActivityItem({ leave }: Props) {
  const Icon = statusIconMap[leave.status] ?? Clock;

  return (
    <div className="p-4 hover:bg-surface-container-low transition-colors flex items-start gap-3">
      <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", statusStyles[leave.status])}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold text-on-surface truncate">{leave.type}</h3>
          <StatusBadge status={leave.status} />
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5">
          {leave.startDate} — {leave.endDate}
        </p>
        <p className="text-xs text-on-surface-variant mt-0.5 truncate" title={leave.reason}>{leave.reason}</p>
      </div>
    </div>
  );
}
