"use client"

import { Button } from "@/components/ui/button"

interface PostDiningProps {
  isVisible: boolean
  onClose: () => void
  onFeedback: (rating: "excellent" | "good" | "improvement") => void
}

export function PostDining({ isVisible, onClose, onFeedback }: PostDiningProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl p-12 max-w-sm w-full space-y-8 text-center">
        <h3 className="font-serif text-3xl text-foreground font-light">Thank You</h3>

        <p className="text-foreground/70 font-light leading-relaxed">
          We appreciate your visit. Your feedback helps us serve you better.
        </p>

        {/* Feedback Options */}
        <div className="flex gap-3 py-6">
          {[
            { value: "excellent" as const, label: "Excellent", icon: "😊" },
            { value: "good" as const, label: "Good", icon: "🙂" },
            { value: "improvement" as const, label: "Needs Improvement", icon: "👤" },
          ].map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => onFeedback(value)}
              className="flex-1 flex flex-col items-center gap-2 p-4 border border-border rounded-lg hover:border-accent hover:bg-secondary transition-all"
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-xs font-light">{label}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button onClick={onClose} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-light">
          Close
        </Button>
      </div>
    </div>
  )
}
