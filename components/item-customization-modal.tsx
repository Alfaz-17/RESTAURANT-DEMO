"use client"

import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MenuItem } from "./menu-data"

interface ItemCustomizationModalProps {
  item: MenuItem | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (customization: ItemCustomization) => void
}

export interface ItemCustomization {
  itemId: string
  specialRequests: string
  allergens: string[]
  extraRequests: string[]
}

const getCustomizationOptions = (category: string) => {
  const options: Record<string, { allergens: string[]; extras: string[] }> = {
    pizzas: {
      allergens: ["Dairy", "Gluten", "Sesame"],
      extras: ["Extra cheese", "Light sauce", "No onions", "Extra vegetables"],
    },
    burgers: {
      allergens: ["Dairy", "Gluten", "Sesame"],
      extras: ["No cheese", "Extra patty", "Light mayo", "Grilled onions"],
    },
    sandwiches: {
      allergens: ["Dairy", "Gluten", "Nuts"],
      extras: ["No butter", "Extra spread", "Toasted", "Side salad"],
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

export function ItemCustomizationModal({ item, isOpen, onClose, onConfirm }: ItemCustomizationModalProps) {
  const [specialRequests, setSpecialRequests] = React.useState("")
  const [selectedAllergens, setSelectedAllergens] = React.useState<string[]>([])
  const [selectedExtras, setSelectedExtras] = React.useState<string[]>([])

  const customizationOptions = React.useMemo(
    () => (item ? getCustomizationOptions(item.category) : { allergens: [], extras: [] }),
    [item],
  )

  const handleToggleAllergen = (allergen: string) => {
    setSelectedAllergens((prev) => (prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]))
  }

  const handleToggleExtra = (extra: string) => {
    setSelectedExtras((prev) => (prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]))
  }

  const handleConfirm = () => {
    if (item) {
      onConfirm({
        itemId: item.id,
        specialRequests,
        allergens: selectedAllergens,
        extraRequests: selectedExtras,
      })
      // Reset
      setSpecialRequests("")
      setSelectedAllergens([])
      setSelectedExtras([])
      onClose()
    }
  }

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center pt-safe">
      <div className="w-full sm:max-w-md bg-card rounded-t-2xl sm:rounded-2xl border border-border max-h-[88dvh] sm:max-h-[80vh] overflow-y-auto pb-safe">
        <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 flex items-center justify-between z-10">
          <h3 className="font-serif text-xl text-foreground">Customize {item.name}</h3>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Allergen Warning */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 sm:p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent mb-1">Allergen Information</p>
              <p className="text-accent/80">Select any allergens to alert our kitchen</p>
            </div>
          </div>

          {/* Allergen Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Allergens</label>
            <div className="grid grid-cols-2 gap-2">
              {customizationOptions.allergens.map((allergen) => (
                <label
                  key={allergen}
                  className="flex items-center gap-2 p-2 rounded border border-border hover:bg-secondary cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedAllergens.includes(allergen)}
                    onChange={() => handleToggleAllergen(allergen)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">{allergen}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Extra Requests */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Preparation Preferences</label>
            <div className="grid grid-cols-2 gap-2">
              {customizationOptions.extras.map((extra) => (
                <label
                  key={extra}
                  className="flex items-center gap-2 p-2 rounded border border-border hover:bg-secondary cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra)}
                    onChange={() => handleToggleExtra(extra)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">{extra}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Special Requests</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any other special requests? (max 200 characters)"
              maxLength={200}
              className="w-full bg-secondary text-foreground border border-border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <p className="text-xs text-muted-foreground">{specialRequests.length}/200</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 py-3 min-h-12 text-sm font-light bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-3 min-h-12 text-sm font-light"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

import React from "react"
