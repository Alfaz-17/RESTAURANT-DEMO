"use client"

import { useState } from "react"
import { Bell, Waves, Receipt, HelpCircle, MessageSquare, X, Play } from "lucide-react"
import { useDashboard } from "@/lib/dashboard-context"
import { useTable } from "@/lib/table-context"

export function ServiceActionFAB() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeRequest, setActiveRequest] = useState<string | null>(null)
  const { addServiceRequest } = useDashboard()
  const { tableNumber } = useTable()

  const actions = [
    { id: "waiter", label: "Call Waiter", icon: Bell, color: "bg-amber-500", type: "assistance" as const },
    { id: "water", label: "Request Water", icon: Waves, color: "bg-blue-500", type: "water" as const },
    { id: "bill", label: "Request Bill", icon: Receipt, color: "bg-emerald-500", type: "bill" as const },
    { id: "help", label: "Need Help", icon: HelpCircle, color: "bg-purple-500", type: "assistance" as const },
  ]

  const handleAction = (id: string, label: string, type: "water" | "clean" | "assistance" | "cutlery" | "bill") => {
    // Add service request to dashboard
    addServiceRequest(type, tableNumber || undefined)
    
    setActiveRequest(label)
    setIsOpen(false)
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setActiveRequest(null)
    }, 5000)
  }

  return (
    <div className="fixed right-6 z-50" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 100px)' }}>
      {/* Toast Notification */}
      {activeRequest && (
        <div className="absolute bottom-20 right-0 w-64 bg-accent text-accent-foreground p-4 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest">Request Sent</p>
            <p className="text-sm font-light">"{activeRequest}" received.</p>
          </div>
        </div>
      )}

      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3 mb-2">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center gap-3 group animate-in fade-in slide-in-from-right-4 duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-border text-xs font-medium shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {action.label}
              </span>
              <button
                onClick={() => handleAction(action.id, action.label, action.type)}
                className={`w-12 h-12 rounded-full ${action.color} text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all`}
              >
                <action.icon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isOpen ? "bg-foreground text-background rotate-90" : "bg-accent text-accent-foreground hover:scale-105"
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-bounce" />
        )}
      </button>
    </div>
  )
}
