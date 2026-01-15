"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardTodayGlance() {
  const { todayRevenue, totalOrders, averageOrderValue, liveOrdersCount, getTimeMetrics } = useDashboard()

  const timeMetrics = getTimeMetrics()

  const healthStatus =
    liveOrdersCount > 0
      ? `${liveOrdersCount} Active`
      : timeMetrics.currentLoad === "busy"
        ? "Attention needed"
        : "All good"

  const metrics = [
    { label: "Today's Orders", value: totalOrders.toString(), unit: "" },
    { label: "Today's Revenue", value: `$${todayRevenue.toFixed(0)}`, unit: "" },
    { label: "Average Order Value", value: `$${averageOrderValue.toFixed(0)}`, unit: "" },
    { label: "Peak Hour", value: timeMetrics.rushHours[0] || "—", unit: "" },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <div key={idx} className="luxury-card">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{metric.label}</p>
            <p className="text-3xl font-light mt-2">{metric.value}</p>
            {metric.unit && <p className="text-xs text-muted-foreground mt-1">{metric.unit}</p>}
          </div>
        ))}
      </div>
      <div className="luxury-card">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Health Status</p>
        <p className="text-2xl font-light mt-2">{healthStatus}</p>
        <p className="text-xs text-muted-foreground mt-2 capitalize">Current load: {timeMetrics.currentLoad}</p>
      </div>
    </div>
  )
}
