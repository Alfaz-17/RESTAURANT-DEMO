"use client"

import { Star, SlidersHorizontal } from "lucide-react"
import type { MenuItem } from "./menu-data"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
  onItemClick?: (item: MenuItem) => void
  isFavorite?: boolean
  onToggleFavorite?: () => void
  variant?: "default" | "featured"
}

export function MenuItemCard({ item, onAddToCart, onItemClick, variant = "default" }: MenuItemCardProps) {
  // Generate random rating between 4.0-5.0 for demo
  const rating = (4.0 + Math.random()).toFixed(1)
  const isFeatured = variant === "featured"

  return (
    <div className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
      item.available === false ? "grayscale opacity-60" : ""
    } ${
      isFeatured 
        ? "border-2 border-amber-500 shadow-xl shadow-amber-500/20 scale-[1.02]" 
        : "shadow-md hover:shadow-xl border border-transparent"
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
        
        {/* Featured Badge */}
        {(item.isPopular || isFeatured) && item.available !== false && (
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
              isFeatured 
                ? "bg-amber-500 text-white shadow-lg" 
                : "bg-amber-900 text-white"
            }`}>
              {isFeatured ? "Must Try" : "Popular"}
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
      <div className={`${isFeatured ? "p-4 bg-gradient-to-b from-amber-50/50 to-white" : "p-3 sm:p-4"}`}>
        {/* Rating and Name - Clickable for details */}
        <div className="cursor-pointer group" onClick={() => onItemClick?.(item)}>
          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${isFeatured ? "fill-amber-500 text-amber-500" : "fill-amber-400 text-amber-400"}`} />
            <span className="text-xs sm:text-sm font-bold text-foreground">{rating}</span>
          </div>

          {/* Name */}
          <h3 className="font-bold text-[15px] sm:text-lg text-foreground mb-2 line-clamp-1 group-hover:text-amber-700">
            {item.name}
          </h3>
        </div>

        {/* Price and Add Button */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="hidden sm:block text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Price</p>
            <p className="text-lg sm:text-xl font-bold text-foreground truncate">₹{item.price}</p>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
               onClick={(e) => {
                 e.stopPropagation()
                 onItemClick?.(item)
               }}
               className={`p-2 sm:p-2.5 rounded-lg border transition-all duration-300 active-press ${
                 isFeatured 
                   ? "border-amber-200 text-amber-700 hover:bg-amber-100" 
                   : "border-input text-muted-foreground hover:text-foreground hover:bg-accent"
               }`}
               aria-label="Customize"
            >
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddToCart(item)
              }}
              disabled={item.available === false}
              className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-bold uppercase tracking-wide text-[10px] sm:text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg active-press ${
                isFeatured
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/25"
                  : "bg-amber-900 hover:bg-amber-800 active:bg-amber-950 text-white"
              }`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
