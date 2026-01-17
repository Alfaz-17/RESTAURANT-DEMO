"use client"

export function DeliveryTab() {
  return (
    <div>
      <div className="luxury-card text-center py-10 sm:py-16 p-4 sm:p-6">
        <h2 className="font-serif text-xl sm:text-2xl font-light mb-3 sm:mb-4">Delivery Apps Integration</h2>
        <p className="text-muted-foreground text-sm mb-4 sm:mb-6">Connect Swiggy and Zomato to see orders here</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="px-5 sm:px-6 py-2.5 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors text-sm font-medium active:scale-[0.98]">
            Connect Swiggy
          </button>
          <button className="px-5 sm:px-6 py-2.5 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors text-sm font-medium active:scale-[0.98]">
            Connect Zomato
          </button>
        </div>
      </div>
    </div>
  )
}
