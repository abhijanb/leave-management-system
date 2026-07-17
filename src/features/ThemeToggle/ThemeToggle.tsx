'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../shared/app/hooks'
import { toggleTheme } from './themeSlice'

export function ThemeToggle() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.theme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    dispatch(toggleTheme())
    localStorage.setItem('leave_theme', next)
    document.documentElement.classList.toggle('light', next === 'light')
  }

  return (
    <button
      onClick={handleToggle}
      className="w-9 h-9 flex items-center justify-center rounded-md border border-outline-variant bg-surface text-on-surface hover:brightness-110 transition-all"
      aria-label="Toggle theme"
    >
      {mounted ? (theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />) : <Moon size={16} />}
    </button>
  )
}
