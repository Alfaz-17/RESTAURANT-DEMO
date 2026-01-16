"use client"

import { useOnboarding } from "@/lib/onboarding-context"
import { useTable } from "@/lib/table-context"
import { BannerSlider } from "./banner-slider"
import { useDashboard } from "@/lib/dashboard-context"
import { Sparkles, Utensils, Star, ChevronRight, QrCode } from "lucide-react"
import { MenuHeader } from "./menu-header"
import { useState } from "react"

interface WelcomeScreenProps {
  onStart: () => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { startGuide } = useOnboarding()
  const { tableNumber, setTableNumber } = useTable()
  const [isScanning, setIsScanning] = useState(false)

  const handleScanQR = () => {
    setIsScanning(true)
    
    // Simulate QR code scanning delay
    setTimeout(() => {
      // Generate random table number (1-20)
      const randomTable = Math.floor(Math.random() * 20) + 1
      setTableNumber(`Table ${randomTable}`)
      setIsScanning(false)
      
      // Auto-proceed to menu after scanning
      setTimeout(() => {
        onStart()
      }, 800)
    }, 1200)
  }

  return (
    <div className="relative min-h-screen-dynamic bg-black overflow-hidden flex flex-col items-center justify-center p-6 text-center pt-safe pb-safe">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Dining"
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-sm w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Branding */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-[0.3em] text-white/80">
            <Sparkles className="w-3 h-3 text-accent" /> Digital Concierge
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-extralight tracking-tight leading-none">
            Saffron <span className="block text-accent italic font-light">& Gold</span>
          </h1>
          <p className="text-white/60 font-light tracking-widest text-xs uppercase pt-2">
            A Culinary Journey Awaits
          </p>
        </div>

        {/* Table Number Display */}
        {tableNumber && (
          <div className="bg-accent/20 border-2 border-accent rounded-2xl p-4 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-500">
            <p className="text-xs text-accent uppercase tracking-widest font-semibold mb-1">You're seated at</p>
            <p className="text-2xl font-bold text-white">{tableNumber}</p>
          </div>
        )}

        {/* Primary Actions */}
        <div className="space-y-4">
          {!tableNumber ? (
            <button
              onClick={handleScanQR}
              disabled={isScanning}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-5 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-2xl transition-all uppercase tracking-[0.2em] text-sm h-16 group disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                  Scanning QR Code...
                </>
              ) : (
                <>
                  <QrCode className="w-5 h-5" />
                  Scan QR Code
                </>
              )}
            </button>
          ) : (
            <button
              onClick={onStart}
              className="w-full bg-white text-black py-5 rounded-2xl flex items-center justify-center gap-2 font-medium shadow-2xl hover:bg-white/90 transition-all uppercase tracking-[0.2em] text-sm h-16 group"
            >
              Explore Our Menu <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
          
          <button
            onClick={() => {
              startGuide()
              onStart()
            }}
            className="text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-medium"
          >
            Take a Guided Tour
          </button>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute left-0 right-0 z-10 opacity-30 text-[10px] uppercase tracking-[0.5em] text-white pointer-events-none" style={{ bottom: 'calc(env(safe-area-inset-bottom) + 24px)' }}>
        Media Masala Originals
      </div>
    </div>
  )
}
