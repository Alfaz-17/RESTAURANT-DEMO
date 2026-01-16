"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { Search, Bell, Menu as MenuIcon, User } from "lucide-react"

// Components
import { AdminSidebar, type AdminView } from "./admin-sidebar"
import { KitchenView } from "./tabs/kitchen-view"
import { AIToolsTab } from "./tabs/ai-tools-tab"
import { InventoryTab } from "./tabs/inventory-tab"
import { MenuControlTab } from "./tabs/menu-control-tab"
import { ReportsTab } from "./tabs/reports-tab"
import { OverviewTab } from "./tabs/overview-tab"

export function OwnerDashboard({ onBackToMenu }: { onBackToMenu: () => void }) {
  const [currentView, setCurrentView] = useState<AdminView>("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const { getTodayOrders, serviceRequests } = useDashboard()

  // Auto-refresh every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const liveOrders = getTodayOrders().filter((o) => o.status !== "served")

  // View Mapping
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <OverviewTab />
      case "kitchen":
        return <KitchenView refreshTrigger={refreshTrigger} liveOrders={liveOrders} />
      case "menu":
        return <MenuControlTab />
      case "inventory":
        return <InventoryTab refreshTrigger={refreshTrigger} />
      case "reports":
        return <ReportsTab />
      case "ai":
        return <AIToolsTab />
      case "settings":
        return (
          <div className="flex items-center justify-center h-[50dvh] text-muted-foreground">
            Settings Panel (Coming Soon)
          </div>
        )
      default:
        return <OverviewTab />
    }
  }

  // Header Titles
  const viewTitles: Record<AdminView, string> = {
    overview: "Dashboard Overview",
    kitchen: "Kitchen Display System",
    menu: "Menu Management",
    inventory: "Inventory Control",
    reports: "Analytics & Reports",
    ai: "AI Assistant",
    settings: "System Settings",
  }

  return (
    <div className="flex h-screen-dynamic bg-gray-50/50">
      <AdminSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onBackToMenu}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-border bg-white flex items-center justify-between px-6 sticky top-0 z-30 pt-safe">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {viewTitles[currentView]}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg text-sm text-muted-foreground min-w-[200px]">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </div>
            
            <button className="relative p-2 hover:bg-secondary rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-md">
              AD
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto w-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
