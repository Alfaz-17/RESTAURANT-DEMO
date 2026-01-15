"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface DashboardModeSelectorProps {
  mode: "kitchen" | "analytics"
  onModeChange: (mode: "kitchen" | "analytics") => void
}

export function DashboardModeSelector({ mode, onModeChange }: DashboardModeSelectorProps) {
  return (
    <div className="relative bg-secondary/30 backdrop-blur-sm rounded-2xl p-1.5 shadow-inner">
      {/* Animated Background Slider */}
      <motion.div
        className="absolute top-1.5 bottom-1.5 rounded-xl shadow-lg"
        initial={false}
        animate={{
          left: mode === "kitchen" ? "0.375rem" : "50%",
          right: mode === "kitchen" ? "50%" : "0.375rem",
          backgroundColor: mode === "kitchen" ? "rgb(239 68 68)" : "rgb(59 130 246)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Mode Buttons */}
      <div className="relative grid grid-cols-2 gap-1.5">
        <button
          onClick={() => onModeChange("kitchen")}
          className={`relative py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
            mode === "kitchen"
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">🔥</span>
            <span>Kitchen</span>
          </span>
        </button>
        <button
          onClick={() => onModeChange("analytics")}
          className={`relative py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-300 ${
            mode === "analytics"
              ? "text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-lg">📊</span>
            <span>Analytics</span>
          </span>
        </button>
      </div>
    </div>
  )
}

interface Tab {
  id: string
  label: string
  icon: LucideIcon
  badge?: number
}

interface DashboardTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  accentColor?: string
}

export function DashboardTabs({ tabs, activeTab, onTabChange, accentColor = "accent" }: DashboardTabsProps) {
  return (
    <div className="relative">
      {/* Tabs Container */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl whitespace-nowrap transition-all text-sm font-semibold ${
                isActive
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
                  : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-4 h-4 ${isActive ? "animate-pulse" : ""}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              
              {/* Badge */}
              {tab.badge !== undefined && tab.badge > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
                >
                  {tab.badge > 9 ? "9+" : tab.badge}
                </motion.span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-accent-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Scroll Gradient Indicators */}
      <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none" />
    </div>
  )
}
