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
    <div className="space-y-8 py-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentIndex
        const isCurrent = index === currentIndex
        const isLast = index === steps.length - 1
        const Icon = step.icon

        return (
          <div key={step.id} className="relative flex gap-6">
            {/* Connector Line */}
            {!isLast && (
              <div
                className={`absolute left-[19px] top-10 w-0.5 h-12 transition-colors duration-1000 ${
                  isCompleted ? "bg-accent" : "bg-border"
                }`}
              />
            )}

            {/* Icon Circle */}
            <div
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                isCompleted
                  ? "bg-accent border-accent text-accent-foreground"
                  : isCurrent
                  ? "bg-background border-accent text-accent animate-pulse"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
            </div>

            {/* Content */}
            <div className={`flex flex-col text-left transition-all duration-500 ${isCurrent ? "translate-x-1" : ""}`}>
              <h4
                className={`text-sm font-medium uppercase tracking-widest ${
                  isCurrent ? "text-foreground" : isCompleted ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </h4>
              <p className={`text-xs mt-1 font-light ${isCurrent ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
                {step.description}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
