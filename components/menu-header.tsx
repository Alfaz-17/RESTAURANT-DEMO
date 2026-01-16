"use client"

import { ShoppingCart, Bell } from "lucide-react"
import { useState } from "react"

interface MenuHeaderProps {
  cartCount: number
  onCartClick: () => void
  onServiceRequest?: (type: string) => void
  onDashboardClick?: () => void
  onAIFoodyClick?: () => void
  onBack?: () => void
}

export function MenuHeader({ cartCount, onCartClick, onServiceRequest }: MenuHeaderProps) {
  const [showServiceMenu, setShowServiceMenu] = useState(false)

  const handleServiceClick = (type: string) => {
    onServiceRequest?.(type)
    setShowServiceMenu(false)
  }

  return (
    <div className="bg-white border-b border-gray-100 pt-safe">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
        {/* Logo/Title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">Restaurant</h1>
          <p className="text-xs text-gray-500">Table dining</p>
        </div>

        {/* Service Request Button */}
        {onServiceRequest && (
          <div className="relative">
            <button
              onClick={() => setShowServiceMenu(!showServiceMenu)}
              className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors shadow-md"
            >
              <Bell className="w-5 h-5" />
            </button>

            {/* Service Menu Dropdown */}
            {showServiceMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowServiceMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-200 py-2 min-w-[160px] z-50">
                  <button
                    onClick={() => handleServiceClick("water")}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3"
                  >
                    <span className="text-lg">💧</span>
                    <span className="text-sm font-medium text-gray-900">Water</span>
                  </button>
                  <button
                    onClick={() => handleServiceClick("bill")}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3"
                  >
                    <span className="text-lg">🧾</span>
                    <span className="text-sm font-medium text-gray-900">Bill</span>
                  </button>
                  <button
                    onClick={() => handleServiceClick("assistance")}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center gap-3"
                  >
                    <span className="text-lg">🙋</span>
                    <span className="text-sm font-medium text-gray-900">Help</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Cart Button */}
        <button
          onClick={onCartClick}
          className="relative p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
