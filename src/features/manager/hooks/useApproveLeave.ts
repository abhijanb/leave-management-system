import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useApproveLeaveMutation } from "../managerApi";
import type { LeaveStatus } from "@/features/shared/types";

export function useApproveLeave() {
  const [approve] = useApproveLeaveMutation();
  const [optimisticStatus, setOptimisticStatus] = useState<Record<number, LeaveStatus>>({});

  const handleApprove = useCallback(
    async (id: number) => {
      setOptimisticStatus((prev) => ({ ...prev, [id]: "Approved" }));
      try {
        await approve(id).unwrap();
        toast.success("Leave request approved");
      } catch {
        setOptimisticStatus((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        toast.error("Failed to approve leave request");
      }
    },
    [approve],
  );

  const getDisplayStatus = useCallback(
    (id: number, fallback: LeaveStatus) => optimisticStatus[id] ?? fallback,
    [optimisticStatus],
  );

  return { handleApprove, getDisplayStatus, optimisticStatus };
}
