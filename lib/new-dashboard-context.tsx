"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { menuItems } from "@/components/menu-data"
import type { MenuItem } from "@/components/menu-data"

export interface Order {
  id: string
  items: Array<{ id: string; name: string; quantity: number; price: number }>
  status: "preparing" | "finishing" | "ready" | "served"
  type: "dine-in" | "takeaway" | "delivery"
  source?: "menu" | "swiggy" | "zomato" | "online"
  total: number
  timestamp: Date
  preparationTime?: number
  tableNumber?: number
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  minStock: number
  lastRestocked?: Date
  supplier?: string
}

export interface MenuItemControl extends MenuItem {
  available: boolean
  currentPrice: number
  preparationTime: number
}

interface DashboardContextType {
  // Kitchen data
  orders: Order[]
  liveOrders: Order[]
  addOrder: (order: Order) => void

  // Inventory
  inventory: InventoryItem[]
  updateInventory: (itemId: string, quantity: number) => void
  getLowStockItems: () => InventoryItem[]

  // Menu control
  menuItemsControl: MenuItemControl[]
  updateMenuItemPrice: (itemId: string, price: number) => void
  toggleMenuItemAvailability: (itemId: string) => void
  updateMenuItemPrepTime: (itemId: string, time: number) => void
  getMenuItemAvailability: (itemId: string) => boolean

  // Delivery orders
  deliveryOrders: Order[]
  addDeliveryOrder: (order: Order) => void

  // Reports data
  getDailyStats: () => {
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    peakHour: string
  }
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function NewDashboardProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [deliveryOrders, setDeliveryOrders] = useState<Order[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "inv-1", name: "Butter", quantity: 50, unit: "kg", minStock: 10 },
    { id: "inv-2", name: "Flour", quantity: 100, unit: "kg", minStock: 20 },
    { id: "inv-3", name: "Olive Oil", quantity: 30, unit: "liters", minStock: 5 },
  ])

  const [menuItemsControl, setMenuItemsControl] = useState<MenuItemControl[]>(
    menuItems.map((item) => ({
      ...item,
      available: true,
      currentPrice: item.price,
      preparationTime: 15,
    })),
  )

  const liveOrders = orders.filter((o) => o.status !== "served")

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
    // Auto-track inventory for ordered items
    order.items.forEach((item) => {
      // Simplified: reduce inventory by quantity
    })
  }

  const addDeliveryOrder = (order: Order) => {
    setDeliveryOrders((prev) => [order, ...prev])
  }

  const updateInventory = (itemId: string, quantity: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + quantity) } : item)),
    )
  }

  const getLowStockItems = () => {
    return inventory.filter((item) => item.quantity <= item.minStock)
  }

  const updateMenuItemPrice = (itemId: string, price: number) => {
    setMenuItemsControl((prev) => prev.map((item) => (item.id === itemId ? { ...item, currentPrice: price } : item)))
  }

  const toggleMenuItemAvailability = (itemId: string) => {
    setMenuItemsControl((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, available: !item.available } : item)),
    )
  }

  const updateMenuItemPrepTime = (itemId: string, time: number) => {
    setMenuItemsControl((prev) => prev.map((item) => (item.id === itemId ? { ...item, preparationTime: time } : item)))
  }

  const getMenuItemAvailability = (itemId: string) => {
    return menuItemsControl.find((item) => item.id === itemId)?.available ?? true
  }

  const getDailyStats = () => {
    const todayOrders = orders.filter((order) => {
      const today = new Date()
      const orderDate = new Date(order.timestamp)
      return (
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear()
      )
    })

    const totalRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0)
    const totalOrders = todayOrders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      peakHour: "12:00 - 13:00",
    }
  }

  return (
    <DashboardContext.Provider
      value={{
        orders,
        liveOrders,
        addOrder,
        inventory,
        updateInventory,
        getLowStockItems,
        menuItemsControl,
        updateMenuItemPrice,
        toggleMenuItemAvailability,
        updateMenuItemPrepTime,
        getMenuItemAvailability,
        deliveryOrders,
        addDeliveryOrder,
        getDailyStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useNewDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error("useNewDashboard must be used within NewDashboardProvider")
  }
  return context
}
