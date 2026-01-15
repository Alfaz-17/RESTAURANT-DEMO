"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { CheckCircle2, Clock } from "lucide-react"

export default function KitchenPage() {
  const { getTodayOrders, updateOrderStatus } = useDashboard()

  const liveOrders = getTodayOrders().filter((o) => o.status !== "served")

  const handleStartPreparing = (orderId: string) => {
    updateOrderStatus(orderId, "preparing")
  }

  const handleMarkReady = (orderId: string) => {
    updateOrderStatus(orderId, "ready")
  }

  const handleMarkServed = (orderId: string) => {
    updateOrderStatus(orderId, "served")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-light">Kitchen Management</h1>
        <p className="text-muted-foreground mt-1">Manage and track all orders in real-time</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-medium mb-4">Live Orders ({liveOrders.length})</h2>

        {liveOrders.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No live orders at the moment</p>
        ) : (
          <div className="space-y-4">
            {liveOrders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-medium">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} items • Status: {order.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.preparationTime} min</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {item.quantity}x {item.name}
                    </p>
                  ))}
                </div>

                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleStartPreparing(order.id)}
                      className="flex-1 bg-accent text-accent-foreground py-2 rounded text-sm font-medium hover:opacity-90"
                    >
                      <Clock className="w-4 h-4 inline mr-2" />
                      Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() => handleMarkReady(order.id)}
                      className="flex-1 bg-amber-600 text-white py-2 rounded text-sm font-medium hover:opacity-90"
                    >
                      <CheckCircle2 className="w-4 h-4 inline mr-2" />
                      Mark Ready
                    </button>
                  )}
                  {order.status === "ready" && (
                    <button
                      onClick={() => handleMarkServed(order.id)}
                      className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:opacity-90"
                    >
                      <CheckCircle2 className="w-4 h-4 inline mr-2" />
                      Mark Served
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
