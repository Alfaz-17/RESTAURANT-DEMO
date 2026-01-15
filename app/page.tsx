"use client"

import { useState, useEffect } from "react"
import { DashboardProvider, useDashboard } from "@/lib/dashboard-context"
import { WelcomeScreen } from "@/components/welcome-screen"
import { MenuHeader } from "@/components/menu-header"
import { MenuNavigator } from "@/components/menu-navigator"
import { MenuItemCard } from "@/components/menu-item-card"
import { EnhancedCartPanel, FloatingCartButton } from "@/components/enhanced-cart"
import { OrderConfirmation } from "@/components/order-confirmation"
import { OrderStatus } from "@/components/order-status"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardTodayGlance } from "@/components/dashboard-today-glance"
import { DashboardOrdersFlow } from "@/components/dashboard-orders-flow"
import { DashboardMenuPerformance } from "@/components/dashboard-menu-performance"
import { DashboardServiceRequests } from "@/components/dashboard-service-requests"
import { DashboardCustomerInsights } from "@/components/dashboard-customer-insights"
import { DashboardEfficiency } from "@/components/dashboard-efficiency"
import { DashboardRevenue } from "@/components/dashboard-revenue"
import { DashboardSettings } from "@/components/dashboard-settings"
import { OwnerDashboard } from "@/components/owner-dashboard"
import { Sparkles } from "lucide-react"
import { menuItems as defaultMenuItems } from "@/components/menu-data"
import type { MenuItem } from "@/components/menu-data"
import { OrderReceivedScreen } from "@/components/order-received-screen"
import { getMenuItems, seedMenuItems } from "@/app/actions/menu-actions"
import { MenuSearchBar } from "@/components/menu-search-bar"
import { ItemCustomizationModal, type ItemCustomization } from "@/components/item-customization-modal"
import { MenuSkeletonLoader } from "@/components/menu-skeleton-loader"
import { OnboardingProvider } from "@/lib/onboarding-context"
import { GuideOverlay } from "@/components/guide-overlay"
import { AIFoodyModal } from "@/components/ai-foody-modal"
import { BottomNav } from "@/components/bottom-nav"
import { ProfileScreen } from "@/components/profile-screen"
import { MealDetailsDrawer } from "@/components/meal-details-drawer"


interface CartItem extends MenuItem {
  quantity: number
  specialRequests?: string
  customization?: {
    allergens: string[]
    extras: string[]
    specialRequests: string
  }
}

type PageState = "welcome" | "menu" | "order-received" | "order-status" | "feedback" | "dashboard" | "new-dashboard" | "profile"

interface ConfirmedOrder {
  items: CartItem[]
  total: number
  timestamp: Date
}

function PageContent() {
  const { addOrder, addServiceRequest, categories, menuItems, isLoadingMenu } = useDashboard()
  const [pageState, setPageState] = useState<PageState>("welcome")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null)
  const [currentOrderId, setCurrentOrderId] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")
  const [dietaryFilter, setDietaryFilter] = useState<string | null>(null)
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null)
  const [mealDetailsItem, setMealDetailsItem] = useState<MenuItem | null>(null)
  const [tableNumber, setTableNumber] = useState("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showAIFoody, setShowAIFoody] = useState(false)
  const [popularOnly, setPopularOnly] = useState(false)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)

  // Ensure selectedCategory is valid when categories change
  useEffect(() => {
    if (categories.length > 0) {
      const exists = categories.find(c => c.id === selectedCategory)
      if (!exists && selectedCategory !== "all") {
        setSelectedCategory(categories[0].id)
      }
    }
  }, [categories, selectedCategory])



  // Save states to localStorage
  useEffect(() => {
    if (!isHydrated) return
    
    if (typeof window !== "undefined") {
      localStorage.setItem("v0_page_state", pageState)
      localStorage.setItem("v0_cart_items", JSON.stringify(cartItems))
      localStorage.setItem("v0_current_order_id", currentOrderId)
      if (confirmedOrder) {
        localStorage.setItem("v0_confirmed_order", JSON.stringify(confirmedOrder))
      } else {
        localStorage.removeItem("v0_confirmed_order")
      }
    }
  }, [pageState, cartItems, confirmedOrder, currentOrderId, isHydrated])

  // Load states from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem("v0_page_state") as PageState
        if (savedState) setPageState(savedState)

        const savedCart = localStorage.getItem("v0_cart_items")
        if (savedCart) setCartItems(JSON.parse(savedCart))

        const savedOrderId = localStorage.getItem("v0_current_order_id")
        if (savedOrderId) setCurrentOrderId(savedOrderId)

        const savedConfirmed = localStorage.getItem("v0_confirmed_order")
        if (savedConfirmed) setConfirmedOrder(JSON.parse(savedConfirmed))
      } catch (e) {
        console.error("[v0] Error hydrating state:", e)
      } finally {
        setIsHydrated(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    if (pageState !== "menu" && pageState !== "order-received" && pageState !== "order-status") {
      setCartItems([])
      setIsCartOpen(false)
    }
  }, [pageState, isHydrated])

  const handleAddToCart = (item: MenuItem, customization?: any) => {
    setCartItems((prev) => {
      // Find if an identical item (same ID and same customization) already exists
      const existingItemIndex = prev.findIndex(
        (ci) => ci.id === item.id && JSON.stringify(ci.customization) === JSON.stringify(customization)
      )

      if (existingItemIndex !== -1) {
        const nextItems = [...prev]
        nextItems[existingItemIndex] = {
          ...nextItems[existingItemIndex],
          quantity: nextItems[existingItemIndex].quantity + 1
        }
        return nextItems
      }

      return [...prev, { ...item, quantity: 1, customization }]
    })
    
    // Show notification instead of opening cart
    setNotification(`Added ${item.name} to cart`)
    setTimeout(() => setNotification(null), 2000)
    // setIsCartOpen(true)
  }

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== itemId))
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(itemId)
    } else {
      setCartItems((prev) => prev.map((ci) => (ci.id === itemId ? { ...ci, quantity } : ci)))
    }
  }

  const handleToggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  const handleConfirmOrder = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const total = subtotal * 1.1
    const orderId = `order-${Date.now()}`

    addOrder({
      id: orderId,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      status: "pending",
      type: "dine-in",
      total: total,
      timestamp: new Date(),
      preparationTime: 5,
    })

    setConfirmedOrder({
      items: cartItems,
      total: total,
      timestamp: new Date(),
    })
    setCurrentOrderId(orderId)
    setIsCartOpen(false)
    setPageState("order-received")
  }

  // Filter menu items
  let filteredItems = selectedCategory === "all" 
    ? menuItems 
    : menuItems.filter((item) => item.category === selectedCategory)

  if (searchQuery) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  if (dietaryFilter) {
    filteredItems = filteredItems.filter((item) => item.dietary === dietaryFilter)
  }

  if (popularOnly) {
    filteredItems = filteredItems.filter((item) => item.isPopular)
  }

  if (availableOnly) {
    filteredItems = filteredItems.filter((item) => item.available !== false)
  }

  return (
    <>
      <GuideOverlay />

      {pageState === "menu" && (
        <AIFoodyModal
          isOpen={showAIFoody}
          onClose={() => setShowAIFoody(false)}
          menuItems={menuItems}
          onSelectItem={handleAddToCart}
        />
      )}

      {/* existing page state rendering */}
      {pageState === "welcome" && <WelcomeScreen onStart={() => setPageState("menu")} />}

      {pageState === "menu" && isLoadingMenu && <MenuSkeletonLoader />}

      {pageState === "menu" && (
        <div className="min-h-screen bg-background safe-area-inset flex flex-col">
          <MenuHeader
            cartCount={cartItems.length}
            onCartClick={() => setIsCartOpen(true)}
            onServiceRequest={(type) => addServiceRequest(type as any, tableNumber)}
            onAIFoodyClick={() => setShowAIFoody(true)}
          />

          <MenuSearchBar 
            onSearch={setSearchQuery} 
            onFilter={setDietaryFilter} 
            onPopularFilter={setPopularOnly}
            onAvailableFilter={setAvailableOnly}
          />

          <MenuNavigator activeCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={categories} />

          <main className="flex-1 overflow-y-auto w-full px-2 sm:px-4 md:px-6 pb-24 sm:pb-32 pt-4">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Popular Showcase Section - Mini Homepage */}
              {!searchQuery && !dietaryFilter && (
                <section className="bg-gradient-to-br from-amber-50 to-orange-50 -mx-4 sm:-mx-6 lg:-mx-8 py-6">
                  <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Most Loved</h2>
                          <p className="text-xs text-gray-600">Customer favorites</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Horizontal Scroll Container */}
                  <div className="flex gap-4 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide snap-x snap-mandatory">
                    {menuItems
                      .filter(item => {
                        // Filter by category if not "all"
                        const categoryMatch = selectedCategory === "all" || item.category === selectedCategory
                        return item.isPopular && item.available !== false && categoryMatch
                      })
                      .slice(0, 6)
                      .map((item) => (
                        <div key={`popular-${item.id}`} className="flex-shrink-0 w-64 sm:w-72 snap-start">
                          <MenuItemCard
                            item={item}
                            variant="featured"
                            onAddToCart={() => handleAddToCart(item)}
                            onItemClick={() => setMealDetailsItem(item)}
                            isFavorite={favorites.has(item.id)}
                            onToggleFavorite={() => handleToggleFavorite(item.id)}
                          />
                        </div>
                      ))}
                  </div>
                </section>
              )}

              {/* Main Category Selection - 2 Column Grid */}
              <section className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground capitalize">{selectedCategory}</h2>
                  <button className="text-sm font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                    See All
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                {filteredItems.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {filteredItems.map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={() => handleAddToCart(item)}
                        onItemClick={() => setMealDetailsItem(item)}
                        isFavorite={favorites.has(item.id)}
                        onToggleFavorite={() => handleToggleFavorite(item.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No items found matching your search</p>
                  </div>
                )}
              </section>
            </div>
          </main>

          <MealDetailsDrawer 
            item={mealDetailsItem}
            isOpen={!!mealDetailsItem}
            onClose={() => setMealDetailsItem(null)}
            onAddToCart={handleAddToCart}
          />

          <EnhancedCartPanel
            items={cartItems}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
            onConfirm={handleConfirmOrder}
          />

          {/* Floating Cart Button */}
          <FloatingCartButton
            itemCount={cartItems.length}
            total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18}
            onClick={() => setIsCartOpen(true)}
          />

          {/* Notification Toast */}
          {notification && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 z-50 shadow-lg">
              {notification}
            </div>
          )}

        </div>
      )}

      {pageState === "order-received" && (
        <OrderReceivedScreen
          orderTotal={confirmedOrder?.total || 0}
          itemsCount={confirmedOrder?.items.length || 0}
          onBackToMenu={() => {
            setPageState("menu")
            setConfirmedOrder(null)
            setCurrentOrderId("")
            setCartItems([])
            setIsCartOpen(false)
          }}
          onNavigateToDashboard={() => {
            setPageState("order-status")
          }}
        />
      )}

      {pageState === "order-status" && (
        <OrderStatus
          orderId={currentOrderId}
          orderConfirmed={!!confirmedOrder}
          itemsCount={confirmedOrder?.items.length || 0}
          total={confirmedOrder?.total || 0}
          onFeedback={() => setPageState("feedback")}
          onNewOrder={() => {
            setPageState("menu")
            setConfirmedOrder(null)
            setCurrentOrderId("")
            setCartItems([])
            setIsCartOpen(false)
          }}
        />
      )}

      {pageState === "feedback" && (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md text-center space-y-6">
            <h1 className="font-serif text-4xl text-foreground font-light">Thank You</h1>
            <p className="text-muted-foreground">Your feedback helps us improve your dining experience.</p>
            <button
              onClick={() => {
                setPageState("welcome")
                setConfirmedOrder(null)
                setCurrentOrderId("")
                setCartItems([])
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded transition-colors font-light"
            >
              Return to Welcome
            </button>
          </div>
        </div>
      )}

      {pageState === "dashboard" && (
        <div className="min-h-screen bg-background">
          <DashboardHeader onToggle={() => setPageState("menu")} isDashboard={true} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Today at a Glance
              </h2>
              <DashboardTodayGlance />
            </section>

            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Orders & Flow</h2>
              <DashboardOrdersFlow />
            </section>

            <section className="mb-8">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                Menu Performance
              </h2>
              <DashboardMenuPerformance />
            </section>

            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    Service Requests
                  </h2>
                  <DashboardServiceRequests />
                </div>
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    Customer Insights
                  </h2>
                  <DashboardCustomerInsights />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    Time & Efficiency
                  </h2>
                  <DashboardEfficiency />
                </div>
                <div>
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">
                    Revenue & Savings
                  </h2>
                  <DashboardRevenue />
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground mb-4">Settings</h2>
              <div className="max-w-2xl">
                <DashboardSettings onNavigateToDashboard={() => setPageState("dashboard")} />
              </div>
            </section>
          </main>
        </div>
      )}

      {pageState === "new-dashboard" && (
        <OwnerDashboard 
          onBackToMenu={() => setPageState("menu")} 
        />
      )}

      {/* Profile Section */}
      {pageState === "profile" && (
        <div className="flex flex-col min-h-screen pb-24 sm:pb-32">
          <MenuHeader
            cartCount={cartItems.length}
            onCartClick={() => setIsCartOpen(true)}
            onDashboardClick={() => setPageState("new-dashboard")}
            onAIFoodyClick={() => setShowAIFoody(true)}
          />
          <ProfileScreen />
        </div>
      )}

      {/* Modern Bottom Navigation (Mobile-first) */}
      {["welcome", "menu", "order-status", "new-dashboard"].includes(pageState) && (
        <BottomNav 
          activeTab={pageState} 
          onTabChange={(tab) => setPageState(tab as PageState)} 
        />
      )}

      {/* Service Quick Actions (Mobile-first) */}

    </>
  )
}

export default function Page() {
  return (
    <OnboardingProvider>
      <DashboardProvider>
        <PageContent />
      </DashboardProvider>
    </OnboardingProvider>
  )
}
