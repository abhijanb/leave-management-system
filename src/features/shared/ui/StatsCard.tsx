import { cn } from "@/features/shared/utils/cn";

interface CardProps {
  label: string;
  value: number | string;
  color?: string;
  loading?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function StatsCard({ label, value, color, loading, active, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-surface border rounded-xl p-4 text-left w-full transition-all",
        active
          ? "border-primary ring-1 ring-primary"
          : "border-outline-variant hover:bg-surface-container-high",
        onClick && "cursor-pointer"
      )}
    >
      <p className="text-xs text-on-surface-variant uppercase tracking-wider">{label}</p>
      <p className={cn("text-2xl font-bold mt-1", color)}>
        {loading ? "—" : value}
      </p>
    </button>
  );
}

interface GridProps {
  children: React.ReactNode;
}

export function StatsGrid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
