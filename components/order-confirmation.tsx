"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, ChefHat, Home } from "lucide-react"

interface OrderConfirmationProps {
  orderNumber: string
  itemCount: number
  total: number
  estimatedTime: number
  onBackToMenu: () => void
}

export function OrderConfirmation({
  orderNumber,
  itemCount,
  total,
  estimatedTime,
  onBackToMenu,
}: OrderConfirmationProps) {
  return (
    <div className="min-h-screen-dynamic bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Order Placed!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground mb-8"
        >
          Your order has been confirmed
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-secondary/30 rounded-2xl p-6 mb-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Order Number</span>
            <span className="font-bold text-lg">#{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Items</span>
            <span className="font-semibold">{itemCount} items</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-bold text-xl text-amber-900">₹{total}</span>
          </div>
        </motion.div>

        {/* Estimated Time */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8 bg-amber-50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-700" />
            <div className="text-left">
              <p className="text-xs text-amber-700">Estimated Time</p>
              <p className="font-bold text-amber-900">{estimatedTime} mins</p>
            </div>
          </div>
          <div className="w-px h-8 bg-amber-200" />
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-amber-700" />
            <div className="text-left">
              <p className="text-xs text-amber-700">Status</p>
              <p className="font-bold text-amber-900">Preparing</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onBackToMenu}
          className="w-full bg-gradient-to-r from-amber-900 to-amber-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
        >
          <Home className="w-5 h-5" />
          Back to Menu
        </motion.button>
      </motion.div>
    </div>
  )
}
