"use client"

import { User, Settings, Package, Heart, LogOut, ChevronRight, UserCircle } from "lucide-react"

export function ProfileScreen() {
  const menuItems = [
    { icon: Package, label: "Order History", description: "View your past orders and receipts" },
    { icon: Heart, label: "Favorites", description: "Your most-loved dishes in one place" },
    { icon: Settings, label: "Settings", description: "Notifications, privacy, and account settings" },
    { icon: UserCircle, label: "Personal Info", description: "Update your name, email, and active address" },
  ]

  return (
    <div className="min-h-screen-dynamic bg-background safe-area-inset px-4 sm:px-6 lg:px-8 py-8 flex flex-col pt-safe">
      <div className="max-w-md mx-auto w-full">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4 border border-border overflow-hidden">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl font-light">Alex Thompson</h2>
          <p className="text-sm text-muted-foreground mt-1">alex.t@luxurycafe.com</p>
          <button className="mt-4 px-6 py-2 border border-border rounded-full text-xs uppercase tracking-widest hover:bg-secondary transition-colors font-medium">
            Edit Profile
          </button>
        </div>

        {/* Action List */}
        <div className="space-y-4 mb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                className="w-full luxury-card p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </button>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-auto space-y-3 pb-24">
          <button className="w-full p-4 flex items-center justify-center gap-2 text-destructive hover:bg-destructive/5 rounded-lg transition-colors border border-transparent">
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Log Out</span>
          </button>
          <div className="text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              Luxury Cafe App v2.4.0
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
