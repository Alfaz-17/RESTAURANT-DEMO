"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface GuideStep {
  id: string
  title: string
  description: string
  targetElement?: string
  action?: string
  position?: "top" | "bottom" | "left" | "right"
}

interface OnboardingContextType {
  isFirstTime: boolean
  showGuide: boolean
  currentStep: number
  completedSteps: Set<string>
  guideSteps: GuideStep[]
  startGuide: () => void
  skipGuide: () => void
  nextStep: () => void
  previousStep: () => void
  completeStep: (stepId: string) => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const GUIDE_STEPS: GuideStep[] = [
  {
    id: "welcome",
    title: "Welcome to AI Menu",
    description: "This guided tour will show you how to use our system. You can skip at any time.",
    position: "bottom",
  },
  {
    id: "menu-browse",
    title: "Browse Our Menu",
    description: "Explore our 50 delicious items across 8 categories. Use the search bar to find what you want.",
    targetElement: "menu-navigator",
    position: "bottom",
  },
  {
    id: "add-to-cart",
    title: "Add Items to Cart",
    description: "Click on any item to view details, customize it, and add it to your cart.",
    targetElement: "menu-item-card",
    position: "left",
  },
  {
    id: "checkout",
    title: "Review & Checkout",
    description: "Review your order in the cart panel and confirm your order.",
    targetElement: "cart-panel",
    position: "left",
  },
  {
    id: "order-status",
    title: "Track Your Order",
    description: "See real-time updates as your order is prepared. You can also request assistance anytime.",
    targetElement: "order-status",
    position: "bottom",
  },
  {
    id: "dashboard-intro",
    title: "Switch to Dashboard",
    description: "As a restaurant owner, you can view the kitchen dashboard. Click the button to explore.",
    position: "bottom",
  },
  {
    id: "dashboard-metrics",
    title: "View Key Metrics",
    description: "See real-time metrics including live orders, revenue, and preparation times.",
    targetElement: "dashboard-home",
    position: "bottom",
  },
  {
    id: "complete",
    title: "Tour Complete!",
    description: "You now know how to use the system. Start exploring!",
    position: "bottom",
  },
]

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [isFirstTime, setIsFirstTime] = useState(true)
  const [showGuide, setShowGuide] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore")
    if (hasVisited) {
      setIsFirstTime(false)
    }
  }, [])

  const startGuide = () => {
    setShowGuide(true)
    setCurrentStep(0)
    localStorage.setItem("hasVisitedBefore", "true")
  }

  const skipGuide = () => {
    setShowGuide(false)
    setCurrentStep(0)
    localStorage.setItem("hasVisitedBefore", "true")
    setIsFirstTime(false)
  }

  const nextStep = () => {
    if (currentStep < GUIDE_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      skipGuide()
    }
  }

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeStep = (stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]))
  }

  return (
    <OnboardingContext.Provider
      value={{
        isFirstTime,
        showGuide,
        currentStep,
        completedSteps,
        guideSteps: GUIDE_STEPS,
        startGuide,
        skipGuide,
        nextStep,
        previousStep,
        completeStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider")
  }
  return context
}
