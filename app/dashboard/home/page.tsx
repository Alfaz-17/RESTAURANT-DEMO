"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { Flame, TrendingUp, Clock, Smile } from "lucide-react"
import Link from "next/link"

export default function DashboardHomePage() {
  const { getTodayOrders, getServiceRequests } = useDashboard()

  const orders = getTodayOrders()
  const liveOrders = orders.filter((o) => o.status !== "served")
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const avgPrepTime =
    orders.length > 0 ? Math.round(orders.reduce((sum, o) => sum + o.preparationTime, 0) / orders.length) : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl font-light mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Live Orders</p>
              <p className="text-3xl font-light mt-2">{liveOrders.length}</p>
            </div>
            <Flame className="w-8 h-8 text-accent opacity-50" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Revenue Today</p>
              <p className="text-3xl font-light mt-2">₹{totalRevenue.toFixed(0)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-accent opacity-50" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg Prep Time</p>
              <p className="text-3xl font-light mt-2">{avgPrepTime} min</p>
            </div>
            <Clock className="w-8 h-8 text-accent opacity-50" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Orders</p>
              <p className="text-3xl font-light mt-2">{orders.length}</p>
            </div>
            <Smile className="w-8 h-8 text-accent opacity-50" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/kitchen"
          className="bg-accent text-accent-foreground rounded-lg p-8 text-center hover:opacity-90 transition-opacity"
        >
          <h3 className="font-serif text-2xl font-light mb-2">View Kitchen</h3>
          <p className="text-sm opacity-90">Manage live orders and kitchen status</p>
        </Link>

        <Link
          href="/dashboard/orders"
          className="bg-secondary text-foreground rounded-lg p-8 text-center hover:opacity-90 transition-opacity"
        >
          <h3 className="font-serif text-2xl font-light mb-2">View Orders</h3>
          <p className="text-sm text-muted-foreground">See order history and details</p>
        </Link>
      </div>
    </div>
  )
}
