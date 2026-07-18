import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../authApi";
import { LoginForm, schema } from "../authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/features/shared/app/hooks";
import { toast } from "sonner";
import { setUser } from "../authSlice";
import type { UserRole } from "@/features/shared/types";

const ROUTES: Record<UserRole, string> = {
  manager: "/manager",
  employee: "/",
};

export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: LoginForm) => {
      try {
        const res = await login(data).unwrap();
        dispatch(setUser({ email: data.email, role: res.role }));
        toast.success("Signed in successfully");
        router.push(ROUTES[res.role]);
      } catch {
        toast.error("Invalid email or password");
      }
    },
    [login, dispatch, router],
  );

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  };
}
