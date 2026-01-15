"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { DollarSign, ShoppingBag, Users, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function OverviewTab() {
  const { getTodayOrders } = useDashboard()
  const orders = getTodayOrders()
  
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const activeOrders = orders.filter(o => o.status !== "served").length
  const completedOrders = orders.filter(o => o.status === "served").length
  
  // Fake previous stats for demo
  const revenueGrowth = 12.5
  const ordersGrowth = 8.2

  const cards = [
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: `+${revenueGrowth}%`,
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Active Orders",
      value: activeOrders,
      change: "+2",
      trend: "up",
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Completed",
      value: completedOrders,
      change: `+${ordersGrowth}%`,
      trend: "up",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Avg. Table Time",
      value: "42m",
      change: "-5%",
      trend: "down", // down is good for wait time? context dependent. Let's say efficiency up.
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground">Real-time insights and performance metrics.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="p-6 bg-white rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.bg}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${card.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                   {card.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                   {card.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">{card.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 h-80 flex items-center justify-center text-muted-foreground bg-grid-black/[0.02]">
          <span className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Revenue Chart Placeholder
          </span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border/50 h-80 flex items-center justify-center text-muted-foreground bg-grid-black/[0.02]">
           <span className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Order Volume Chart Placeholder
          </span>
        </div>
      </div>
    </div>
  )
}
