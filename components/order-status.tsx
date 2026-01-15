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

      <div className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-8 space-y-8">
              <div className="text-center">
                <h1 className="font-serif text-2xl sm:text-4xl text-foreground font-light mb-2">Order Status</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {displayItemsCount} items for ${displayTotal.toFixed(2)}
                </p>
              </div>

              {error && (
                <div className="bg-red-50/50 border border-red-100 rounded-xl p-3 text-xs text-red-600">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <OrderTrackingTimeline status={status as any} />
              </div>

              {status === "preparing" && estimatedMinutesLeft > 0 && (
                <div className="bg-secondary/50 rounded-2xl p-4 text-center space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Estimated Ready Time</p>
                  <p className="text-3xl font-light text-accent">{estimatedMinutesLeft}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">minutes</p>
                </div>
              )}

              <div className="space-y-3 pt-4">
                {status === "ready" && (
                  <>
                    <button
                      onClick={onFeedback}
                      className="w-full px-6 py-4 border border-accent/20 rounded-xl hover:bg-accent/5 transition-all font-light text-sm text-accent"
                    >
                      Share Feedback
                    </button>
                    <button
                      onClick={onNewOrder}
                      className="w-full px-6 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl font-medium text-sm shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
                    >
                      Place New Order
                    </button>
                  </>
                )}
                
                <button
                  onClick={onNewOrder}
                  className="w-full px-6 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center px-4">
            <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em]">
              Real-time updates powered by Kitchen Sync™
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
