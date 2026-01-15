"use client"

import { Search, X, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import { FilterDrawer } from "./filter-drawer"

interface MenuSearchBarProps {
  onSearch: (query: string) => void
  onFilter: (dietary: string | null) => void
  onPopularFilter: (isPopular: boolean) => void
  onAvailableFilter: (isAvailable: boolean) => void
}

export function MenuSearchBar({ onSearch, onFilter, onPopularFilter, onAvailableFilter }: MenuSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null)
  const [isPopularOnly, setIsPopularOnly] = useState(false)
  const [isAvailableOnly, setIsAvailableOnly] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearch(value)
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    onSearch("")
  }

  const handleDietaryFilter = (dietary: string | null) => {
    setSelectedDietary(dietary)
    onFilter(dietary)
  }

  const togglePopular = () => {
    const next = !isPopularOnly
    setIsPopularOnly(next)
    onPopularFilter(next)
  }

  const toggleAvailable = () => {
    const next = !isAvailableOnly
    setIsAvailableOnly(next)
    onAvailableFilter(next)
  }

  const hasActiveFilters = selectedDietary || isPopularOnly || isAvailableOnly

  return (
    <>
      {/* Sticky Search Bar */}
      <div 
        className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 8px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Search Input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search for dishes..."
                className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`px-4 py-3 rounded-xl border-2 transition-all ${
                hasActiveFilters
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:border-amber-500"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedDietary={selectedDietary}
        onDietaryChange={handleDietaryFilter}
        isPopularOnly={isPopularOnly}
        onPopularChange={togglePopular}
        isAvailableOnly={isAvailableOnly}
        onAvailableChange={toggleAvailable}
      />
    </>
  )
}
