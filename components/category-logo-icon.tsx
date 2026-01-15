"use client"
import type React from "react" // Import React to declare JSX

interface CategoryLogoProps {
  categoryId: string
  isActive: boolean
}

export function CategoryLogoIcon({ categoryId, isActive }: CategoryLogoProps) {
  // SVG logos for each category
  const logos: Record<string, React.JSX.Element> = {
    pizzas: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <path d="M50 10 L90 85 L10 85 Z" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.6" />
        <circle cx="35" cy="65" r="6" fill="currentColor" opacity="0.6" />
        <circle cx="65" cy="70" r="6" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    burgers: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <rect x="15" y="15" width="70" height="12" rx="4" fill="currentColor" opacity="0.8" />
        <rect x="15" y="32" width="70" height="10" fill="currentColor" opacity="0.6" />
        <rect x="15" y="47" width="70" height="10" fill="currentColor" opacity="0.6" />
        <rect x="15" y="62" width="70" height="10" fill="currentColor" opacity="0.6" />
        <rect x="15" y="77" width="70" height="12" rx="4" fill="currentColor" opacity="0.8" />
      </svg>
    ),
    sandwiches: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <rect x="20" y="20" width="60" height="10" rx="3" fill="currentColor" opacity="0.8" />
        <rect x="18" y="32" width="64" height="8" fill="currentColor" opacity="0.5" />
        <rect x="18" y="42" width="64" height="8" fill="currentColor" opacity="0.5" />
        <rect x="18" y="52" width="64" height="8" fill="currentColor" opacity="0.5" />
        <rect x="20" y="62" width="60" height="10" rx="3" fill="currentColor" opacity="0.8" />
        <line x1="50" y1="20" x2="50" y2="72" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
    appetizers: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <circle cx="40" cy="40" r="15" fill="currentColor" opacity="0.7" />
        <circle cx="60" cy="35" r="12" fill="currentColor" opacity="0.8" />
        <circle cx="50" cy="60" r="14" fill="currentColor" opacity="0.6" />
        <rect x="25" y="75" width="50" height="12" rx="2" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    beverages: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <path
          d="M30 20 L35 75 Q35 85 45 85 L55 85 Q65 85 65 75 L70 20 Z"
          fill="currentColor"
          opacity="0.7"
          stroke="currentColor"
          strokeWidth="1"
        />
        <rect x="20" y="18" width="60" height="5" rx="2" fill="currentColor" opacity="0.5" />
        <line x1="40" y1="35" x2="60" y2="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <line x1="38" y1="50" x2="62" y2="50" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      </svg>
    ),
    desserts: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <path d="M35 45 L50 15 L65 45 Q65 65 50 75 Q35 65 35 45" fill="currentColor" opacity="0.8" />
        <circle cx="45" cy="50" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="55" cy="55" r="4" fill="currentColor" opacity="0.5" />
        <circle cx="50" cy="65" r="4" fill="currentColor" opacity="0.5" />
        <rect x="30" y="75" width="40" height="8" rx="2" fill="currentColor" opacity="0.6" />
      </svg>
    ),
    combos: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <rect
          x="25"
          y="30"
          width="50"
          height="50"
          rx="3"
          fill="currentColor"
          opacity="0.7"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M35 35 Q35 30 40 30 Q45 30 45 35"
          fill="currentColor"
          opacity="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M55 35 Q55 30 60 30 Q65 30 65 35"
          fill="currentColor"
          opacity="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line x1="35" y1="55" x2="65" y2="55" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
    specials: (
      <svg
        viewBox="0 0 100 100"
        className={`w-8 h-8 transition-transform ${isActive ? "scale-110" : "hover:scale-105"}`}
      >
        <path
          d="M50 15 L61 40 L88 40 L67 58 L78 83 L50 65 L22 83 L33 58 L12 40 L39 40 Z"
          fill="currentColor"
          opacity="0.8"
        />
        <path
          d="M50 20 L59 42 L82 42 L65 57 L75 79 L50 64 L25 79 L35 57 L18 42 L41 42 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    ),
  }

  return (
    <div
      className={`flex items-center justify-center w-10 h-10 transition-all duration-200 ${isActive ? "text-accent" : "text-foreground/60"}`}
    >
      {logos[categoryId] || logos.pizzas}
    </div>
  )
}
