'use client'

import { Calendar, ClipboardList, LayoutDashboard, LogOut } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { setCollapsed } from './sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/shared/app/hooks'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const defaultItems: NavItem[] = [
  { label: "Dashboard", href: "/manager", icon: LayoutDashboard },
  { label: "My Requests", href: "#", icon: ClipboardList },
  { label: "Calendar", href: "#", icon: Calendar },
]

interface SidebarProps {
  items?: NavItem[]
}

export function Sidebar({ items = defaultItems }: SidebarProps) {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector((state) => state.sidebar.collapsed)

  return (
    <aside
      onMouseEnter={() => dispatch(setCollapsed(false))}
      onMouseLeave={() => dispatch(setCollapsed(true))}
      className={`border-r border-outline-variant bg-surface flex flex-col transition-all duration-200 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      <div className="h-16 flex items-center gap-3 px-4 border-b border-outline-variant">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary text-sm font-bold shrink-0">
          L
        </div>
        {!collapsed && <h1 className="text-lg font-bold text-primary truncate">Leave</h1>}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="p-3 border-t border-outline-variant">
        <a
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="truncate">Sign Out</span>}
        </a>
      </div>
    </aside>
  )
}
