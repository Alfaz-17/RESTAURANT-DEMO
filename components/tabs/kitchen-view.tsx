"use client"

import { useDashboard } from "@/lib/dashboard-context"
import { Clock, CheckCircle, Bell, Waves, Receipt, HelpCircle, MapPin } from "lucide-react"
import { motion } from "framer-motion"

interface KitchenViewProps {
  refreshTrigger: number
  liveOrders: any[]
}

export function KitchenView({ liveOrders }: KitchenViewProps) {
  const { updateOrderStatus, serviceRequests, resolveServiceRequest } = useDashboard()

  const activeRequests = serviceRequests.filter(r => !r.resolved)
  const pendingOrders = liveOrders.filter(o => o.status === "pending")
  const preparingOrders = liveOrders.filter(o => o.status === "preparing")
  const readyOrders = liveOrders.filter(o => o.status === "ready")

  const getElapsedMinutes = (timestamp: number) => {
    return Math.floor((Date.now() - (timestamp || Date.now())) / 60000)
  }

  const getRequestIcon = (type: string) => {
    switch (type) {
      case "water": return Waves
      case "bill": return Receipt
      case "assistance": return Bell
      default: return HelpCircle
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Service Requests - If Any */}
      {activeRequests.length > 0 && (
        <div key={`requests-${activeRequests.length}`} className="luxury-card border-accent/20 bg-accent/[0.02] p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="p-2 glass rounded-lg animate-pulse">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em]">Priority Service</h3>
              <p className="text-lg sm:text-xl font-serif text-foreground font-bold">{activeRequests.length} Outstanding Requests</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {activeRequests.map((request) => {
              const Icon = getRequestIcon(request.type)
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-xl p-3 sm:p-4 border border-border/50 flex items-center justify-between shadow-sm active-press"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/5 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-foreground text-sm sm:text-base">{request.tableNumber}</p>
                      <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{request.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => resolveServiceRequest(request.id)}
                    className="p-2 transition-colors hover:text-emerald-500"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Orders by Status */}
      <div className="space-y-4">
        {/* New Orders */}
        {pendingOrders.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              New Orders ({pendingOrders.length})
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {pendingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusColor="red"
                  onAccept={() => updateOrderStatus(order.id, "preparing")}
                  getElapsedMinutes={getElapsedMinutes}
                />
              ))}
            </div>
          </div>
        )}

        {/* Preparing */}
        {preparingOrders.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Preparing ({preparingOrders.length})
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {preparingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusColor="orange"
                  onReady={() => updateOrderStatus(order.id, "ready")}
                  getElapsedMinutes={getElapsedMinutes}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ready */}
        {readyOrders.length > 0 && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Ready to Serve ({readyOrders.length})
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {readyOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  statusColor="green"
                  onServe={() => updateOrderStatus(order.id, "served")}
                  getElapsedMinutes={getElapsedMinutes}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {liveOrders.length === 0 && (
          <div className="text-center py-10 sm:py-16">
            <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-green-500 mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600 text-sm">No active orders right now</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Order Card Component
function OrderCard({ order, statusColor, onAccept, onReady, onServe, getElapsedMinutes }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="luxury-card group p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColor === "red" ? "bg-accent animate-pulse shadow-accent/50 shadow-lg" : "bg-muted"}`} />
            <span className="font-serif text-base sm:text-lg text-foreground font-bold tracking-tight">{order.tableNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            <Clock className="w-3 h-3" />
            <span>{getElapsedMinutes(order.timestamp)} min ago</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-40">Order #{order.id.slice(0, 6)}</p>
          <p className="text-lg sm:text-xl font-serif text-accent font-medium tracking-tight">₹{order.total}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-secondary/30 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border border-border/10">
        <p className="text-[8px] sm:text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3 opacity-60">Provisioning</p>
        <div className="space-y-1 sm:space-y-2">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-center text-xs font-medium">
              <span className="text-foreground/80">{item.quantity}x {item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {onAccept && (
        <button
          onClick={onAccept}
          className="w-full bg-foreground text-background py-3 sm:py-4 rounded-xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] transition-all hover:bg-accent hover:text-white active-press"
        >
          Begin Preparation
        </button>
      )}
      {onReady && (
        <button
          onClick={onReady}
          className="w-full bg-accent text-white py-3 sm:py-4 rounded-xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] transition-all hover:shadow-xl active-press"
        >
          Finalize & Serve
        </button>
      )}
      {onServe && (
        <button
          onClick={onServe}
          className="w-full bg-emerald-500 text-white py-3 sm:py-4 rounded-xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[9px] sm:text-[10px] transition-all active-press"
        >
          Order Fulfilling
        </button>
      )}
    </motion.div>
  )
}
