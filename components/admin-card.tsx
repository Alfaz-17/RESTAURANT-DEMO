"use client"

import type { ReactNode } from "react"

interface AdminCardProps {
  children: ReactNode
  title?: string
  action?: ReactNode
  className?: string
  noPadding?: boolean
}

export function AdminCard({ children, title, action, className = "", noPadding = false }: AdminCardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border/50">
          <h3 className="font-medium text-foreground">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? "" : "p-5 sm:p-6"}>{children}</div>
    </div>
  )
}

interface AdminStatCardProps {
  label: string
  value: string | number
  icon?: ReactNode
}

export function AdminStatCard({ label, value, icon }: AdminStatCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium">{label}</p>
          <p className="text-2xl sm:text-3xl font-light mt-2 text-foreground">{value}</p>
        </div>
        {icon && <div className="text-accent/40">{icon}</div>}
      </div>
    </div>
  )
}
