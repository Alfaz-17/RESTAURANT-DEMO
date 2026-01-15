"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { ChevronLeft, Sparkles } from "lucide-react"
import { OrderTrackingTimeline } from "./order-tracking-timeline"

interface OrderStatusProps {
  orderId: string
  orderConfirmed: boolean
  itemsCount: number
  total: number
  onFeedback: () => void
  onNewOrder: () => void
}

export function OrderStatus({ orderId, orderConfirmed, itemsCount, total, onFeedback, onNewOrder }: OrderStatusProps) {
  const { orders } = useDashboard()
  const [estimatedMinutesLeft, setEstimatedMinutesLeft] = useState(5)
  const [error, setError] = useState<string | null>(null)

  const order = orders.find((o) => o.id === orderId)
  const status = order?.status || "pending"
  const estimatedReadyTime = order?.estimatedReadyTime

  const displayItemsCount = order?.items.length || itemsCount
  const displayTotal = order?.total || total

  useEffect(() => {
    if (!estimatedReadyTime) return

    const updateTimer = setInterval(() => {
      try {
        const now = new Date()
        const diffMs = estimatedReadyTime.getTime() - now.getTime()
        const diffMinutes = Math.ceil(diffMs / (1000 * 60))
        setEstimatedMinutesLeft(Math.max(0, diffMinutes))
      } catch (err) {
        setError("Unable to calculate time. Please try again.")
        console.log("[v0] Timer calculation error:", err)
      }
    }, 5000) // Changed from 30000ms to 5000ms

    return () => clearInterval(updateTimer)
  }, [estimatedReadyTime])

  const statusText = {
    pending: "Order Received",
    preparing: "Being Prepared",
    ready: "Ready to Serve",
    served: "Served",
  }

  const statusColor = {
    pending: "text-blue-600",
    preparing: "text-yellow-600",
    ready: "text-green-600",
    served: "text-accent",
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 pb-24 relative">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onNewOrder}
          className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors flex items-center justify-center"
          aria-label="Back to menu"
        >
          <ChevronLeft className="w-6 h-6 text-foreground/70" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="font-serif text-4xl text-foreground font-light mb-2">Order Status</h1>
          <p className="text-sm text-muted-foreground">
            {displayItemsCount} items for ${displayTotal.toFixed(2)}
          </p>
        </div>

        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">{error}</div>}

        <div className="space-y-6">
          <OrderTrackingTimeline status={status as any} />
        </div>

        {status === "preparing" && estimatedMinutesLeft > 0 && (
          <div className="bg-secondary rounded-lg p-4 space-y-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Ready Time</p>
            <p className="text-3xl font-light">{estimatedMinutesLeft}</p>
            <p className="text-xs text-muted-foreground">minutes</p>
          </div>
        )}

        {status === "ready" && (
          <div className="space-y-3 pt-4">
            <button
              onClick={onFeedback}
              className="w-full px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors font-light text-sm"
            >
              Share Feedback
            </button>
            <button
              onClick={onNewOrder}
              className="w-full px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-light text-sm"
            >
              Place New Order
            </button>
          </div>
        )}

        <button
          onClick={onNewOrder}
          className="w-full px-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
        >
          Back to Menu
        </button>
        </div>
      </div>
    </div>
  )
}
