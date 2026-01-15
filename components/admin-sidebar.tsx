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
          fixed top-0 left-0 bottom-0 z-50 w-64 bg-[#1a1c23] text-gray-400
          transition-transform duration-300 ease-in-out border-r border-white/5
          flex flex-col
          lg:translate-x-0 lg:static
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-2 text-white font-serif tracking-wider">
            <span className="text-amber-500 text-2xl">❖</span>
            <span className="font-medium">COMMAND<span className="text-amber-500">CENTER</span></span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
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
                  w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]" 
                    : "hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-amber-500" : "text-gray-500"}`} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Exit to Menu
          </button>
          
          <div className="mt-4 px-3 text-[10px] uppercase tracking-widest text-gray-600 font-medium text-center">
            v2.4.0 • Enterprise
          </div>
        </div>
      </aside>
    </>
  )
}
