"use client"

import Image from "next/image"

interface MenuNavigatorProps {
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  categories: Array<{ id: string; name: string; description: string }>
}

// Category images mapping
const CATEGORY_IMAGES: Record<string, string> = {
  starters: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=400&fit=crop",
  mains: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
  desserts: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
  beverages: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop",
  specials: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
}

export function MenuNavigator({ activeCategory, onCategoryChange, categories }: MenuNavigatorProps) {
  // Add "All" category at the beginning
  const allCategories = [
    { id: "all", name: "All", description: "All items" },
    ...categories
  ]

  return (
    <div className="bg-white border-b border-gray-100 py-3">
      <div className="max-w-7xl mx-auto px-4">
        {/* Category Pills - Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
          {allCategories.map((category) => {
            const isActive = activeCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0 transition-all ${
                  isActive 
                    ? "bg-amber-500 text-white shadow-md scale-105" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {/* Small Category Image - Skip for "All" */}
                {category.id !== "all" && (
                  <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={CATEGORY_IMAGES[category.id] || CATEGORY_IMAGES.starters}
                      alt={category.name}
                      width={20}
                      height={20}
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Label */}
                <span className="text-sm font-semibold capitalize whitespace-nowrap">
                  {category.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
