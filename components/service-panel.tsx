"use client"

import { useState } from "react"
import { X, Check, Bell, Droplet, Trash2, Utensils, FileText } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"

export function ServicePanel({
  onRequestSubmit,
}: {
  onRequestSubmit?: (request: { type: string; timestamp: Date; resolved: boolean }) => void
}) {
  const { addServiceRequest } = useDashboard()
  const [isOpen, setIsOpen] = useState(false)
  const [confirmedRequests, setConfirmedRequests] = useState<Set<string>>(new Set())

  const serviceRequests = [
    { id: "assistance", label: "Request Assistance", icon: Bell },
    { id: "water", label: "Water Refill", icon: Droplet },
    { id: "clean", label: "Clean Table", icon: Trash2 },
    { id: "cutlery", label: "Cutlery / Napkins", icon: Utensils },
    { id: "bill", label: "Prepare Bill", icon: FileText },
  ]

  const handleRequest = (requestId: string) => {
    addServiceRequest({
      id: `req-${Date.now()}`,
      type: requestId as "water" | "clean" | "assistance" | "cutlery" | "bill",
      timestamp: new Date(),
      resolved: false,
    })

    setConfirmedRequests(new Set([...confirmedRequests, requestId]))
    setTimeout(() => {
      setConfirmedRequests((prev) => {
        const next = new Set(prev)
        next.delete(requestId)
        return next
      })
    }, 3000)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 min-h-14"
        aria-label="Service panel"
      >
        <Bell size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 safe-area-inset">
          <div className="bg-card border border-border rounded-2xl p-4 sm:p-8 max-w-sm w-full space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-2xl text-foreground font-light">Service</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {serviceRequests.map((request) => {
                const IconComponent = request.icon
                return (
                  <button
                    key={request.id}
                    onClick={() => handleRequest(request.id)}
                    disabled={confirmedRequests.has(request.id)}
                    className={`w-full flex items-center gap-4 p-3 sm:p-4 rounded-lg transition-all min-h-12 ${
                      confirmedRequests.has(request.id)
                        ? "bg-green-50 border border-green-300"
                        : "border border-border hover:border-accent hover:bg-secondary"
                    }`}
                  >
                    {confirmedRequests.has(request.id) ? (
                      <Check size={20} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <IconComponent size={20} className="text-accent flex-shrink-0" />
                    )}
                    <span className="font-light text-foreground text-sm sm:text-base">
                      {confirmedRequests.has(request.id) ? "Confirmed" : request.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground text-center italic">
              Our team has been notified and will assist shortly.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
