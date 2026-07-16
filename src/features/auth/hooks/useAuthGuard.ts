import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/features/shared/app/hooks";
import { clearUser } from "@/features/auth/authSlice";
import { useGetMeQuery } from "@/features/auth/authApi";

export function useAuthGuard() {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { isError } = useGetMeQuery(undefined, { skip: !auth.email });

  useEffect(() => {
    if (isError) dispatch(clearUser());
  }, [isError]);

  useEffect(() => {
    if (!auth.email) {
      router.replace("/login");
      return;
    }

    if (pathname.startsWith("/manager") && auth.role !== "manager") {
      router.replace("/");
    }

    if (pathname === "/" && auth.role === "manager") {
      router.replace("/manager");
    }
  }, [auth.email, auth.role, pathname, router]);

  return auth;
}
