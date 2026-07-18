import { cn } from "@/features/shared/utils/cn";
import { statusStyles } from "@/features/shared/constants/status";
import type { LeaveStatus } from "../types";
import { memo } from "react";

interface Props {
  status: LeaveStatus;
  className?: string;
}

function StatusBadge({ status, className }: Props) {
  return (
    <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap", statusStyles[status], className)}>
      {status}
    </span>
  );
}

export default memo(StatusBadge);
