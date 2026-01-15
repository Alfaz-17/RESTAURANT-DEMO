"use client"

import { useState, useEffect } from "react"
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    title: "Saffron & Gold Specials",
    subtitle: "A limited-time culinary journey through Persia",
    color: "from-amber-600/20 to-orange-900/40",
    tag: "Trending",
  },
  {
    title: "Signature Tasting Menu",
    subtitle: "5 courses of our chef's finest creations",
    color: "from-blue-900/40 to-indigo-900/40",
    tag: "Exclusive",
  },
  {
    title: "The Weekend Brunch",
    subtitle: "Champagne, oysters, and jazz by the pool",
    color: "from-emerald-900/40 to-teal-800/40",
    tag: "Upcoming",
  },
]

export function BannerSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden group border border-border/50">
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out bg-gradient-to-br ${
            banner.color
          } ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative h-full flex flex-col justify-center px-8 sm:px-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-accent/20 text-accent text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-accent/30 font-medium">
                {banner.tag}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-light text-foreground mb-2">
              {banner.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground font-light max-w-xs">
              {banner.subtitle}
            </p>
            <button className="mt-6 flex items-center gap-2 text-accent text-xs uppercase tracking-[0.2em] font-medium hover:gap-3 transition-all">
              Discover Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Particles/Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === current ? "bg-accent w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
