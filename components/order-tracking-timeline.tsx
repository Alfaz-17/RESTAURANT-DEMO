"use client"

import { Check, Clock, Utensils, Zap, Star } from "lucide-react"

interface OrderTrackingTimelineProps {
  status: "pending" | "preparing" | "ready" | "served"
}

export function OrderTrackingTimeline({ status }: OrderTrackingTimelineProps) {
  const steps = [
    {
      id: "pending",
      label: "Order Placed",
      description: "Our kitchen has received your selection",
      icon: Clock,
      color: "bg-blue-500",
    },
    {
      id: "preparing",
      label: "Chef is Cooking",
      description: "Crafting your meal with care and precision",
      icon: Utensils,
      color: "bg-amber-500",
    },
    {
      id: "ready",
      label: "Ready to Serve",
      description: "Your meal is hot and waiting for service",
      icon: Zap,
      color: "bg-emerald-500",
    },
    {
      id: "served",
      label: "Bon Appétit",
      description: "Enjoy your culinary journey",
      icon: Star,
      color: "bg-accent",
    },
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex((s) => s.id === status)
  }

  const currentIndex = getCurrentStepIndex()

  return (
    <div className="space-y-10 py-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === steps.length - 1
        const Icon = step.icon

        return (
          <div key={step.id} className="relative flex items-start gap-4 sm:gap-6">
            {/* Connector Line */}
            {!isLast && (
              <div
                className={`absolute left-[17px] sm:left-[19px] top-10 w-px h-14 transition-colors duration-1000 ${
                  isCompleted ? "bg-accent/40" : "bg-border/40"
                }`}
              />
            )}

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-700 ${
                isCompleted
                  ? "bg-accent border-accent text-accent-foreground shadow-md shadow-accent/20"
                  : isCurrent
                  ? "bg-background border-accent text-accent shadow-lg shadow-accent/10 animate-pulse scale-110"
                  : "bg-background border-border text-muted-foreground/40"
              }`}
            >
              {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </div>

            {/* Content */}
            <div className={`flex flex-col text-left transition-all duration-500 pt-1 ${isCurrent ? "translate-x-1" : ""}`}>
              <h4
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] ${
                  isCurrent ? "text-foreground" : isCompleted ? "text-accent" : "text-muted-foreground/40"
                }`}
              >
                {step.label}
              </h4>
              <p className={`text-[11px] sm:text-xs mt-1.5 font-light leading-relaxed max-w-[200px] sm:max-w-none ${
                isCurrent ? "text-muted-foreground" : "text-muted-foreground/40"
              }`}>
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
