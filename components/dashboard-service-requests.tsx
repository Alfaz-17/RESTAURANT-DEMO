"use client"

import { useDashboard } from "@/lib/dashboard-context"

export function DashboardServiceRequests() {
  const { serviceRequests } = useDashboard()

  const requestTypeCounts = {
    water: serviceRequests.filter((r) => r.type === "water").length,
    clean: serviceRequests.filter((r) => r.type === "clean").length,
    assistance: serviceRequests.filter((r) => r.type === "assistance").length,
    cutlery: serviceRequests.filter((r) => r.type === "cutlery").length,
    bill: serviceRequests.filter((r) => r.type === "bill").length,
  }

  const resolvedRequests = serviceRequests.filter((r) => r.resolved)
  const avgResponseTime =
    resolvedRequests.length > 0
      ? Math.round(resolvedRequests.reduce((sum, r) => sum + (r.responseTime || 0), 0) / resolvedRequests.length)
      : 0

  // Check for repeated requests
  const repeatedRequestTypes = Object.entries(requestTypeCounts).filter(([, count]) => count > 3)

  return (
    <div className="space-y-4">
      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Service Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Total Requests</span>
            <span className="text-lg font-light">{serviceRequests.length}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm">Avg Response Time</span>
            <span className="text-lg font-light">{avgResponseTime > 0 ? `${avgResponseTime}s` : "—"}</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Resolved: {resolvedRequests.length}</p>
          </div>
        </div>
      </div>

      <div className="luxury-card">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Request Breakdown</h3>
        <div className="space-y-2">
          {Object.entries(requestTypeCounts).map(([type, count]) => (
            <div key={type} className="flex justify-between items-center">
              <span className="text-sm capitalize">{type}</span>
              <span className="text-lg font-light">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {repeatedRequestTypes.length > 0 && (
        <div className="luxury-card border-orange-200 bg-orange-50">
          <h3 className="text-sm font-medium uppercase tracking-wide text-orange-700 mb-3">Alert</h3>
          <p className="text-sm text-orange-700">
            ⚠ High {repeatedRequestTypes.map(([type]) => type).join(", ")} requests - check service flow
          </p>
        </div>
      )}
    </div>
  )
}
