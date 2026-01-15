"use client"

// Types based on the existing Supabase schema
export interface LocalOrder {
  id: string
  items: any[]
  status: string
  type: string
  total: number
  preparation_time: number
  estimated_ready_time?: string
  created_at: string
}

export interface LocalServiceRequest {
  id: string
  type: string
  resolved: boolean
  resolved_at?: string
  created_at: string
}

export interface LocalFeedback {
  id: string
  order_id: string
  rating: string
  created_at: string
}

export interface LocalMenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  dietary: string
  spice: string
  portion: string
  pairing: string
  chef_note: string
  available: boolean
  is_popular: boolean
}

export interface LocalCategory {
  id: string
  name: string
  description: string
}

// Storage Keys
const STORAGE_KEYS = {
  ORDERS: "v0_orders",
  SERVICE_REQUESTS: "v0_service_requests",
  MENU_ITEMS: "v0_menu_items",
  CATEGORIES: "v0_categories",
  FEEDBACK: "v0_feedback",
  AVAILABILITY: "v0_item_availability",
}

// Generic storage helpers
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

const saveToStorage = <T>(key: string, data: T[]) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(data))
}

// API Methods
export const localDb = {
  // Orders
  getOrders: (): LocalOrder[] => getFromStorage(STORAGE_KEYS.ORDERS),
  
  addOrder: (order: Omit<LocalOrder, "created_at">): LocalOrder => {
    const orders = getFromStorage<LocalOrder>(STORAGE_KEYS.ORDERS)
    const newOrder = { ...order, created_at: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.ORDERS, [newOrder, ...orders])
    return newOrder
  },

  updateOrderStatus: (orderId: string, status: string): LocalOrder | null => {
    const orders = getFromStorage<LocalOrder>(STORAGE_KEYS.ORDERS)
    const index = orders.findIndex(o => o.id === orderId)
    if (index === -1) return null
    
    orders[index] = { 
      ...orders[index], 
      status, 
      estimated_ready_time: new Date().toISOString() 
    }
    saveToStorage(STORAGE_KEYS.ORDERS, orders)
    return orders[index]
  },

  // Service Requests
  getServiceRequests: (): LocalServiceRequest[] => getFromStorage(STORAGE_KEYS.SERVICE_REQUESTS),

  addServiceRequest: (type: string): LocalServiceRequest => {
    const requests = getFromStorage<LocalServiceRequest>(STORAGE_KEYS.SERVICE_REQUESTS)
    const newRequest: LocalServiceRequest = {
      id: `req-${Date.now()}`,
      type,
      resolved: false,
      created_at: new Date().toISOString()
    }
    saveToStorage(STORAGE_KEYS.SERVICE_REQUESTS, [newRequest, ...requests])
    return newRequest
  },

  resolveServiceRequest: (id: string): LocalServiceRequest | null => {
    const requests = getFromStorage<LocalServiceRequest>(STORAGE_KEYS.SERVICE_REQUESTS)
    const index = requests.findIndex(r => r.id === id)
    if (index === -1) return null
    
    requests[index] = { 
      ...requests[index], 
      resolved: true, 
      resolved_at: new Date().toISOString() 
    }
    saveToStorage(STORAGE_KEYS.SERVICE_REQUESTS, requests)
    return requests[index]
  },

  // Menu Items
  getMenuItems: (): LocalMenuItem[] => getFromStorage(STORAGE_KEYS.MENU_ITEMS),

  saveMenuItems: (items: LocalMenuItem[]): void => {
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, items)
  },

  addMenuItem: (item: LocalMenuItem): boolean => {
    const items = getFromStorage<LocalMenuItem>(STORAGE_KEYS.MENU_ITEMS)
    if (items.some(i => i.id === item.id)) return false
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, [...items, item])
    return true
  },

  updateMenuItem: (item: LocalMenuItem): boolean => {
    const items = getFromStorage<LocalMenuItem>(STORAGE_KEYS.MENU_ITEMS)
    const index = items.findIndex(i => i.id === item.id)
    if (index === -1) return false
    items[index] = item
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, items)
    return true
  },

  deleteMenuItem: (id: string): boolean => {
    const items = getFromStorage<LocalMenuItem>(STORAGE_KEYS.MENU_ITEMS)
    const filtered = items.filter(i => i.id !== id)
    if (filtered.length === items.length) return false
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, filtered)
    return true
  },

  seedMenuItems: (items: any[]): boolean => {
    const existing = getFromStorage(STORAGE_KEYS.MENU_ITEMS)
    if (existing.length > 0) return true
    
    const formattedItems = items.map(item => ({
      ...item,
      chef_note: item.chefNote || item.chef_note,
      available: true
    }))
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, formattedItems)
    return true
  },

  toggleMenuItemAvailability: (itemId: string, available: boolean): boolean => {
    const items = getFromStorage<LocalMenuItem>(STORAGE_KEYS.MENU_ITEMS)
    const index = items.findIndex(i => i.id === itemId)
    if (index === -1) return false
    
    items[index] = { ...items[index], available }
    saveToStorage(STORAGE_KEYS.MENU_ITEMS, items)
    return true
  },

  // Categories
  getCategories: (): LocalCategory[] => getFromStorage(STORAGE_KEYS.CATEGORIES),

  addCategory: (category: LocalCategory): boolean => {
    const categories = getFromStorage<LocalCategory>(STORAGE_KEYS.CATEGORIES)
    if (categories.some(c => c.id === category.id)) return false
    saveToStorage(STORAGE_KEYS.CATEGORIES, [...categories, category])
    return true
  },

  updateCategory: (category: LocalCategory): boolean => {
    const categories = getFromStorage<LocalCategory>(STORAGE_KEYS.CATEGORIES)
    const index = categories.findIndex(c => c.id === category.id)
    if (index === -1) return false
    categories[index] = category
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
    return true
  },

  deleteCategory: (id: string): boolean => {
    const categories = getFromStorage<LocalCategory>(STORAGE_KEYS.CATEGORIES)
    const filtered = categories.filter(c => c.id !== id)
    if (filtered.length === categories.length) return false
    saveToStorage(STORAGE_KEYS.CATEGORIES, filtered)
    return true
  },

  seedCategories: (categories: LocalCategory[]): boolean => {
    const existing = getFromStorage(STORAGE_KEYS.CATEGORIES)
    if (existing.length > 0) return true
    saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
    return true
  },

  // Feedback
  addFeedback: (feedback: Omit<LocalFeedback, "created_at">): LocalFeedback => {
    const list = getFromStorage<LocalFeedback>(STORAGE_KEYS.FEEDBACK)
    const newItem = { ...feedback, created_at: new Date().toISOString() }
    saveToStorage(STORAGE_KEYS.FEEDBACK, [newItem, ...list])
    return newItem
  },

  // Demo Seeding
  seedDemoData: (): void => {
    const orders = getFromStorage(STORAGE_KEYS.ORDERS)
    if (orders.length === 0) {
      const demoOrders: LocalOrder[] = [
        {
          id: "order-demo-1",
          items: [{ id: "p1", name: "Paneer Tikka Pizza", quantity: 2, price: 249 }],
          status: "served",
          type: "dine-in",
          total: 547.8,
          preparation_time: 15,
          created_at: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "order-demo-2",
          items: [{ id: "b1", name: "Classic Cheeseburger", quantity: 1, price: 189 }],
          status: "ready",
          type: "takeaway",
          total: 207.9,
          preparation_time: 10,
          created_at: new Date(Date.now() - 1800000).toISOString(),
        },
        {
          id: "order-demo-3",
          items: [{ id: "s1", name: "Chicken Tikka Wrap", quantity: 3, price: 149 }],
          status: "preparing",
          type: "dine-in",
          total: 491.7,
          preparation_time: 12,
          created_at: new Date(Date.now() - 600000).toISOString(),
        }
      ]
      saveToStorage(STORAGE_KEYS.ORDERS, demoOrders)
      console.log("[v0] Local DB - Seeded demo orders")
    }

    const requests = getFromStorage(STORAGE_KEYS.SERVICE_REQUESTS)
    if (requests.length === 0) {
      const demoRequests: LocalServiceRequest[] = [
        {
          id: "req-demo-1",
          type: "water",
          resolved: false,
          created_at: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: "req-demo-2",
          type: "bill",
          resolved: true,
          resolved_at: new Date(Date.now() - 120000).toISOString(),
          created_at: new Date(Date.now() - 600000).toISOString()
        }
      ]
      saveToStorage(STORAGE_KEYS.SERVICE_REQUESTS, demoRequests)
      console.log("[v0] Local DB - Seeded demo service requests")
    }
  },

  seedInitialData: (items: any[], categories: any[]): void => {
    // Seed Items
    const existingItems = getFromStorage(STORAGE_KEYS.MENU_ITEMS)
    if (existingItems.length === 0) {
      const formattedItems = items.map(item => ({
        ...item,
        chef_note: item.chefNote || item.chef_note,
        available: true,
        is_popular: item.isPopular || false
      }))
      saveToStorage(STORAGE_KEYS.MENU_ITEMS, formattedItems)
      console.log("[v0] Local DB - Seeded menu items:", formattedItems.length)
    } else {
      console.log("[v0] Local DB - Menu items already exist:", existingItems.length)
    }

    // Seed Categories
    const existingCats = getFromStorage(STORAGE_KEYS.CATEGORIES)
    if (existingCats.length === 0) {
      saveToStorage(STORAGE_KEYS.CATEGORIES, categories)
      console.log("[v0] Local DB - Seeded categories:", categories.length)
    } else {
      console.log("[v0] Local DB - Categories already exist:", existingCats.length)
    }
  }
}
