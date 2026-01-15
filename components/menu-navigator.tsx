"use client"

import Image from "next/image"

interface MenuNavigatorProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  categories: Array<{ id: string; name: string; description: string }>
}

// Category images mapping
const CATEGORY_IMAGES: Record<string, string> = {
  starters: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop",
  mains: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
  desserts: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
  beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop",
  specials: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
}

export function MenuNavigator({ activeCategory, onCategoryChange, categories }: MenuNavigatorProps) {
  return (
    <div className="sticky bg-background/95 backdrop-blur-xl z-20 border-b border-border/30 shadow-sm" style={{ top: 'calc(env(safe-area-inset-top) + 128px)' }}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Mobile: Horizontal Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:hidden">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 relative overflow-hidden rounded-2xl transition-all duration-300 ${
                activeCategory === category.id
                  ? "ring-2 ring-accent shadow-lg scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{ width: '120px', height: '100px' }}
            >
              <Image
                src={CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES.starters}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-white text-xs font-bold text-center">{category.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden sm:grid grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative overflow-hidden rounded-2xl transition-all duration-300 aspect-[4/3] ${
                activeCategory === category.id
                  ? "ring-2 ring-accent shadow-xl scale-105"
                  : "opacity-80 hover:opacity-100 hover:scale-102"
              }`}
            >
              <Image
                src={CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES.starters}
                alt={category.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-bold text-center">{category.name}</p>
                <p className="text-white/70 text-xs text-center mt-0.5 line-clamp-1">{category.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
