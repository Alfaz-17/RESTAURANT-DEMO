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
    <div key={refreshTrigger} className="space-y-6 sm:space-y-10">
      {/* Usage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <div className="luxury-card bg-rose-500/5 border-rose-500/10 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 glass rounded-lg"><AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" /></div>
            <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">Velocity: High</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-4xl font-serif text-rose-500 font-light">{highUsageItems.length}</p>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Stock Items</span>
          </div>
        </div>

        <div className="luxury-card bg-accent/5 border-accent/10 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 glass rounded-lg"><TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" /></div>
            <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">Velocity: Steady</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-4xl font-serif text-accent font-light">{mediumUsageItems.length}</p>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Stock Items</span>
          </div>
        </div>

        <div className="luxury-card p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 glass rounded-lg"><Package className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/40" /></div>
            <p className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">Inventory Reach</p>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl sm:text-4xl font-serif text-foreground font-light">{menuItems.length}</p>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total SKU</span>
          </div>
        </div>
      </div>

      {/* Items Grid - Mobile Optimized */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground opacity-60">Consumable Traction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {menuItems.map((item) => {
            const used = itemUsage[item.id] || 0
            const status = used > 10 ? { label: "Depleting", color: "text-rose-500", bar: "bg-rose-500" }
              : used > 5 ? { label: "Optimal", color: "text-accent", bar: "bg-accent" }
              : { label: "Stable", color: "text-muted-foreground", bar: "bg-muted-foreground/20" }

            return (
              <div
                key={item.id}
                className="luxury-card group transition-all duration-500 p-4 sm:p-6"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex-1">
                    <h4 className="font-serif font-bold text-sm sm:text-base text-foreground group-hover:text-accent transition-colors">{item.name}</h4>
                    <p className="text-[8px] sm:text-[9px] text-muted-foreground uppercase tracking-widest mt-1 font-bold">{item.category}</p>
                  </div>
                  <span className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] border-l border-border pl-2 sm:pl-3 ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                {/* Usage Bar */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[8px] sm:text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">Daily Movement</span>
                    <span className={`text-xl sm:text-2xl font-serif ${status.color} font-light`}>{used}</span>
                  </div>
                  <div className="h-1 bg-border/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${status.bar} transition-all duration-1000 ease-out shadow-lg`}
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
