"use client"

import { useState, useEffect } from "react"
import { useNewDashboard } from "@/lib/new-dashboard-context"
import { KitchenHeader } from "@/components/kitchen-header"
import { KitchenOrderQueue } from "@/components/kitchen-order-queue"
import { KitchenStats } from "@/components/kitchen-stats"

export function KitchenDashboard() {
  const { liveOrders, getDailyStats } = useNewDashboard()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Auto-refresh every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const stats = getDailyStats()

  return (
    <div className="min-h-screen-dynamic bg-background">
      <KitchenHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="luxury-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Live Orders</p>
            <p className="text-3xl font-light mt-2">{liveOrders.length}</p>
          </div>
          <div className="luxury-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Today's Revenue</p>
            <p className="text-3xl font-light mt-2">${stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="luxury-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Avg Order Value</p>
            <p className="text-3xl font-light mt-2">${stats.averageOrderValue.toFixed(2)}</p>
          </div>
          <div className="luxury-card">
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Peak Hour</p>
            <p className="text-3xl font-light mt-2">{stats.peakHour}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <KitchenOrderQueue orders={liveOrders} refreshTrigger={refreshTrigger} />
          </div>
          <div>
            <KitchenStats orders={liveOrders} />
          </div>
        </div>
      </main>
    </div>
  )
}
