"use client"

import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-24 h-8 bg-brand-panel/50 rounded-md animate-pulse" />
  }

  return (
    <div className="flex items-center gap-1 p-1 bg-brand-panel border border-brand-border rounded-full">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "light" 
            ? "bg-brand-accent text-white shadow-sm" 
            : "text-brand-muted hover:text-brand-text hover:bg-brand-dark/50"
        }`}
        title="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "system" 
            ? "bg-brand-accent text-white shadow-sm" 
            : "text-brand-muted hover:text-brand-text hover:bg-brand-dark/50"
        }`}
        title="System Preference"
      >
        <Laptop className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${
          theme === "dark" 
            ? "bg-brand-accent text-white shadow-sm" 
            : "text-brand-muted hover:text-brand-text hover:bg-brand-dark/50"
        }`}
        title="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  )
}
