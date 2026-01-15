"use client"

interface DashboardHeaderProps {
  onToggle: () => void
  isDashboard: boolean
}

export function DashboardHeader({ onToggle, isDashboard }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-background">
      <div>
        <h1 className="font-serif text-2xl text-foreground font-light">AI Menu System</h1>
        <p className="text-sm text-muted-foreground mt-1">{isDashboard ? "Owner Dashboard" : "Guest Menu"}</p>
      </div>
      <button
        onClick={onToggle}
        className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors font-light"
      >
        {isDashboard ? "← Welcome" : "Dashboard →"}
      </button>
    </div>
  )
}
