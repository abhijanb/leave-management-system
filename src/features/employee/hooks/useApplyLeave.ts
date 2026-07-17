import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateLeaveMutation } from "../employeeApi";
import { leaveSchema, type LeaveForm } from "../schema/leaveSchema";

export function useApplyLeave() {
  const router = useRouter();
  const [createLeave, { isLoading }] = useCreateLeaveMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeaveForm>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit = async (data: LeaveForm) => {
    try {
      await createLeave(data).unwrap();
      toast.success("Leave request submitted");
      reset();
      router.push("/leave-history");
    } catch {
      toast.error("Failed to submit leave request");
    }
  };

  return { register, handleSubmit, errors, isLoading, onSubmit };
}
