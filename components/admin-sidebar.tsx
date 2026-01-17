"use client"

import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Menu, 
  Package, 
  BarChart3, 
  Zap, 
  Settings, 
  LogOut, 
  ChefHat,
  X
} from "lucide-react"

export type AdminView = "overview" | "kitchen" | "menu" | "inventory" | "reports" | "ai" | "settings"

interface AdminSidebarProps {
  currentView: AdminView
  onViewChange: (view: AdminView) => void
  onLogout: () => void
  isOpen: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { id: "kitchen", label: "Kitchen Display", icon: ChefHat },
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "menu", label: "Menu Manager", icon: Menu },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "reports", label: "Analytics", icon: BarChart3 },
  { id: "ai", label: "AI Assistant", icon: Zap },
  { id: "settings", label: "Settings", icon: Settings },
] as const

export function AdminSidebar({ currentView, onViewChange, onLogout, isOpen, onClose }: AdminSidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 bottom-0 z-50 w-64 bg-white text-muted-foreground
          transition-transform duration-300 ease-in-out border-r border-border
          flex flex-col
          lg:translate-x-0 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border">
          <div className="flex flex-col">
            <span className="font-serif text-lg text-foreground font-bold tracking-tight uppercase leading-none">Saffron & Gold</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mt-1 font-semibold italic">Admin Suite</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = currentView === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  onViewChange(item.id as AdminView)
                  onClose()
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-wide uppercase text-[10px] transition-all duration-300 active-press
                  ${isActive 
                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" 
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "opacity-60"}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border space-y-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-rose-500 border border-rose-100 hover:bg-rose-50 transition-colors active-press"
          >
            <LogOut className="w-4 h-4" />
            Exit System
          </button>
          
          <div className="text-[8px] uppercase tracking-[0.3em] text-muted-foreground/40 font-bold text-center">
            Maitre d' OS v2.4
          </div>
        </div>
      </aside>
    </>
  )
}
