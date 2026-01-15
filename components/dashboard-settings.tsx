"use client"

import { useState } from "react"
import { useDashboard } from "@/lib/dashboard-context"

export function DashboardSettings({ onNavigateToDashboard }: { onNavigateToDashboard?: () => void }) {
  const {
    menuEnabled,
    serviceRequestsEnabled,
    operatingHours,
    language,
    notificationsEnabled,
    setMenuEnabled,
    setServiceRequestsEnabled,
    setOperatingHours,
    setLanguage,
    setNotificationsEnabled,
  } = useDashboard()

  const [editingHours, setEditingHours] = useState(false)

  return (
    <div className="luxury-card space-y-6">
      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Feature Controls</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-border rounded">
            <span className="text-sm">Menu System</span>
            <button
              onClick={() => setMenuEnabled(!menuEnabled)}
              className={`px-3 py-1 rounded text-xs font-medium ${
                menuEnabled
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {menuEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
          <div className="flex items-center justify-between p-3 border border-border rounded">
            <span className="text-sm">Service Requests</span>
            <button
              onClick={() => setServiceRequestsEnabled(!serviceRequestsEnabled)}
              className={`px-3 py-1 rounded text-xs font-medium ${
                serviceRequestsEnabled
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              }`}
            >
              {serviceRequestsEnabled ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Operating Hours</h3>
        {!editingHours ? (
          <div className="flex items-center justify-between p-3 border border-border rounded">
            <span className="text-sm">
              {operatingHours.open} - {operatingHours.close}
            </span>
            <button onClick={() => setEditingHours(true)} className="text-xs text-accent hover:underline">
              Edit
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="time"
              value={operatingHours.open}
              onChange={(e) => setOperatingHours({ ...operatingHours, open: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-sm"
            />
            <input
              type="time"
              value={operatingHours.close}
              onChange={(e) => setOperatingHours({ ...operatingHours, close: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded text-sm"
            />
            <button
              onClick={() => setEditingHours(false)}
              className="w-full px-3 py-2 bg-accent text-accent-foreground rounded text-sm font-medium hover:bg-accent/90"
            >
              Save Hours
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Language</h3>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded text-sm"
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <div>
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Notifications</h3>
        <button
          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          className={`w-full px-3 py-2 rounded text-sm font-medium ${
            notificationsEnabled
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {notificationsEnabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      {onNavigateToDashboard && (
        <button
          onClick={onNavigateToDashboard}
          className="w-full px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/5 transition-colors text-sm font-light"
        >
          ← Return to Dashboard
        </button>
      )}
    </div>
  )
}
