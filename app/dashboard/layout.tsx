"use client"

import type React from "react"
import { DashboardProvider } from "@/lib/dashboard-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const handleBackToMenu = () => {
    window.location.href = "/"
  }

  return (
    <DashboardProvider>
      <div className="flex min-h-screen-dynamic bg-background">
        <DashboardSidebar onBackToMenu={handleBackToMenu} />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full px-6 lg:px-8 py-8">{children}</div>
        </main>
      </div>
    </DashboardProvider>
  )
}
