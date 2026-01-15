"use client"

import type { Order } from "@/lib/new-dashboard-context"

interface KitchenStatsProps {
  orders: Order[]
}

export function KitchenStats({ orders }: KitchenStatsProps) {
  const preparingCount = orders.filter((o) => o.status === "preparing").length
  const finishingCount = orders.filter((o) => o.status === "finishing").length
  const readyCount = orders.filter((o) => o.status === "ready").length

  return (
    <div className="space-y-3">
      <div className="luxury-card">
        <p className="text-sm text-muted-foreground uppercase tracking-wide">Preparing</p>
        <p className="text-2xl font-light mt-2">{preparingCount}</p>
      </div>
      <div className="luxury-card">
        <p className="text-sm text-muted-foreground uppercase tracking-wide">Finishing</p>
        <p className="text-2xl font-light mt-2">{finishingCount}</p>
      </div>
      <div className="luxury-card">
        <p className="text-sm text-muted-foreground uppercase tracking-wide">Ready to Serve</p>
        <p className="text-2xl font-light mt-2">{readyCount}</p>
      </div>
    </div>
  )
}
