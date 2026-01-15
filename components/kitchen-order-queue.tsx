"use client"

import type { Order } from "@/lib/new-dashboard-context"

interface KitchenOrderQueueProps {
  orders: Order[]
  refreshTrigger: number
}

export function KitchenOrderQueue({ orders, refreshTrigger }: KitchenOrderQueueProps) {
  return (
    <div className="luxury-card">
      <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-4">Live Order Queue</h2>
      <div className="space-y-3">
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-sm">No active orders</p>
        ) : (
          orders.slice(0, 10).map((order) => (
            <div key={order.id} className="border border-border rounded p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm">Order #{order.id.slice(-4)}</p>
                  <p className="text-xs text-muted-foreground">Table {order.tableNumber || "—"}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    order.status === "preparing"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "finishing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
