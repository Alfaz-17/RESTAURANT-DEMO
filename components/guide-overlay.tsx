"use client"

import { useOnboarding } from "@/lib/onboarding-context"
import { X, ChevronRight, ChevronLeft } from "lucide-react"

export function GuideOverlay() {
  const { showGuide, currentStep, guideSteps, nextStep, previousStep, skipGuide } = useOnboarding()

  if (!showGuide || currentStep >= guideSteps.length) {
    return null
  }

  const step = guideSteps[currentStep]

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40 pointer-events-none" />

      {/* Spotlight/Highlight - Optional for targeting specific elements */}
      {step.targetElement && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Guide Tooltip */}
      <div
        className={`fixed z-50 bg-white rounded-lg shadow-2xl p-6 max-w-sm animate-slide-up ${
          step.position === "bottom" ? "bottom-20 left-1/2 transform -translate-x-1/2" : "top-32 right-6"
        }`}
      >
        {/* Step Counter */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs text-muted-foreground font-medium">
            STEP {currentStep + 1} OF {guideSteps.length}
          </span>
          <button
            onClick={skipGuide}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close guide"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="font-serif text-xl text-foreground mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{step.description}</p>

        {/* Action */}
        {step.action && <p className="text-xs text-accent mb-4 font-medium">{step.action}</p>}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-end">
          {currentStep > 0 && (
            <button
              onClick={previousStep}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-muted rounded hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
          >
            {currentStep === guideSteps.length - 1 ? "Done" : "Next"}
            {currentStep < guideSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </>
  )
}
