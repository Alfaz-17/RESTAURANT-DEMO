"use client"

import { Home, Search, ClipboardList, User } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "welcome", label: "Home", icon: Home },
    { id: "menu", label: "Browse", icon: Search },
    { id: "order-status", label: "Orders", icon: ClipboardList },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border px-6 sm:hidden" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)', paddingTop: '12px' }}>
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
              <span className="text-[10px] uppercase tracking-widest font-medium">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
      {/* Navigation items are now padded by the container style */}
    </div>
  )
}
