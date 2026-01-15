"use client"

import { Star, SlidersHorizontal } from "lucide-react"
import type { MenuItem } from "./menu-data"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  onItemClick?: (item: MenuItem) => void
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

export function MenuItemCard({ item, onAddToCart, onItemClick }: MenuItemCardProps) {
  // Generate random rating between 4.0-5.0 for demo
  const rating = (4.0 + Math.random()).toFixed(1)

  return (
    <div className={`relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
      item.available === false ? "grayscale opacity-60" : ""
    }`}>
      {/* Image - Clickable for details */}
      <div 
        className="relative h-48 sm:h-56 overflow-hidden bg-secondary cursor-pointer"
        onClick={() => onItemClick?.(item)}
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        
        {/* Popular Badge */}
        {item.isPopular && item.available !== false && (
          <div className="absolute top-3 left-3">
            <span className="bg-amber-900 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
              Popular
            </span>
          </div>
        )}

        {/* Availability Indicator */}
        <div className="absolute top-3 right-3">
          <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-lg" />
        </div>

        {/* Sold Out Overlay */}
        {item.available === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-bold text-foreground">{rating}</span>
        </div>

        {/* Name - Clickable for details */}
        <h3 
          className="font-bold text-base sm:text-lg text-foreground mb-2 line-clamp-1 cursor-pointer hover:text-amber-700"
          onClick={() => onItemClick?.(item)}
        >
          {item.name}
        </h3>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Price</p>
            <p className="text-xl font-bold text-foreground">₹{item.price}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
               onClick={(e) => {
                 e.stopPropagation()
                 onItemClick?.(item)
               }}
               className="p-2.5 rounded-lg border border-input text-muted-foreground hover:text-foreground hover:bg-accent hover:border-accent transition-all duration-300"
               aria-label="Customize"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(item)
              }}
              disabled={item.available === false}
              className="bg-amber-900 hover:bg-amber-800 active:bg-amber-950 text-white px-6 py-2.5 rounded-lg font-bold uppercase tracking-wide text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
