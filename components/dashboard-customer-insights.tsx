"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardCustomerInsights() {
  const { getCustomerMetrics } = useDashboard()

  const metrics = getCustomerMetrics()

  return (
    <div className="space-y-4">
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Customer Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">New vs Repeat</span>
            <span className="text-sm font-light">
              {metrics.newCustomers} new / {metrics.repeatCustomers} repeat
            </span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Repeat Rate</span>
            <span className="text-lg font-light">{metrics.repeatRate.toFixed(0)}%</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total customers today: {metrics.totalCustomers}</p>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Dietary Preferences</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Vegetarian</span>
            <span className="text-lg font-light">{metrics.dietaryPreferences.veg}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Non-Veg</span>
            <span className="text-lg font-light">{metrics.dietaryPreferences.nonVeg}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Vegan</span>
            <span className="text-lg font-light">{metrics.dietaryPreferences.vegan}</span>
          </div>
        </div>
      </div>

      {metrics.complaints > 0 && (
        <div className="luxury-card border-red-200 bg-red-50">
          <p className="text-sm text-red-700">🚨 {metrics.complaints} complaint(s) to address</p>
        </div>
      )}
    </div>
  )
}
