'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/features/shared/app/hooks";
import { LoginForm } from "@/features/auth/components/ui/LoginForm";
import { ThemeToggle } from "@/features/ThemeToggle/ThemeToggle";

export default function LoginPage() {
  const auth = useAppSelector((s) => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.role === "manager") router.replace("/manager");
    else if (auth.role === "employee") router.replace("/");
  }, [auth.role, router]);

  return (
    <div className="flex flex-1 items-center justify-center bg-background relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm px-4">
        <div className="bg-surface border border-outline-variant rounded-xl p-8">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-on-primary text-2xl font-bold">L</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Leave</h1>
            <p className="text-sm text-on-surface-variant mt-1">Enterprise Time-Off Management</p>
          </div>

          <LoginForm />
          
          <p className="mt-8 pt-6 border-t border-outline-variant text-center text-sm text-on-surface-variant">
            New to Leave? <span className="text-primary">Contact HR</span>
          </p>
        </div>
      </div>
    </div>
  );
}
