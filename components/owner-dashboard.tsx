"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { ChevronLeft, Zap, Package, UtensilsCrossed, BarChart3, TrendingUp } from "lucide-react"


// Tab components
import { KitchenView } from "./tabs/kitchen-view"
import { AIToolsTab } from "./tabs/ai-tools-tab"
import { InventoryTab } from "./tabs/inventory-tab"
import { MenuControlTab } from "./tabs/menu-control-tab"
import { ReportsTab } from "./tabs/reports-tab"

type DashboardMode = "kitchen" | "analytics"
type KitchenTabType = "orders" | "menu"
type AnalyticsTabType = "reports" | "inventory" | "ai"

const KITCHEN_TABS = [
  { id: "orders", label: "Active Orders", icon: UtensilsCrossed },
  { id: "menu", label: "Menu Control", icon: Package },
]

const ANALYTICS_TABS = [
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "inventory", label: "Inventory", icon: TrendingUp },
  { id: "ai", label: "AI Tools", icon: Zap },
]

export function OwnerDashboard({ onBackToMenu }: { onBackToMenu: () => void }) {
  const [dashboardMode, setDashboardMode] = useState<DashboardMode>("kitchen")
  const [kitchenTab, setKitchenTab] = useState<KitchenTabType>("orders")
  const [analyticsTab, setAnalyticsTab] = useState<AnalyticsTabType>("reports")
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

  const currentTabs = dashboardMode === "kitchen" ? KITCHEN_TABS : ANALYTICS_TABS
  const activeTab = dashboardMode === "kitchen" ? kitchenTab : analyticsTab

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-40" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="w-full px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
            <button
              onClick={onBackToMenu}
              className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-xl sm:text-2xl font-light flex-1 text-center">
              {dashboardMode === "kitchen" ? "Kitchen Dashboard" : "Analytics Dashboard"}
            </h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          {/* Dashboard Mode Selector */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setDashboardMode("kitchen")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                dashboardMode === "kitchen"
                  ? "bg-red-500 text-white shadow-lg"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              🔥 Kitchen
            </button>
            <button
              onClick={() => setDashboardMode("analytics")}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                dashboardMode === "analytics"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              📊 Analytics
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {currentTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (dashboardMode === "kitchen") {
                      setKitchenTab(tab.id as KitchenTabType)
                    } else {
                      setAnalyticsTab(tab.id as AnalyticsTabType)
                    }
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-md"
                      : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <main className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {/* Kitchen Dashboard Content */}
        {dashboardMode === "kitchen" && (
          <>
            {kitchenTab === "orders" && <KitchenView refreshTrigger={refreshTrigger} liveOrders={liveOrders} />}
            {kitchenTab === "menu" && <MenuControlTab />}
          </>
        )}

        {/* Analytics Dashboard Content */}
        {dashboardMode === "analytics" && (
          <>
            {analyticsTab === "reports" && <ReportsTab />}
            {analyticsTab === "inventory" && <InventoryTab refreshTrigger={refreshTrigger} />}
            {analyticsTab === "ai" && <AIToolsTab />}
          </>
        )}
      </main>
    </div>
  )
}
