"use client"

import { useDashboard } from "@/lib/dashboard-context"

export default function ReportsPage() {
  const { getTodayOrders } = useDashboard()

  const orders = getTodayOrders()
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalOrders = orders.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-light">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">Track business performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Revenue</p>
          <p className="text-3xl font-light mt-2">₹{totalRevenue.toFixed(0)}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Total Orders</p>
          <p className="text-3xl font-light mt-2">{totalOrders}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-muted-foreground text-sm">Average Order Value</p>
          <p className="text-3xl font-light mt-2">₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0}</p>
        </div>
      </div>
    </div>
  )
}
