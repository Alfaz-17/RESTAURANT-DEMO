"use client"

export default function AIToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-light">AI Tools</h1>
        <p className="text-muted-foreground mt-1">Get intelligent suggestions and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-medium mb-2">Cost Optimization</h3>
          <p className="text-muted-foreground text-sm">Identify cost-saving opportunities</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-medium mb-2">Menu Suggestions</h3>
          <p className="text-muted-foreground text-sm">Get recommendations for new items</p>
        </div>
      </div>
    </div>
  )
}
