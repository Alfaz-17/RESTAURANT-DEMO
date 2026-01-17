"use client"

import type { ReactNode } from "react"

interface AdminPageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export function AdminPageHeader({ title, subtitle, action }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-foreground">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
