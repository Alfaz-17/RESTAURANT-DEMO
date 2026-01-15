"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardRevenue() {
  const { getRevenueMetrics, todayRevenue } = useDashboard()

  const revMetrics = getRevenueMetrics()

  const monthlyAverage = revMetrics.monthlyRevenue / 25
  const dailyTrend =
    todayRevenue > monthlyAverage
      ? `+${(((todayRevenue - monthlyAverage) / monthlyAverage) * 100).toFixed(0)}%`
      : `${(((todayRevenue - monthlyAverage) / monthlyAverage) * 100).toFixed(0)}%`

  return (
    <div className="space-y-4">
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Revenue Metrics</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Daily Revenue</span>
            <span className="text-lg font-light">${revMetrics.dailyRevenue.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Monthly Projected</span>
            <span className="text-lg font-light">${revMetrics.monthlyRevenue.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Daily Trend</span>
            <span className={`text-lg font-light ${todayRevenue > monthlyAverage ? "text-green-600" : "text-red-600"}`}>
              {dailyTrend}
            </span>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Impact Analysis</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Estimated Savings</span>
            <span className="text-lg font-light text-accent">${revMetrics.estimatedSavings.toFixed(0)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Order Prevention</span>
            <span className="text-lg font-light">{revMetrics.missedOrdersPreventionScore}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Staff Efficiency</span>
            <span className="text-lg font-light">{revMetrics.staffEfficiencyScore}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
