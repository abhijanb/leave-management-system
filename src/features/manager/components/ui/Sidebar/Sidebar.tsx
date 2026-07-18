'use client'

import { memo } from 'react'
import { Calendar, FilePlus, History, LayoutDashboard, LogOut, Menu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { toggleCollapsed } from './sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/shared/app/hooks'
import { clearUser } from '@/features/auth/authSlice'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/features/shared/utils/cn'
import type { UserRole } from '@/features/shared/types'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const managerItems: NavItem[] = [
  { label: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { label: "Calendar", href: "/manager/calendar", icon: Calendar },
]

const employeeItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Apply Leave", href: "/apply-leave", icon: FilePlus },
  { label: "Leave History", href: "/leave-history", icon: History },
]

interface SidebarProps {
  role?: UserRole | null
}

export const Sidebar = memo(function Sidebar({ role }: SidebarProps) {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((state) => state.sidebar.collapsed)
  const { email, name } = useAppSelector((state) => state.auth)
  const router = useRouter()

  const items = role === "manager" ? managerItems : employeeItems
  const initials = (name || email || "?")[0].toUpperCase()

  const handleSignOut = () => {
    dispatch(clearUser())
    router.push("/login")
  }

  return (
    <aside
      className={cn("border-r border-outline-variant bg-surface flex flex-col transition-all duration-200", collapsed ? 'w-16' : 'w-60')}
    >
      <div className="h-16 flex items-center gap-3 px-4 border-b border-outline-variant">
        <button
          onClick={() => dispatch(toggleCollapsed())}
          className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-container-high transition-colors shrink-0"
          title={collapsed ? 'Open menu' : 'Close menu'}
        >
          <Menu className="w-5 h-5 text-on-surface-variant" />
        </button>
        {!collapsed && <h1 className="text-lg font-bold text-primary truncate">Leave</h1>}
      </div>

      {/* User info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-outline-variant">
          <p className="text-sm font-medium text-on-surface truncate">{name || "User"}</p>
          <p className="text-xs text-on-surface-variant truncate">{email}</p>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-outline-variant space-y-1">
        {collapsed && (
          <div
            className="flex items-center justify-center w-full px-3 py-2"
            title={name || email || undefined}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
              {initials}
            </div>
          </div>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="truncate">Sign Out</span>}
        </button>
      </div>
    </aside>
  )
})
