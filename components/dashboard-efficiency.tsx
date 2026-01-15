"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardEfficiency() {
  const { getTimeMetrics, getTodayOrders } = useDashboard()

  const timeMetrics = getTimeMetrics()
  const todayOrders = getTodayOrders()

  const rushHourOrders = 0 // Would be calculated from timestamps
  const nonRushOrders = todayOrders.length - rushHourOrders

  return (
    <div className="space-y-4">
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Performance Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Avg Prep Time</span>
            <span className="text-lg font-light">
              {timeMetrics.avgPrepTime > 0 ? `${timeMetrics.avgPrepTime}m` : "—"}
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Avg Dining Time</span>
            <span className="text-lg font-light">{timeMetrics.avgDiningTime}m</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Current Load</span>
            <span
              className={`text-lg font-light capitalize ${timeMetrics.currentLoad === "busy" ? "text-orange-600" : ""}`}
            >
              {timeMetrics.currentLoad}
            </span>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Rush Analysis</h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Peak Hours</p>
            <p className="text-sm font-light mt-1">{timeMetrics.rushHours.join(", ") || "—"}</p>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Rush vs Normal</span>
            <span className="text-sm">
              {rushHourOrders} / {nonRushOrders}
            </span>
          </div>
        </div>
      </div>

      {timeMetrics.bottleneck !== "none" && (
        <div className="luxury-card border-orange-200 bg-orange-50">
          <p className="text-sm text-orange-700">
            ⚠ Bottleneck detected in <strong className="capitalize">{timeMetrics.bottleneck}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
