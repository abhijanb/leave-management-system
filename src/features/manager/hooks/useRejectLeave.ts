import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useRejectLeaveMutation } from "../managerApi";
import type { LeaveStatus } from "@/features/shared/types";

export function useRejectLeave() {
  const [reject] = useRejectLeaveMutation();
  const [optimisticStatus, setOptimisticStatus] = useState<Record<number, LeaveStatus>>({});

  const handleReject = useCallback(
    async (id: number) => {
      setOptimisticStatus((prev) => ({ ...prev, [id]: "Rejected" }));
      try {
        await reject(id).unwrap();
        toast.success("Leave request rejected");
      } catch {
        setOptimisticStatus((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        toast.error("Failed to reject leave request");
      }
    },
    [reject],
  );

  const getDisplayStatus = useCallback(
    (id: number, fallback: LeaveStatus) => optimisticStatus[id] ?? fallback,
    [optimisticStatus],
  );

  return { handleReject, getDisplayStatus, optimisticStatus };
}
