"use client"

export function MenuSkeletonLoader() {
  return (
    <div className="min-h-screen bg-background safe-area-inset flex flex-col">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-40 bg-background border-b border-border safe-area-inset-top">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3 sm:py-4">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-secondary rounded-lg animate-pulse" />
            <div className="h-4 w-24 bg-secondary rounded-lg animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-24 bg-secondary rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-secondary rounded-lg animate-pulse" />
          </div>
        </div>
      </div>

      {/* Search Bar Skeleton */}
      <div className="sticky top-16 z-30 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          <div className="h-10 w-full bg-secondary rounded-lg animate-pulse" />
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-20 bg-secondary rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid Skeleton */}
      <main className="flex-1 overflow-y-auto w-full px-2 sm:px-4 md:px-6 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="luxury-card border-0 bg-white/80 flex flex-col space-y-4">
                {/* Image Skeleton */}
                <div className="h-48 sm:h-64 bg-secondary rounded-lg animate-pulse" />

                {/* Content Skeleton */}
                <div className="px-4 sm:px-6 space-y-3">
                  <div className="h-6 w-3/4 bg-secondary rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-secondary rounded-lg animate-pulse" />
                  <div className="h-4 w-5/6 bg-secondary rounded-lg animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-4 w-8 bg-secondary rounded-lg animate-pulse" />
                    <div className="h-4 w-8 bg-secondary rounded-lg animate-pulse" />
                  </div>
                  <div className="h-4 w-full bg-secondary rounded-lg animate-pulse" />
                  <div className="flex justify-between pt-4">
                    <div className="h-8 w-16 bg-secondary rounded-lg animate-pulse" />
                    <div className="h-10 w-20 bg-secondary rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
