"use client"

import * as React from "react"
import { Drawer } from "vaul"
import { SlidersHorizontal, X, Check } from "lucide-react"

interface FilterDrawerProps {
  selectedDietary: string | null
  onDietaryChange: (dietary: string | null) => void
  isPopularOnly: boolean
  onPopularToggle: () => void
  isAvailableOnly: boolean
  onAvailableToggle: () => void
}

export function FilterDrawer({
  selectedDietary,
  onDietaryChange,
  isPopularOnly,
  onPopularToggle,
  isAvailableOnly,
  onAvailableToggle,
}: FilterDrawerProps) {
  const dietaryOptions = [
    { id: null, label: "All Items" },
    { id: "veg", label: "Vegetarian" },
    { id: "non-veg", label: "Non-Vegetarian" },
    { id: "vegan", label: "Vegan" },
  ]

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border hover:border-accent transition-colors text-sm font-light">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
          {(selectedDietary || isPopularOnly || isAvailableOnly) && (
            <span className="w-2 h-2 bg-accent rounded-full" />
          )}
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
        <Drawer.Content className="bg-background border-t border-border flex flex-col rounded-t-[32px] h-[70dvh] fixed bottom-0 left-0 right-0 z-50 outline-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border mt-4 mb-8" />
          
          <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-8">
            <div className="flex items-center justify-between">
              <Drawer.Title className="font-serif text-2xl font-light">Refine Menu</Drawer.Title>
              <Drawer.Close asChild>
                <button className="p-2 bg-secondary rounded-full" aria-label="Close filters">
                  <X className="w-4 h-4" />
                </button>
              </Drawer.Close>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Dietary Preference</h3>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt.id === null ? "all" : opt.id}
                    onClick={() => onDietaryChange(opt.id)}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedDietary === opt.id
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <span className={`text-sm ${selectedDietary === opt.id ? "text-accent font-medium" : "text-foreground font-light"}`}>
                      {opt.label}
                    </span>
                    {selectedDietary === opt.id && <Check className="w-4 h-4 text-accent" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Highlights</h3>
              <div className="space-y-3">
                <button
                  onClick={onPopularToggle}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isPopularOnly ? "border-accent bg-accent/5" : "border-border"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">Chef's Favorites</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Most popular picks</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${isPopularOnly ? "bg-accent" : "bg-secondary"}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isPopularOnly ? "left-6" : "left-1"}`} />
                  </div>
                </button>

                <button
                  onClick={onAvailableToggle}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isAvailableOnly ? "border-accent bg-accent/5" : "border-border"
                  }`}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium">In Stock Only</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Show available dishes</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${isAvailableOnly ? "bg-accent" : "bg-secondary"}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isAvailableOnly ? "left-6" : "left-1"}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border mt-auto pb-safe">
            <Drawer.Close asChild>
              <button className="w-full bg-accent text-accent-foreground py-4 rounded-xl font-medium shadow-lg shadow-accent/20">
                Apply Filters
              </button>
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
