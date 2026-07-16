'use client'

import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { Sidebar } from "@/features/manager/components/ui/Sidebar/Sidebar"
import { ThemeToggle } from "@/features/ThemeToggle/ThemeToggle"

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const auth = useAuthGuard();

  if (!auth.email) return null;

  return (
    <div className="flex flex-1 bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-6 border-b border-outline-variant bg-surface">
          <h2 className="text-base font-semibold text-on-surface">Dashboard</h2>
          <ThemeToggle />
        </header>
        <div className="flex-1 p-6 space-y-6 overflow-auto">{children}</div>
      </main>
    </div>
  )
}
