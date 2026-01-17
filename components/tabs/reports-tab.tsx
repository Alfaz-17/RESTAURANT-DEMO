"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function ReportsTab() {
  const { getTodayOrders, todayRevenue, totalOrders, averageOrderValue } = useDashboard()

  const todayOrders = getTodayOrders()
  const topItems = Array.from(
    new Map(
      todayOrders
        .flatMap((o) => o.items)
        .reduce((acc, item) => {
          const key = `${item.id}-${item.name}`
          acc.set(key, (acc.get(key) || 0) + item.quantity)
          return acc
        }, new Map<string, number>()),
    ).entries(),
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="luxury-card p-4 sm:p-6">
          <p className="text-[9px] sm:text-sm text-muted-foreground uppercase tracking-wide">Total Orders</p>
          <p className="text-xl sm:text-3xl font-light mt-1 sm:mt-2">{totalOrders}</p>
        </div>
        <div className="luxury-card p-4 sm:p-6">
          <p className="text-[9px] sm:text-sm text-muted-foreground uppercase tracking-wide">Total Revenue</p>
          <p className="text-xl sm:text-3xl font-light mt-1 sm:mt-2">${todayRevenue.toFixed(0)}</p>
        </div>
        <div className="luxury-card p-4 sm:p-6">
          <p className="text-[9px] sm:text-sm text-muted-foreground uppercase tracking-wide">Avg Order Value</p>
          <p className="text-xl sm:text-3xl font-light mt-1 sm:mt-2">${averageOrderValue.toFixed(0)}</p>
        </div>
        <div className="luxury-card p-4 sm:p-6">
          <p className="text-[9px] sm:text-sm text-muted-foreground uppercase tracking-wide">Most Popular</p>
          <p className="text-xl sm:text-3xl font-light mt-1 sm:mt-2">{topItems.length > 0 ? topItems[0][1] : 0}</p>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="luxury-card p-4 sm:p-6">
        <h3 className="font-serif text-base sm:text-lg font-light mb-3 sm:mb-4">Top Selling Items</h3>
        <div className="space-y-2 sm:space-y-3">
          {topItems.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet</p>
          ) : (
            topItems.map(([name, quantity], index) => (
              <div key={name} className="flex items-center justify-between pb-2 sm:pb-3 border-b border-border last:border-0">
                <span className="font-medium text-sm">
                  {index + 1}. {name.split("-")[1]}
                </span>
                <span className="text-muted-foreground text-sm">{quantity} sold</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
