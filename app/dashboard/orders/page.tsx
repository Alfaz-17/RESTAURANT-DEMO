"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function OrdersPage() {
  const { getTodayOrders } = useDashboard()
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null)

  const orders = getTodayOrders()

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-light">Orders</h1>
        <p className="text-muted-foreground mt-1">View all orders with full customization details</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-muted-foreground">No orders placed today</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Order Header */}
              <button
                onClick={() => toggleExpand(order.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-left">
                    <p className="font-medium text-sm">Order #{order.id.slice(-6)}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.timestamp ? new Date(order.timestamp).toLocaleTimeString() : "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="text-right">
                      <p className="text-sm">{order.items.length} items</p>
                      <p className="text-xs text-muted-foreground">₹{order.total.toFixed(2)}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
                      {order.status}
                    </span>
                  </div>
                </div>
                {expandedOrderId === order.id ? (
                  <ChevronUp className="w-5 h-5 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 ml-4" />
                )}
              </button>

              {/* Order Details (Expandable) */}
              {expandedOrderId === order.id && (
                <div className="border-t border-border px-6 py-4 bg-secondary/30">
                  <div className="space-y-4">
                    {/* Items List */}
                    <div>
                      <h3 className="font-medium text-sm mb-2">Items Ordered</h3>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm font-medium">Total: ₹{order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Type: {order.type}</p>
                      {order.preparationTime && (
                        <p className="text-xs text-muted-foreground">Prep Time: {order.preparationTime} min</p>
                      )}
                      {order.estimatedReadyTime && (
                        <p className="text-xs text-muted-foreground">
                          Est. Ready: {new Date(order.estimatedReadyTime).toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
