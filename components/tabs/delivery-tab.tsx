"use client"

export function DeliveryTab() {
  return (
    <div>
      <div className="luxury-card text-center py-16">
        <h2 className="font-serif text-2xl font-light mb-4">Delivery Apps Integration</h2>
        <p className="text-muted-foreground mb-6">Connect Swiggy and Zomato to see orders here</p>
        <div className="flex gap-4 justify-center">
          <button className="px-6 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm font-medium">
            Connect Swiggy
          </button>
          <button className="px-6 py-2 bg-secondary hover:bg-secondary/80 rounded transition-colors text-sm font-medium">
            Connect Zomato
          </button>
        </div>
      </div>
    </div>
  )
}
