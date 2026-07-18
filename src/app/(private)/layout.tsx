'use client'

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Sidebar } from "@/features/manager/components/ui/Sidebar/Sidebar"
import { ThemeToggle } from "@/features/ThemeToggle/ThemeToggle"
import { useAppSelector, useAppDispatch } from "@/features/shared/app/hooks";
import { toggleCollapsed } from "@/features/manager/components/ui/Sidebar/sidebarSlice";
import { Menu } from "lucide-react";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuthGuard();
  const role = useAppSelector((s) => s.auth.role);
  const collapsed = useAppSelector((s) => s.sidebar.collapsed);
  const dispatch = useAppDispatch();

  if (!auth.email) return null;

  return (
    <div className="flex flex-1 bg-background">
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => dispatch(toggleCollapsed())}
        />
      )}

      <Sidebar role={role} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center gap-4 px-4 md:px-6 border-b border-outline-variant bg-surface">
          <button
            onClick={() => dispatch(toggleCollapsed())}
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-colors shrink-0"
          >
            <Menu className="w-5 h-5 text-on-surface-variant" />
          </button>
          <h2 className="text-base font-semibold text-on-surface flex-1">Dashboard</h2>
          <ThemeToggle />
        </header>
        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
