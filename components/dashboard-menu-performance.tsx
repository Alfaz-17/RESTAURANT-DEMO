"use client"

import { useState } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { menuItems } from "@/components/menu-data"

export function DashboardMenuPerformance() {
  const { getMenuItemPerformance, toggleItemAvailability, itemAvailability } = useDashboard()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const performance = getMenuItemPerformance()
  const sorted = [...performance].sort((a, b) => b.sales - a.sales)

  if (sorted.length === 0) {
    return (
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Menu Performance</h3>
        <p className="text-sm text-muted-foreground">No orders yet. Top items will appear here.</p>
      </div>
    )
  }

  const categoryBreakdown = performance.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.sales
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="luxury-card">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Top-Selling Items</h3>
          <div className="space-y-3">
            {sorted.slice(0, 5).map((item) => (
              <div key={item.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.sales} sold</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.trending === "up"
                        ? "bg-green-100 text-green-700"
                        : item.trending === "down"
                          ? "bg-red-100 text-red-700"
                          : "bg-accent/20 text-accent-foreground"
                    }`}
                  >
                    {item.trending === "up" ? "↑ Popular" : item.trending === "down" ? "↓ Low" : "→ Stable"}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>${item.revenue.toFixed(0)} revenue</span>
                  <span>{item.pairingSuccessRate}% pairings</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card">
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Category Sales</h3>
          <div className="space-y-3">
            {Object.entries(categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([category, sales]) => (
                <div key={category} className="pb-3 border-b border-border last:border-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm capitalize">{category}</span>
                    <span className="text-lg font-light">{sales}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1 mt-2">
                    <div
                      className="bg-accent rounded-full h-1"
                      style={{ width: `${(sales / Math.max(...Object.values(categoryBreakdown))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Item Availability</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-2 hover:bg-accent/5 rounded">
              <span className="text-sm">{item.name}</span>
              <button
                onClick={() => toggleItemAvailability(item.id)}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  itemAvailability[item.id] !== false
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                {itemAvailability[item.id] !== false ? "Available" : "Out"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
