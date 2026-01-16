"use client"

import { useState } from "react"
import { DashboardProvider } from "@/lib/dashboard-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardTodayGlance } from "@/components/dashboard-today-glance"
import { DashboardOrdersFlow } from "@/components/dashboard-orders-flow"
import { DashboardMenuPerformance } from "@/components/dashboard-menu-performance"
import { DashboardServiceRequests } from "@/components/dashboard-service-requests"
import { DashboardCustomerInsights } from "@/components/dashboard-customer-insights"
import { DashboardEfficiency } from "@/components/dashboard-efficiency"
import { DashboardRevenue } from "@/components/dashboard-revenue"
import { DashboardSettings } from "@/components/dashboard-settings"

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  )
}

function DashboardContent() {
  const [isDashboard, setIsDashboard] = useState(true)

  const handleToggle = () => {
    if (isDashboard) {
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen-dynamic bg-background">
      <DashboardHeader onToggle={handleToggle} isDashboard={isDashboard} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Today at a Glance */}
        <section className="mb-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Today at a Glance</h2>
          <DashboardTodayGlance />
        </section>

        {/* Orders & Flow */}
        <section className="mb-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Orders & Flow</h2>
          <DashboardOrdersFlow />
        </section>

        {/* Menu Performance */}
        <section className="mb-8">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Menu Performance</h2>
          <DashboardMenuPerformance />
        </section>

        {/* Service & Customer */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Service Requests
              </h2>
              <DashboardServiceRequests />
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Customer Insights
              </h2>
              <DashboardCustomerInsights />
            </div>
          </div>
        </section>

        {/* Efficiency & Revenue */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Time & Efficiency
              </h2>
              <DashboardEfficiency />
            </div>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Revenue & Savings
              </h2>
              <DashboardRevenue />
            </div>
          </div>
        </section>

        {/* Settings */}
        <section className="mb-12">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Settings</h2>
          <div className="max-w-2xl">
            <DashboardSettings />
          </div>
        </section>
      </main>
    </div>
  )
}
