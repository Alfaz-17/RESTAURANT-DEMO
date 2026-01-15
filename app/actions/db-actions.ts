import { localDb } from "@/lib/local-db"

export async function serverAddOrder(orderData: {
  id: string
  items: any[]
  status: string
  type: string
  total: number
  preparationTime?: number
  estimatedReadyTime?: Date
}) {
  try {
    const data = localDb.addOrder({
      id: orderData.id,
      items: orderData.items,
      status: orderData.status,
      type: orderData.type,
      total: orderData.total,
      preparation_time: orderData.preparationTime || 5,
      estimated_ready_time: orderData.estimatedReadyTime?.toISOString(),
    })

    return { success: true, data }
  } catch (error) {
    console.error("[v0] Local action - Add order failed:", error)
    return { success: false, error: String(error) }
  }
}

export async function serverUpdateOrderStatus(orderId: string, status: string) {
  try {
    const data = localDb.updateOrderStatus(orderId, status)
    if (!data) throw new Error("Order not found")
    
    console.log("[v0] Local action - Order status updated:", orderId, status)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Local action - Update order status failed:", error)
    return { success: false, error: String(error) }
  }
}

export async function serverGetTodayOrders() {
  try {
    const orders = localDb.getOrders()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const filtered = orders.filter(o => {
      const date = new Date(o.created_at)
      date.setHours(0, 0, 0, 0)
      return date.getTime() === today.getTime()
    })

    console.log("[v0] Local action - Loaded orders:", filtered.length)
    // Map to match Supabase response format (with created_at)
    return { success: true, data: filtered }
  } catch (error) {
    console.error("[v0] Local action - Get today orders failed:", error)
    return { success: false, error: String(error), data: [] }
  }
}

export async function serverAddServiceRequest(requestData: {
  id: string
  type: string
}) {
  try {
    const data = localDb.addServiceRequest(requestData.type)
    console.log("[v0] Local action - Service request added:", requestData.type)
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Local action - Add service request failed:", error)
    return { success: false, error: String(error) }
  }
}

export async function serverAddFeedback(feedbackData: {
  id: string
  orderId: string
  rating: string
}) {
  try {
    const data = localDb.addFeedback({
      id: feedbackData.id,
      order_id: feedbackData.orderId,
      rating: feedbackData.rating,
    })
    return { success: true, data }
  } catch (error) {
    console.error("[v0] Local action - Add feedback failed:", error)
    return { success: false, error: String(error) }
  }
}

export async function serverSeedDemoData() {
  try {
    localDb.seedDemoData()
    return { success: true }
  } catch (error) {
    console.error("[v0] Local action - Seed demo data failed:", error)
    return { success: false, error: String(error) }
  }
}
