"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"

interface OrderReceivedScreenProps {
  orderTotal: number
  itemsCount: number
  onNavigateToDashboard: () => void
  onBackToMenu: () => void
}

export function OrderReceivedScreen({
  orderTotal,
  itemsCount,
  onNavigateToDashboard,
  onBackToMenu,
}: OrderReceivedScreenProps) {
  const [isProcessing, setIsProcessing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isProcessing) {
      const navigationTimer = setTimeout(() => {
        onNavigateToDashboard()
      }, 3000)
      return () => clearTimeout(navigationTimer)
    }
  }, [isProcessing, onNavigateToDashboard])

  return (
    <div className="min-h-screen bg-background flex flex-col p-4 relative" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="absolute left-4 z-10" style={{ top: 'calc(env(safe-area-inset-top) + 16px)' }}>
        <button
          onClick={onBackToMenu}
          className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors flex items-center justify-center"
          aria-label="Back to menu"
        >
          <ChevronLeft className="w-6 h-6 text-foreground/70" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-8">
        {isProcessing ? (
          <>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 border-4 border-border border-t-accent rounded-full animate-spin" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-light">Processing Order</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                {itemsCount} items for ${orderTotal.toFixed(2)}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-foreground font-light">Order Received</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your order has been sent to the kitchen. You will see real-time updates next.
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-4 text-sm text-muted-foreground">
              <p className="text-xs uppercase tracking-wide font-medium mb-2">Order Summary</p>
              <p className="text-sm">{itemsCount} items</p>
              <p className="text-lg sm:text-xl font-light text-foreground mt-2">${orderTotal.toFixed(2)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={onBackToMenu}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-3 sm:py-4 rounded transition-colors font-light min-h-12 sm:min-h-auto"
              >
                Back to Menu
              </button>
              <button
                onClick={onNavigateToDashboard}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-3 sm:py-4 rounded transition-colors font-light min-h-12 sm:min-h-auto"
              >
                View Order Status
              </button>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  )
}
