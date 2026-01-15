"use client"

import * as React from "react"
import { Drawer } from "vaul"
import { X, Flame, Leaf, Utensils, Star, Info, ShoppingCart, ChevronRight, Share2, AlertCircle } from "lucide-react"
import type { MenuItem } from "./menu-data"
import { Button } from "@/components/ui/button"

interface MealDetailsDrawerProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, customization?: any) => void
}

const getCustomizationOptions = (category: string) => {
  const options: Record<string, { allergens: string[]; extras: string[] }> = {
    pizzas: {
      allergens: ["Dairy", "Gluten", "Sesame"],
      extras: ["Extra cheese", "Light sauce", "No onions", "Extra vegetables", "Thin crust"],
    },
    burgers: {
      allergens: ["Dairy", "Gluten", "Sesame"],
      extras: ["No cheese", "Extra patty", "Light mayo", "Grilled onions", "Lettuce wrap"],
    },
    sandwiches: {
      allergens: ["Dairy", "Gluten", "Nuts"],
      extras: ["No butter", "Extra spread", "Toasted", "Side salad", "Whole wheat"],
    },
    appetizers: {
      allergens: ["Dairy", "Gluten", "Shellfish"],
      extras: ["Extra sauce", "Mild spice", "No salt", "Dipping sauce"],
    },
    beverages: {
      allergens: ["Dairy", "Nuts", "Sesame"],
      extras: ["No sugar", "Extra ice", "Light milk", "No whipped cream"],
    },
    desserts: {
      allergens: ["Dairy", "Gluten", "Nuts"],
      extras: ["No sugar", "Extra toppings", "Light frosting", "No whipped cream"],
    },
    combos: {
      allergens: ["Dairy", "Gluten", "Sesame"],
      extras: ["Drink choice", "Extra sides", "No rice", "Mild sauce"],
    },
    specials: {
      allergens: ["Dairy", "Gluten", "Nuts"],
      extras: ["As per chef", "Less oil", "No spice", "Side vegetables"],
    },
  }
  return options[category] || options.pizzas
}

export function MealDetailsDrawer({ item, isOpen, onClose, onAddToCart }: MealDetailsDrawerProps) {
  const [selectedAllergens, setSelectedAllergens] = React.useState<string[]>([])
  const [selectedExtras, setSelectedExtras] = React.useState<string[]>([])
  const [specialRequests, setSpecialRequests] = React.useState("")

  React.useEffect(() => {
    if (!isOpen) {
      setSelectedAllergens([])
      setSelectedExtras([])
      setSpecialRequests("")
    }
  }, [isOpen])

  if (!item) return null

  const spiceLines = {
    mild: "Gentle warmth with aromatic herbs",
    medium: "Balanced heat with traditional spices",
    bold: "Intense flavors with a fiery finish",
  }

  const customizationOptions = getCustomizationOptions(item.category)

  const handleToggleAllergen = (allergen: string) => {
    setSelectedAllergens((prev) => (prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]))
  }

  const handleToggleExtra = (extra: string) => {
    setSelectedExtras((prev) => (prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]))
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 z-50 backdrop-blur-md" />
        <Drawer.Content className="bg-background border-t border-border flex flex-col rounded-t-[32px] h-[92vh] fixed bottom-0 left-0 right-0 z-50 outline-none overflow-hidden">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border mt-4 mb-4" />
          
          <div className="flex-1 overflow-y-auto pb-48">
            {/* Hero Image */}
            <div className="relative h-72 sm:h-96 w-full">
              <img 
                src={item.image || "/placeholder.svg"} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/40 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button onClick={onClose} className="p-2 bg-black/20 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-black/40 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {item.isPopular && (
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium flex items-center gap-1 shadow-lg shadow-accent/20">
                    <Star className="w-3 h-3 fill-current" /> Trending
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium border backdrop-blur-md ${
                  item.dietary === "veg" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                  item.dietary === "vegan" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                  "bg-red-500/10 text-red-500 border-red-500/20"
                }`}>
                  {item.dietary}
                </span>
              </div>
            </div>

            <div className="px-6 space-y-10 mt-6">
              {/* Header Info */}
              <div className="space-y-3">
                <Drawer.Title className="font-serif text-3xl sm:text-4xl font-light text-foreground">{item.name}</Drawer.Title>
                <div className="flex items-center gap-4 text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">
                  <span className="flex items-center gap-1"><Utensils className="w-3 h-3" /> {item.category}</span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span>{item.portion} Portion</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">The Experience</h3>
                <p className="text-foreground/80 leading-relaxed font-light text-lg italic font-serif">
                  "{item.description}"
                </p>
                {item.chefNote && (
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 flex gap-3 italic text-sm text-accent/80">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>Chef's Note: {item.chefNote}</p>
                  </div>
                )}
              </div>

              {/* Tailor Your Dish (New Customization Section) */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Tailor Your Dish</h3>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest italic">Personalize to your taste</span>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Preferences</p>
                  <div className="flex flex-wrap gap-2">
                    {customizationOptions.extras.map((extra) => (
                      <button
                        key={extra}
                        onClick={() => handleToggleExtra(extra)}
                        className={`px-4 py-2 rounded-full border text-xs sm:text-sm transition-all duration-300 font-light ${
                          selectedExtras.includes(extra)
                            ? "bg-accent border-accent text-accent-foreground shadow-lg shadow-accent/20 scale-105"
                            : "bg-secondary/50 border-border text-foreground/60 hover:border-accent/40"
                        }`}
                      >
                        {extra}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergen Alerts */}
                <div className="space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Allergen Safety</p>
                  <div className="flex flex-wrap gap-2">
                    {customizationOptions.allergens.map((allergen) => (
                      <button
                        key={allergen}
                        onClick={() => handleToggleAllergen(allergen)}
                        className={`px-4 py-2 rounded-full border text-xs sm:text-sm transition-all duration-300 font-light ${
                          selectedAllergens.includes(allergen)
                            ? "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20 scale-105"
                            : "bg-secondary/50 border-border text-foreground/60 hover:border-red-500/40"
                        }`}
                      >
                        {selectedAllergens.includes(allergen) ? (
                          <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {allergen}</span>
                        ) : (
                          allergen
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Special Instructions</p>
                  <textarea
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Anything else our chef should know? (e.g. well done, no sauce...)"
                    className="w-full bg-secondary/30 text-foreground border border-border rounded-2xl p-4 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-accent transition-all placeholder:text-muted-foreground/40 font-light"
                  />
                </div>
              </div>

              {/* Character / Spice Info */}
              <div className="space-y-4 pt-4">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Character</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Flame className={`w-5 h-5 ${item.spice === "bold" ? "text-red-500" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Spice Profile</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.spice ? spiceLines[item.spice] : "Mild & Delicate"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-2xl border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Freshness</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Organically Sourced</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
 
          {/* Fixed Footer Action */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background/90 backdrop-blur-xl border-t border-border flex items-center justify-between gap-6" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)', paddingTop: '24px' }}>
            <div className="flex flex-col min-w-[100px]">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Investment</span>
              <span className="font-serif text-3xl text-accent">₹{item.price}</span>
            </div>
            <button
              onClick={() => {
                onAddToCart(item, {
                  allergens: selectedAllergens,
                  extras: selectedExtras,
                  specialRequests
                })
                onClose()
              }}
              className="flex-1 bg-foreground text-background py-4 rounded-xl flex items-center justify-center gap-2 font-medium shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-xs h-16 group"
            >
              Add to Cart <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
