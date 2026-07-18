import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUpdateLeaveMutation } from "../employeeApi";
import { editLeaveSchema, type EditLeaveForm } from "../schema/editLeaveSchema";
import type { LeaveResponse } from "@/features/manager/managerApi";

export function useEditLeave(leave: LeaveResponse, onClose: () => void) {
  const [updateLeave, { isLoading }] = useUpdateLeaveMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLeaveForm>({
    resolver: zodResolver(editLeaveSchema),
    defaultValues: {
      type: leave.type,
      startDate: leave.startDate.split("T")[0],
      endDate: leave.endDate.split("T")[0],
      reason: leave.reason,
    },
  });

  const onSubmit = useCallback(
    async (data: EditLeaveForm) => {
      try {
        await updateLeave({ id: leave.id, body: data }).unwrap();
        toast.success("Leave request updated");
        onClose();
      } catch {
        toast.error("Failed to update leave request");
      }
    },
    [updateLeave, leave.id, onClose],
  );

  return { register, handleSubmit, errors, isLoading, onSubmit };
}
