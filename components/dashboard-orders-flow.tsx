"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardOrdersFlow() {
  const { getTodayOrders } = useDashboard()

  const todayOrders = getTodayOrders()

  const statusCounts = {
    preparing: todayOrders.filter((o) => o.status === "preparing").length,
    ready: todayOrders.filter((o) => o.status === "ready").length,
    served: todayOrders.filter((o) => o.status === "served").length,
  }

  const typeCounts = {
    "dine-in": todayOrders.filter((o) => o.type === "dine-in").length,
    takeaway: todayOrders.filter((o) => o.type === "takeaway").length,
    delivery: todayOrders.filter((o) => o.type === "delivery").length,
  }

  const delayedOrders = todayOrders.filter((o) => (o.preparationTime || 0) > 5).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Live Order Feed</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Preparing</span>
            <span className="text-lg font-light">{statusCounts.preparing}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Ready to Serve</span>
            <span className="text-lg font-light">{statusCounts.ready}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Served</span>
            <span className="text-lg font-light text-muted-foreground">{statusCounts.served}</span>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Order Types</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Dine-in</span>
            <span className="text-lg font-light">{typeCounts["dine-in"]}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Takeaway</span>
            <span className="text-lg font-light">{typeCounts.takeaway}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Delivery</span>
            <span className="text-lg font-light">{typeCounts.delivery}</span>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Status Flags</h3>
        <div className="space-y-3">
          {delayedOrders > 0 && (
            <div className="pb-3 border-b border-border">
              <p className="text-sm font-medium text-orange-600">⚠ Delayed Orders</p>
              <p className="text-xs text-muted-foreground mt-1">{delayedOrders} taking longer</p>
            </div>
          )}
          <div>
            <p className="text-sm">Cancelled: 0</p>
            <p className="text-xs text-muted-foreground">Modified: 0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
