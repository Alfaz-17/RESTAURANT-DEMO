"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function OrdersTab() {
  const { getTodayOrders } = useDashboard()

  const todayOrders = getTodayOrders()

  return (
    <div>
      <div className="luxury-card p-4 sm:p-6">
        <h2 className="font-serif text-lg sm:text-xl font-light mb-3 sm:mb-4">All Orders ({todayOrders.length})</h2>
        <div className="space-y-2 sm:space-y-3 max-h-[600px] overflow-y-auto scrollbar-hide">
          {todayOrders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 text-sm">No orders today</p>
          ) : (
            todayOrders
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map((order) => (
                <div key={order.id} className="border border-border/50 rounded-xl p-3 sm:p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium text-sm">Order #{order.id.slice(-4)}</span>
                      <span className="text-[10px] sm:text-xs text-muted-foreground ml-2">
                        {new Date(order.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === "served"
                          ? "bg-green-100 text-green-800"
                          : order.status === "ready"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-1">
                    {order.items.map((item) => `${item.quantity}x ${item.name}`).join(" • ")}
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-serif font-medium text-base sm:text-lg">${order.total.toFixed(2)}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground capitalize">{order.type}</span>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}
