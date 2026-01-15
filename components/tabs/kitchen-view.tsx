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
    return Math.floor((Date.now() - timestamp) / 60000)
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
    <div className="space-y-6">
      {/* Service Requests - If Any */}
      {activeRequests.length > 0 && (
        <div key={`requests-${activeRequests.length}`} className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-amber-700 animate-pulse" />
            <h3 className="font-bold text-amber-900">🔔 Service Requests ({activeRequests.length})</h3>
          </div>
          <div className="space-y-2">
            {activeRequests.map((request) => {
              const Icon = getRequestIcon(request.type)
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl p-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{request.tableNumber}</p>
                      <p className="text-sm text-gray-600 capitalize">{request.type}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => resolveServiceRequest(request.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Done
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
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              New Orders ({pendingOrders.length})
            </h3>
            <div className="space-y-3">
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
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Preparing ({preparingOrders.length})
            </h3>
            <div className="space-y-3">
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
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              Ready to Serve ({readyOrders.length})
            </h3>
            <div className="space-y-3">
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
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">All Caught Up!</h3>
            <p className="text-gray-600">No active orders right now</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Order Card Component
function OrderCard({ order, statusColor, onAccept, onReady, onServe, getElapsedMinutes }: any) {
  const colorClasses = {
    red: "bg-red-50 border-red-200",
    orange: "bg-orange-50 border-orange-200",
    green: "bg-green-50 border-green-200",
  }

  const buttonClasses = {
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-600 hover:bg-orange-700",
    green: "bg-green-600 hover:bg-green-700",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${colorClasses[statusColor]} border-2 rounded-2xl p-4`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-700" />
            <span className="font-bold text-lg text-gray-900">{order.tableNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{getElapsedMinutes(order.timestamp)} min ago</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Order #{order.id.slice(0, 6)}</p>
          <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl p-3 mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Items</p>
        <div className="space-y-1">
          {order.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-900">{item.quantity}x {item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      {onAccept && (
        <button
          onClick={onAccept}
          className={`w-full ${buttonClasses[statusColor]} text-white py-3 rounded-xl font-bold text-base`}
        >
          Start Preparing
        </button>
      )}
      {onReady && (
        <button
          onClick={onReady}
          className={`w-full ${buttonClasses[statusColor]} text-white py-3 rounded-xl font-bold text-base`}
        >
          Mark as Ready
        </button>
      )}
      {onServe && (
        <button
          onClick={onServe}
          className={`w-full ${buttonClasses[statusColor]} text-white py-3 rounded-xl font-bold text-base`}
        >
          Served
        </button>
      )}
    </motion.div>
  )
}
