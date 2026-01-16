"use client"

import { useState } from "react"

export function KitchenHeader() {
  const [activeTab, setActiveTab] = useState("kitchen")

  const tabs = [
    { id: "kitchen", label: "Kitchen" },
    { id: "ai-tools", label: "AI Tools" },
    { id: "inventory", label: "Inventory" },
    { id: "orders", label: "Orders" },
    { id: "delivery", label: "Delivery Apps" },
    { id: "menu", label: "Menu Control" },
    { id: "reports", label: "Reports" },
  ]

  return (
    <header className="bg-background border-b border-border pt-safe">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="font-serif text-3xl text-foreground mb-6">Owner Dashboard</h1>

        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-light whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
