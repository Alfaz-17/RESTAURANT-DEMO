"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"
import type { MenuItem } from "@/components/menu-data"
import { getSuggestions, type AIFoodyInput } from "@/lib/ai-foody-engine"

interface AIFoodyModalProps {
  isOpen: boolean
  onClose: () => void
  menuItems: MenuItem[]
  onSelectItem: (item: MenuItem) => void
}

export function AIFoodyModal({ isOpen, onClose, menuItems, onSelectItem }: AIFoodyModalProps) {
  const [step, setStep] = useState<"questions" | "suggestions">("questions")
  const [input, setInput] = useState<AIFoodyInput>({
    dietary: null,
    mood: null,
    spice: null,
    budget: null,
  })
  const [suggestions, setSuggestions] = useState<MenuItem[]>([])

  const handleGetSuggestions = () => {
    const results = getSuggestions(menuItems, input)
    setSuggestions(results)
    setStep("suggestions")
  }

  const handleSelectSuggestion = (item: MenuItem) => {
    onSelectItem(item)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-0 sm:p-4">
      <div className="bg-background rounded-t-[32px] sm:rounded-lg max-w-md w-full max-h-[92dvh] overflow-y-auto sm:max-h-[90vh] self-end sm:self-center pt-safe pb-safe">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-4 sm:p-6 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">AI Foody</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {step === "questions" && (
            <>
              <p className="text-sm text-muted-foreground">
                Answer a few quick questions to get personalized suggestions
              </p>

              {/* Dietary */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Dietary Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "veg" as const, label: "Veg" },
                    { value: "non-veg" as const, label: "Non-Veg" },
                    { value: "vegan" as const, label: "Vegan" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInput({ ...input, dietary: input.dietary === opt.value ? null : opt.value })}
                      className={`py-2 px-3 rounded text-sm font-light transition-colors ${
                        input.dietary === opt.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Portion Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "light" as const, label: "Light" },
                    { value: "filling" as const, label: "Filling" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInput({ ...input, mood: input.mood === opt.value ? null : opt.value })}
                      className={`py-2 px-3 rounded text-sm font-light transition-colors ${
                        input.mood === opt.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spice */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Heat Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "mild" as const, label: "Mild" },
                    { value: "medium" as const, label: "Medium" },
                    { value: "spicy" as const, label: "Spicy" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInput({ ...input, spice: input.spice === opt.value ? null : opt.value })}
                      className={`py-2 px-3 rounded text-sm font-light transition-colors ${
                        input.spice === opt.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Budget</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "low" as const, label: "Up to ₹150" },
                    { value: "medium" as const, label: "Up to ₹250" },
                    { value: "any" as const, label: "Any" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setInput({ ...input, budget: input.budget === opt.value ? null : opt.value })}
                      className={`py-2 px-3 rounded text-sm font-light transition-colors ${
                        input.budget === opt.value
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGetSuggestions}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 rounded font-light transition-colors"
              >
                Get Suggestions
              </button>
            </>
          )}

          {step === "suggestions" && (
            <>
              <p className="text-sm text-muted-foreground">Top 3 recommendations for you</p>
              <div className="space-y-3">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border rounded p-3 hover:bg-secondary/50 transition-colors cursor-pointer"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs bg-secondary px-2 py-1 rounded">₹{item.price}</span>
                          <span className="text-xs bg-secondary px-2 py-1 rounded capitalize">{item.dietary}</span>
                        </div>
                      </div>
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setStep("questions")
                  setInput({ dietary: null, mood: null, spice: null, budget: null })
                }}
                className="w-full bg-secondary hover:bg-secondary/80 text-foreground py-2 rounded font-light text-sm transition-colors"
              >
                Back to Questions
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
