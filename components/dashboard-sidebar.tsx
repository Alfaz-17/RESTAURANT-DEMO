"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, Home, Flame, ShoppingCart, UtensilsCrossed, BarChart3, Zap, Settings } from "lucide-react"

export function DashboardSidebar({ onBackToMenu }: { onBackToMenu: () => void }) {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard/home", icon: Home, label: "Dashboard" },
    { href: "/dashboard/kitchen", icon: Flame, label: "Kitchen" },
    { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/dashboard/menu", icon: UtensilsCrossed, label: "Menu" },
    { href: "/dashboard/reports", icon: BarChart3, label: "Reports" },
    { href: "/dashboard/ai-tools", icon: Zap, label: "AI Tools" },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Menu
        </button>
        <h1 className="font-serif text-2xl font-light">Restaurant</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
