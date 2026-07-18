'use client'

import type { LeaveResponse } from "@/features/manager/managerApi";
import Tooltip from "@/features/shared/ui/Tooltip";
import StatusBadge from "@/features/shared/ui/StatusBadge";
import { daysBetween, formatDate } from "@/features/shared/utils/date";
import { cn } from "@/features/shared/utils/cn";
import { Plane, Stethoscope, Calendar, Briefcase, Pencil, Trash2, Check, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useEffect, useRef, memo } from "react";
import { STATUS_LABELS } from "@/features/shared/constants/messages";
import type { LeaveType } from "@/features/shared/types";
import EditLeaveModal from "./EditLeaveModal";

const typeIcons: Record<LeaveType, LucideIcon> = {
  "Paid Leave": Plane,
  "Sick Leave": Stethoscope,
  "Casual Leave": Calendar,
  "Unpaid Leave": Briefcase,
};

interface Props {
  row: LeaveResponse;
  onDelete: (id: number) => Promise<void>;
}

function LeaveHistoryRow({ row, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(row.id);
    } else {
      setConfirmDelete(true);
      timerRef.current = setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  const Icon = typeIcons[row.type];

  return (
    <>
    <tr className="hover:bg-surface-container-low/50 transition-colors">
      <td className="p-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <span className="text-on-surface">{row.type}</span>
        </div>
      </td>
      <td className="p-4 text-secondary">{formatDate(row.createdAt)}</td>
      <td className="p-4 text-on-surface">{formatDate(row.startDate)} — {formatDate(row.endDate)}</td>
      <td className="p-4 text-secondary">{daysBetween(row.startDate, row.endDate)} Days</td>
      <td className="p-4">
        <Tooltip content={row.reason}>
          <span className="max-w-32 inline-block truncate cursor-default text-on-surface">{row.reason}</span>
        </Tooltip>
      </td>
      <td className="p-4">
        <StatusBadge status={row.status} />
      </td>
      <td className="p-4 text-right">
        {row.status === STATUS_LABELS.Pending ? (
          <div className="flex gap-1 justify-end">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                confirmDelete ? "bg-rejected-bg-strong text-on-error" : "text-rejected-text-strong hover:bg-rejected-bg"
              )}
              title={confirmDelete ? "Click again to confirm" : "Delete"}
            >
              {confirmDelete ? <Check className="w-4 h-4" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <button className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" title="View">
            <Eye className="w-4 h-4" />
          </button>
        )}
      </td>
    </tr>
    {editing && <EditLeaveModal leave={row} onClose={() => setEditing(false)} />}
    </>
  );
}

export default memo(LeaveHistoryRow);
