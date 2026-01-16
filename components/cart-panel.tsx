"use client"

import { useState } from "react";
import { useTable } from "@/lib/table-context";
import type { MenuItem } from "./menu-data";

import { X, Plus, Minus, ChevronRight, ChevronLeft, CreditCard, Wallet, Landmark, MapPin, Sparkles } from "lucide-react"

interface CartItem extends MenuItem {
  quantity: number
  specialRequests?: string
  allergens?: string[]
  extraRequests?: string[]
}

interface CartPanelProps {
  items: CartItem[]
  isOpen: boolean
  onRemove: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onConfirm: () => void
}

export function CartPanel({ items, isOpen, onRemove, onUpdateQuantity, onConfirm }: CartPanelProps) {
  const [step, setStep] = useState<"review" | "details">("review")
  const [showNotes, setShowNotes] = useState(false)
  const [orderNote, setOrderNote] = useState("")
  const { tableNumber } = useTable()

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onConfirm}>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl max-h-[75dvh] overflow-y-auto shadow-2xl" 
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between sticky top-0 bg-card z-10 pb-4">
            <div className="flex-1">
              <h3 className="font-serif text-2xl text-foreground font-light">
                {step === "review" && "Your Selection"}
                {step === "details" && "Confirm Order"}
              </h3>
              {tableNumber && (
                <div className="flex items-center gap-2 mt-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">{tableNumber}</span>
                </div>
              )}
            </div>
            {step === "details" && (
              <button 
                onClick={() => setStep("review")}
                className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            )}
          </div>

          {step === "review" && (
            <>
              {/* Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                      <Plus className="w-8 h-8 opacity-20" />
                    </div>
                    <p className="text-muted-foreground font-light italic">Your selection is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border/20 last:border-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-foreground font-light text-base truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">₹{item.price} per portion</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg border border-border hover:border-accent transition-colors"
                        >
                          {item.quantity === 1 ? <X size={14} className="text-destructive" /> : <Minus size={14} />}
                        </button>
                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-secondary rounded-lg border border-border hover:border-accent transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Special Requests */}
              {items.length > 0 && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="flex items-center gap-2 text-xs text-accent uppercase tracking-widest font-medium group"
                  >
                    <span>{showNotes ? "− Hide" : "+ Add"} Cooking Instructions</span>
                  </button>
                  {showNotes && (
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="e.g. Extra spicy, no onions, less oil..."
                      className="w-full bg-secondary/50 text-foreground border border-border rounded-xl p-4 text-sm resize-none h-24 focus:outline-none focus:ring-1 focus:ring-accent transition-all animate-in fade-in duration-300"
                    />
                  )}
                </div>
              )}
            </>
          )}

          {step === "details" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              {tableNumber && (
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Seated at</p>
                      <p className="text-lg font-bold text-accent">{tableNumber}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">Special Instructions</label>
                <textarea
                  placeholder="Any special requests or dietary requirements?"
                  className="w-full bg-secondary text-foreground border border-border rounded-lg p-3 text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          )}

          {/* Pricing & Footer Buttons */}
          {items.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-border/20">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground uppercase tracking-widest font-light">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-light">
                  <span>Service & Tax (18%)</span>
                  <span>₹{(subtotal * 0.18).toFixed(0)}</span>
                </div>
                <div className="flex justify-between pt-3 text-foreground font-serif text-2xl items-center">
                  <span className="font-light">Total</span>
                  <span className="text-accent underline underline-offset-8 decoration-accent/20 decoration-2">
                    ₹{(subtotal * 1.18).toFixed(0)}
                  </span>
                </div>
              </div>

              {step === "review" && (
                <button
                  onClick={() => setStep("details")}
                  className="w-full luxury-button py-4 flex items-center justify-center gap-2 group h-14"
                >
                  Confirm Items <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {step === "details" && (
                <button
                  onClick={onConfirm}
                  className="w-full bg-accent text-accent-foreground py-4 rounded-xl flex items-center justify-center gap-2 font-medium h-14 shadow-lg shadow-accent/30 hover:shadow-accent/40 transition-all uppercase tracking-widest text-xs"
                >
                  Place Order <Sparkles className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
