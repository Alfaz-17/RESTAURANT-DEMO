import { Sparkles, ChevronLeft } from "lucide-react"

interface MenuHeaderProps {
  cartCount: number
  onCartClick: () => void
  onDashboardClick?: () => void
  onAIFoodyClick?: () => void
  onBack?: () => void
}

export function MenuHeader({ cartCount, onCartClick, onDashboardClick, onAIFoodyClick, onBack }: MenuHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2 sm:py-3">
        <div className="flex items-center gap-4 min-w-0">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-6 h-6 text-foreground/70" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="font-serif text-2xl sm:text-3xl text-foreground font-light tracking-wider">AI Menu</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Curated for your dining</p>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 items-center ml-4">
          {onAIFoodyClick && (
            <button
              onClick={onAIFoodyClick}
              className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-border rounded-lg hover:bg-secondary transition-colors font-light text-muted-foreground hover:text-foreground min-h-12 flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Foody</span>
              <span className="sm:hidden">AI</span>
            </button>
          )}

          {onDashboardClick && (
            <button
              onClick={onDashboardClick}
              className="px-2 sm:px-4 py-2 text-xs sm:text-sm border border-border rounded-lg hover:bg-secondary transition-colors font-light text-muted-foreground hover:text-foreground min-h-12 flex items-center whitespace-nowrap"
            >
              <span className="hidden sm:inline">Dashboard →</span>
              <span className="sm:hidden">Dash</span>
            </button>
          )}
          <button
            onClick={onCartClick}
            className="relative px-2 sm:px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors font-light text-xs sm:text-sm min-h-12 flex items-center whitespace-nowrap"
          >
            <span className="hidden sm:inline">Your Selection</span>
            <span className="sm:hidden">Menu</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
