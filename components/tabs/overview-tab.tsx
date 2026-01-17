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
    <div className="space-y-6 sm:space-y-10">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.label} className="luxury-card group p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 rounded-xl ${card.bg} transition-transform group-hover:scale-110 duration-500`}>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${card.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                   {card.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                   {card.change}
                </div>
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">{card.label}</p>
                <h3 className="text-xl sm:text-3xl font-serif font-light mt-1 sm:mt-2 text-foreground tracking-tight">{card.value}</h3>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Activity / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="luxury-card h-64 sm:h-96 flex flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">Revenue Dynamics</h3>
            <div className="p-2 glass rounded-lg"><DollarSign className="w-4 h-4 text-accent" /></div>
          </div>
          <div className="flex-1 flex items-center justify-center text-muted-foreground/30 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold italic animate-pulse">
            Visualizing Growth Path...
          </div>
        </div>
        <div className="luxury-card h-64 sm:h-96 flex flex-col p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-8">
            <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground">Service Velocity</h3>
            <div className="p-2 glass rounded-lg"><ShoppingBag className="w-4 h-4 text-accent" /></div>
          </div>
          <div className="flex-1 flex items-center justify-center text-muted-foreground/30 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold italic animate-pulse">
             Aggregating Order Flow...
          </div>
        </div>
      </div>
    </div>
  )
}
