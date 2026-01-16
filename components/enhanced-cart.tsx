"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, MapPin, Sparkles } from "lucide-react"
import { useTable } from "@/lib/table-context"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  specialRequests?: string
  customization?: {
    allergens: string[]
    extras: string[]
    specialRequests: string
  }
}

interface FloatingCartButtonProps {
  itemCount: number
  total: number
  onClick: () => void
}

export function FloatingCartButton({ itemCount, total, onClick }: FloatingCartButtonProps) {
  if (itemCount === 0) return null

  return (
    <motion.button
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-amber-900 to-amber-800 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}
    >
      <div className="relative">
        <ShoppingBag className="w-6 h-6" />
        <motion.div
          key={itemCount}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
        >
          {itemCount}
        </motion.div>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xs opacity-90">View Cart</span>
        <span className="text-lg font-bold">₹{total.toFixed(0)}</span>
      </div>
    </motion.button>
  )
}

interface EnhancedCartPanelProps {
  items: CartItem[]
  isOpen: boolean
  onClose: () => void
  onRemove: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onConfirm: () => void
}

export function EnhancedCartPanel({
  items,
  isOpen,
  onClose,
  onRemove,
  onUpdateQuantity,
  onConfirm,
}: EnhancedCartPanelProps) {
  const { tableNumber } = useTable()
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-[60] max-h-[88dvh] flex flex-col pb-safe"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/30">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Cart</h2>
                {tableNumber && (
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-600">{tableNumber}</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List - More Visual */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="bg-gray-50 rounded-2xl overflow-hidden"
                      >
                        {/* Item with Image */}
                        <div className="flex gap-4 p-4">
                          {/* Large Image */}
                          {item.image && (
                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          )}

                          {/* Item Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
                              <button
                                onClick={() => onRemove(item.id)}
                                className="text-red-500 hover:text-red-600 p-1 -mt-1"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">₹{item.price} per portion</p>

                            {/* Quantity Controls - Horizontal */}
                            <div className="flex items-center gap-3">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-10 h-10 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-amber-600 transition-colors shadow-sm"
                              >
                                <Minus className="w-5 h-5 text-gray-700" />
                              </motion.button>
                              
                              <motion.span
                                key={item.quantity}
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1 }}
                                className="text-2xl font-bold text-gray-900 w-12 text-center"
                              >
                                {item.quantity}
                              </motion.span>
                              
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 rounded-full bg-amber-900 text-white flex items-center justify-center hover:bg-amber-800 transition-colors shadow-md"
                              >
                                <Plus className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border/30 p-6 space-y-4 bg-secondary/20">
                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (18%)</span>
                    <span className="font-semibold">₹{tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-border/30">
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-amber-900"
                    >
                      ₹{total.toFixed(0)}
                    </motion.span>
                  </div>
                </div>

                {/* Confirm Button - Bigger, Clearer */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="w-full bg-gradient-to-r from-amber-900 to-amber-800 text-white py-5 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Place Order
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
