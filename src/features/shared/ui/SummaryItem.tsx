import { cn } from "@/features/shared/utils/cn";
import type { LucideIcon } from "lucide-react";
import { memo } from "react";

interface Props {
  icon: LucideIcon;
  label: string;
  value: number | string;
  valueClassName?: string;
  loading?: boolean;
}

function SummaryItem({ icon: Icon, label, value, valueClassName, loading }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-secondary">{label}</p>
        <p className={cn("font-bold", valueClassName)}>{loading ? "—" : value}</p>
      </div>
    </div>
  );
}

export default memo(SummaryItem);
