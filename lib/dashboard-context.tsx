"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  serverAddOrder,
  serverUpdateOrderStatus,
  serverGetTodayOrders,
  serverAddServiceRequest,
  serverSeedDemoData,
} from "@/app/actions/db-actions"
import {
  getCategories,
  addCategory as addCategoryAction,
  updateCategory as updateCategoryAction,
  deleteCategory as deleteCategoryAction,
  updateMenuItem as updateMenuItemAction,
  deleteMenuItem as deleteMenuItemAction,
  getMenuItems,
  addMenuItem as addMenuItemAction,
  seedCategories,
  seedInitialData,
} from "@/app/actions/menu-actions"
import { menuItems as defaultMenuItems, menuCategories as defaultCategories, type MenuItem } from "@/components/menu-data"

export interface Order {
  id: string
  items: Array<{ id: string; name: string; quantity: number; price: number }>
  status: "pending" | "preparing" | "ready" | "served"
  type: "dine-in" | "takeaway" | "delivery"
  total: number
  timestamp: Date
  preparationTime?: number
  category?: string
  estimatedReadyTime?: Date
}

export interface ServiceRequest {
  id: string
  type: "water" | "clean" | "assistance" | "cutlery" | "bill"
  timestamp: Date
  resolved: boolean
  responseTime?: number
  tableNumber?: string
}

export interface MenuItemPerformance {
  id: string
  name: string
  sales: number
  revenue: number
  category: string
  available: boolean
  trending: "up" | "down" | "stable"
  pairingSuccessRate: number
}

export interface CustomerMetrics {
  totalCustomers: number
  newCustomers: number
  repeatCustomers: number
  repeatRate: number
  feedbackScores: { excellent: number; good: number; improvement: number }
  dietaryPreferences: { veg: number; nonVeg: number; vegan: number }
  complaints: number
}

export interface TimeMetrics {
  avgPrepTime: number
  avgDiningTime: number
  rushHours: string[]
  bottleneck: "kitchen" | "service" | "none"
  currentLoad: "light" | "normal" | "busy"
}

export interface RevenueMetrics {
  dailyRevenue: number
  monthlyRevenue: number
  estimatedSavings: number
  missedOrdersPreventionScore: number
  staffEfficiencyScore: number
}

export interface StaffMetrics {
  activeStaff: number
  shiftInfo: { shift: string; count: number }[]
  serviceLoad: number
  kitchenLoad: number
}

interface DashboardContextType {
  orders: Order[]
  serviceRequests: ServiceRequest[]
  addOrder: (order: Order) => Promise<void>
  addServiceRequest: (type: "water" | "clean" | "assistance" | "cutlery" | "bill", tableNumber?: string) => Promise<void>
  resolveServiceRequest: (id: string) => void
  updateOrderStatus: (orderId: string, status: "pending" | "preparing" | "ready" | "served") => Promise<void>

  itemAvailability: Record<string, boolean>
  toggleItemAvailability: (itemId: string) => void

  todayRevenue: number
  totalOrders: number
  averageOrderValue: number
  liveOrdersCount: number
  getTodayOrders: () => Order[]
  getMenuItemPerformance: () => MenuItemPerformance[]
  getCustomerMetrics: () => CustomerMetrics
  getTimeMetrics: () => TimeMetrics
  getRevenueMetrics: () => RevenueMetrics
  getStaffMetrics: () => StaffMetrics

  menuEnabled: boolean
  serviceRequestsEnabled: boolean
  operatingHours: { open: string; close: string }
  language: string
  notificationsEnabled: boolean
  setMenuEnabled: (enabled: boolean) => void
  setServiceRequestsEnabled: (enabled: boolean) => void
  setOperatingHours: (hours: { open: string; close: string }) => void
  setLanguage: (lang: string) => void
  setNotificationsEnabled: (enabled: boolean) => void
  isLoadingOrders: boolean
  
  // Categoried/Menu CRUD
  categories: Array<{ id: string; name: string; description: string }>
  addCategory: (category: { id: string; name: string; description: string }) => Promise<void>
  updateCategory: (category: { id: string; name: string; description: string }) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  updateMenuItem: (item: any) => Promise<void>
  deleteMenuItem: (id: string) => Promise<void>
  togglePopularity: (itemId: string) => Promise<void>
  menuItems: MenuItem[]
  refreshMenuItems: () => Promise<void>
  addMenuItem: (item: MenuItem) => Promise<void>
  isLoadingMenu: boolean
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [categories, setCategories] = useState<Array<{ id: string; name: string; description: string }>>([])
  const [itemAvailability, setItemAvailability] = useState<Record<string, boolean>>({})
  const [menuEnabled, setMenuEnabled] = useState(true)
  const [serviceRequestsEnabled, setServiceRequestsEnabled] = useState(true)
  const [operatingHours, setOperatingHours] = useState({ open: "10:00", close: "22:00" })
  const [language, setLanguage] = useState("en")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoadingMenu, setIsLoadingMenu] = useState(false)
  
  const refreshMenuItems = async () => {
    setIsLoadingMenu(true)
    try {
      const items = await getMenuItems()
      setMenuItems(items)
      
      // Update itemAvailability map for dashboard use
      const availability: Record<string, boolean> = {}
      items.forEach(item => {
        availability[item.id] = item.available !== false
      })
      setItemAvailability(availability)
    } finally {
      setIsLoadingMenu(false)
    }
  }

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoadingOrders(true)
        // Consolidated seeding: Orders, Requests, Items, and Categories
        await serverSeedDemoData()
        await seedInitialData(defaultMenuItems, defaultCategories)
        
        const [ordersRes, categoriesRes] = await Promise.all([
          serverGetTodayOrders(),
          getCategories()
        ])

        if (ordersRes.success && ordersRes.data) {
          const mappedOrders = ordersRes.data.map((order: any) => ({
            id: order.id,
            items: order.items || [],
            status: order.status,
            type: order.type,
            total: order.total,
            timestamp: new Date(order.created_at),
            preparationTime: order.preparation_time,
            estimatedReadyTime: order.estimated_ready_time ? new Date(order.estimated_ready_time) : undefined,
          }))
          setOrders(mappedOrders)
          console.log("[v0] Loaded orders from Local Storage:", mappedOrders.length)
        }

        if (categoriesRes) {
          setCategories(categoriesRes)
        }
        
        // Load menu items
        await refreshMenuItems()
      } catch (error) {
        console.error("[v0] Failed to load data from Local Storage:", error)
      } finally {
        setIsLoadingOrders(false)
      }
    }
    loadOrders()
  }, [])

  const getTodayOrders = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return orders.filter((order) => {
      const orderDate = new Date(order.timestamp)
      orderDate.setHours(0, 0, 0, 0)
      return orderDate.getTime() === today.getTime()
    })
  }

  const getMenuItemPerformance = (): MenuItemPerformance[] => {
    const performance: Record<string, MenuItemPerformance> = {}

    getTodayOrders().forEach((order) => {
      order.items.forEach((item) => {
        if (!performance[item.id]) {
          performance[item.id] = {
            id: item.id,
            name: item.name,
            sales: 0,
            revenue: 0,
            category: order.category || "",
            available: itemAvailability[item.id] !== false,
            trending: "stable",
            pairingSuccessRate: 0,
          }
        }
        performance[item.id].sales += item.quantity
        performance[item.id].revenue += item.price * item.quantity
      })
    })

    return Object.entries(performance)
      .map(([id, data]) => ({
        ...data,
        trending: data.sales > 5 ? ("up" as const) : data.sales < 2 ? ("down" as const) : ("stable" as const),
        pairingSuccessRate: Math.floor(Math.random() * 100),
      }))
      .sort((a, b) => b.sales - a.sales)
  }

  const getCustomerMetrics = (): CustomerMetrics => {
    const todayOrders = getTodayOrders()
    const totalCustomers = todayOrders.length
    const newCustomers = Math.ceil(totalCustomers * 0.3)
    const repeatCustomers = totalCustomers - newCustomers
    const repeatRate = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0

    return {
      totalCustomers,
      newCustomers,
      repeatCustomers,
      repeatRate,
      feedbackScores: { excellent: 0, good: 0, improvement: 0 },
      dietaryPreferences: { veg: 8, nonVeg: 12, vegan: 5 },
      complaints: 0,
    }
  }

  const getTimeMetrics = (): TimeMetrics => {
    const todayOrders = getTodayOrders()
    const avgPrepTime =
      todayOrders.length > 0
        ? Math.round(todayOrders.reduce((sum, o) => sum + (o.preparationTime || 0), 0) / todayOrders.length)
        : 0

    return {
      avgPrepTime,
      avgDiningTime: 45,
      rushHours: ["12:00-13:30", "18:00-20:00"],
      bottleneck: todayOrders.length > 10 ? "kitchen" : "none",
      currentLoad: todayOrders.length > 15 ? "busy" : todayOrders.length > 5 ? "normal" : "light",
    }
  }

  const getRevenueMetrics = (): RevenueMetrics => {
    const todayRevenue = getTodayOrders().reduce((sum, o) => sum + o.total, 0)
    const monthlyRevenue = todayRevenue * 25 // Estimate

    return {
      dailyRevenue: todayRevenue,
      monthlyRevenue,
      estimatedSavings: todayRevenue * 0.15,
      missedOrdersPreventionScore: 98,
      staffEfficiencyScore: 92,
    }
  }

  const getStaffMetrics = (): StaffMetrics => {
    return {
      activeStaff: 8,
      shiftInfo: [
        { shift: "Morning (6-12)", count: 3 },
        { shift: "Lunch (12-16)", count: 5 },
        { shift: "Evening (16-22)", count: 6 },
      ],
      serviceLoad: 65,
      kitchenLoad: getTodayOrders().length > 10 ? 85 : 45,
    }
  }

  const toggleItemAvailability = async (itemId: string) => {
    // Current items from actions
    const items = await getMenuItems()
    const item = items.find(i => i.id === itemId)
    if (item) {
      const newItem = {
        ...item,
        available: !item.available
      }
      const success = await updateMenuItemAction(newItem)
      if (success) {
        await refreshMenuItems()
      }
    }
  }

  const addOrder = async (order: Order) => {
    try {
      const newOrder = {
        ...order,
        id: `order-${Date.now()}`,
        status: "pending" as const,
        estimatedReadyTime: new Date(Date.now() + (order.preparationTime || 5) * 60 * 1000),
      }

      const result = await serverAddOrder({
        id: newOrder.id,
        items: newOrder.items,
        status: newOrder.status,
        type: newOrder.type,
        total: newOrder.total,
        preparationTime: newOrder.preparationTime || 5,
        estimatedReadyTime: newOrder.estimatedReadyTime,
      })

      if (result.success) {
        setOrders((prev) => [newOrder, ...prev])
        console.log("[v0] Order added successfully:", newOrder.id)
      } else {
        throw new Error(result.error || "Failed to add order")
      }
    } catch (error) {
      console.error("[v0] Error adding order:", error)
      throw new Error("Failed to add order. Please try again.")
    }
  }

  const addServiceRequest = async (type: "water" | "clean" | "assistance" | "cutlery" | "bill", tableNumber?: string) => {
    try {
      const newRequest: ServiceRequest = {
        id: `req-${Date.now()}`,
        type,
        timestamp: new Date(),
        resolved: false,
        tableNumber
      }

      const result = await serverAddServiceRequest({
        id: newRequest.id,
        type: newRequest.type,
      })

      if (result.success) {
        setServiceRequests((prev) => [newRequest, ...prev])
        console.log("[v0] Service request added:", newRequest.type, tableNumber ? `from ${tableNumber}` : "")
      } else {
        throw new Error(result.error || "Failed to submit service request")
      }
    } catch (error) {
      console.error("[v0] Error adding service request:", error)
      throw new Error("Failed to submit service request.")
    }
  }

  const resolveServiceRequest = (id: string) => {
    setServiceRequests((prev) =>
      prev.map((req) => {
        if (req.id === id && !req.resolved) {
          const responseTime = Math.round((Date.now() - req.timestamp.getTime()) / 1000)
          return { ...req, resolved: true, responseTime }
        }
        return req
      }),
    )
  }

  const updateOrderStatus = async (orderId: string, status: "pending" | "preparing" | "ready" | "served") => {
    try {
      const result = await serverUpdateOrderStatus(orderId, status)

      if (result.success) {
        setOrders((prev) =>
          prev.map((order) => {
            if (order.id === orderId) {
              return {
                ...order,
                status,
                estimatedReadyTime:
                  status === "preparing"
                    ? new Date(Date.now() + (order.preparationTime || 5) * 60 * 1000)
                    : order.estimatedReadyTime,
              }
            }
            return order
          }),
        )
        console.log("[v0] Order status updated:", orderId, status)
      } else {
        throw new Error(result.error || "Failed to update order status")
      }
    } catch (error) {
      console.error("[v0] Error updating order status:", error)
      throw new Error("Failed to update order status.")
    }
  }

  const addCategory = async (category: { id: string; name: string; description: string }) => {
    const success = await addCategoryAction(category)
    if (success) {
      setCategories(prev => [...prev, category])
    }
  }

  const updateCategory = async (category: { id: string; name: string; description: string }) => {
    const success = await updateCategoryAction(category)
    if (success) {
      setCategories(prev => prev.map(c => c.id === category.id ? category : c))
    }
  }

  const deleteCategory = async (id: string) => {
    const success = await deleteCategoryAction(id)
    if (success) {
      setCategories(prev => prev.filter(c => c.id !== id))
    }
  }

  const updateMenuItem = async (item: any) => {
    const success = await updateMenuItemAction(item)
    if (success) {
      // We don't have menu items in context state yet, they are fetched in page.tsx
      // For a real app, we'd probably want them here too.
      console.log("[v0] Menu item updated in context")
    }
  }

  const deleteMenuItem = async (id: string) => {
    const success = await deleteMenuItemAction(id)
    if (success) {
      console.log("[v0] Menu item deleted in context")
    }
  }

  const todayOrders = getTodayOrders()
  const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = todayOrders.length
  const averageOrderValue = totalOrders > 0 ? todayRevenue / totalOrders : 0
  const liveOrdersCount = todayOrders.filter((o) => o.status !== "served").length

  const togglePopularity = async (itemId: string) => {
    const fetchedItems = await getMenuItems()
    const item = fetchedItems.find(i => i.id === itemId)
    if (item) {
      const newItem = {
        ...item,
        isPopular: !item.isPopular,
        // Ensure all required fields for mapping
        chefNote: item.chefNote || "",
      }
      const success = await updateMenuItemAction(newItem)
      if (success) {
        await refreshMenuItems()
        console.log("[v0] Item popularity toggled:", itemId)
      }
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        orders,
        serviceRequests,
        addOrder,
        addServiceRequest,
        resolveServiceRequest,
        updateOrderStatus,
        itemAvailability,
        toggleItemAvailability,
        todayRevenue,
        totalOrders,
        averageOrderValue,
        liveOrdersCount,
        getTodayOrders,
        getMenuItemPerformance,
        getCustomerMetrics,
        getTimeMetrics,
        getRevenueMetrics,
        getStaffMetrics,
        menuItems,
        refreshMenuItems,
        addMenuItem: async (item: MenuItem) => {
          const success = await addMenuItemAction(item)
          if (success) await refreshMenuItems()
        },
        isLoadingMenu,
        menuEnabled,
        serviceRequestsEnabled,
        operatingHours,
        language,
        notificationsEnabled,
        setMenuEnabled,
        setServiceRequestsEnabled,
        setOperatingHours,
        setLanguage,
        setNotificationsEnabled,
        isLoadingOrders,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        updateMenuItem,
        deleteMenuItem,
        togglePopularity,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useDashboard must be used within DashboardProvider")
  }
  return context
}
