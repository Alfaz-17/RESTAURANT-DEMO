"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { menuItems } from "@/components/menu-data"
import { TrendingUp, AlertCircle, Package } from "lucide-react"

interface InventoryTabProps {
  refreshTrigger: number
}

export function InventoryTab({ refreshTrigger }: InventoryTabProps) {
  const { getTodayOrders } = useDashboard()

  const todayOrders = getTodayOrders()

  // Calculate item usage
  const itemUsage: Record<string, number> = {}
  todayOrders.forEach((order) => {
    order.items.forEach((item) => {
      itemUsage[item.id] = (itemUsage[item.id] || 0) + item.quantity
    })
  })

  // Get usage stats
  const highUsageItems = menuItems.filter(item => (itemUsage[item.id] || 0) > 10)
  const mediumUsageItems = menuItems.filter(item => {
    const usage = itemUsage[item.id] || 0
    return usage > 5 && usage <= 10
  })

  return (
    <div key={refreshTrigger} className="space-y-4 sm:space-y-6">
      {/* Usage Summary */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 rounded-2xl p-4 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            <p className="text-xs font-semibold text-red-900 dark:text-red-100 uppercase tracking-wide">High Use</p>
          </div>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100">{highUsageItems.length}</p>
          <p className="text-xs text-red-700 dark:text-red-300 mt-1">Items</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 rounded-2xl p-4 border-2 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-100 uppercase tracking-wide">Medium</p>
          </div>
          <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">{mediumUsageItems.length}</p>
          <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">Items</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-2xl p-4 border-2 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <p className="text-xs font-semibold text-green-900 dark:text-green-100 uppercase tracking-wide">Total</p>
          </div>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">{menuItems.length}</p>
          <p className="text-xs text-green-700 dark:text-green-300 mt-1">Items</p>
        </div>
      </div>

      {/* Items Grid - Mobile Optimized */}
      <div className="space-y-3">
        <h2 className="text-lg sm:text-xl font-bold px-1">Today's Usage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {menuItems.map((item) => {
            const used = itemUsage[item.id] || 0
            const status = used > 10 ? { label: "High Usage", color: "red", bg: "bg-red-50 dark:bg-red-950", border: "border-red-200 dark:border-red-800", text: "text-red-900 dark:text-red-100" }
              : used > 5 ? { label: "Medium Usage", color: "yellow", bg: "bg-yellow-50 dark:bg-yellow-950", border: "border-yellow-200 dark:border-yellow-800", text: "text-yellow-900 dark:text-yellow-100" }
              : { label: "Low Usage", color: "green", bg: "bg-green-50 dark:bg-green-950", border: "border-green-200 dark:border-green-800", text: "text-green-900 dark:text-green-100" }

            return (
              <div
                key={item.id}
                className={`${status.bg} ${status.border} border-2 rounded-2xl p-4 transition-all hover:shadow-lg`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className={`font-bold text-sm sm:text-base ${status.text}`}>{item.name}</h4>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mt-0.5">{item.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${status.color}-500 text-white whitespace-nowrap`}>
                    {status.label}
                  </span>
                </div>

                {/* Usage Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Used Today</span>
                    <span className={`text-2xl font-bold ${status.text}`}>{used}</span>
                  </div>
                  <div className="h-2 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${status.color}-500 transition-all duration-500`}
                      style={{ width: `${Math.min((used / 15) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
