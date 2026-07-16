import { Clock, CheckCircle, XCircle } from "lucide-react";
import type { LeaveResponse } from "@/features/manager/managerApi";

const statusStyles: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Approved: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
};

const iconBg: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-600",
  Approved: "bg-emerald-100 text-emerald-600",
  Rejected: "bg-rose-100 text-rose-600",
};

const statusIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
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
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg[leave.status] ?? ""}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold text-on-surface truncate">{leave.type}</h3>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${statusStyles[leave.status] ?? ""}`}>{leave.status}</span>
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5">
          {leave.startDate} — {leave.endDate}
        </p>
        <p className="text-xs text-on-surface-variant mt-0.5 truncate" title={leave.reason}>{leave.reason}</p>
      </div>
    </div>
  );
}
