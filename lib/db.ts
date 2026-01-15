import { createClient } from "./supabase/server"

export async function addOrder(orderData: {
  id: string
  items: any[]
  status: string
  type: string
  total: number
  preparationTime?: number
  estimatedReadyTime?: Date
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("orders").insert([
    {
      id: orderData.id,
      items: orderData.items,
      status: orderData.status,
      type: orderData.type,
      total: orderData.total,
      preparation_time: orderData.preparationTime || 5,
      estimated_ready_time: orderData.estimatedReadyTime?.toISOString(),
    },
  ])

  if (error) throw new Error(`Failed to add order: ${error.message}`)
  return data
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("orders")
    .update({ status, estimated_ready_time: new Date().toISOString() })
    .eq("id", orderId)

  if (error) throw new Error(`Failed to update order: ${error.message}`)
  return data
}

export async function getTodayOrders() {
  const supabase = await createClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", today.toISOString())
    .order("created_at", { ascending: false })

  if (error) throw new Error(`Failed to fetch orders: ${error.message}`)
  return data || []
}

export async function addServiceRequest(requestData: {
  id: string
  type: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("service_requests").insert([
    {
      id: requestData.id,
      type: requestData.type,
    },
  ])

  if (error) throw new Error(`Failed to add service request: ${error.message}`)
  return data
}

export async function resolveServiceRequest(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("service_requests")
    .update({ resolved: true, resolved_at: new Date().toISOString() })
    .eq("id", id)

  if (error) throw new Error(`Failed to resolve request: ${error.message}`)
  return data
}

export async function addFeedback(feedbackData: {
  id: string
  orderId: string
  rating: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("customer_feedback").insert([
    {
      id: feedbackData.id,
      order_id: feedbackData.orderId,
      rating: feedbackData.rating,
    },
  ])

  if (error) throw new Error(`Failed to add feedback: ${error.message}`)
  return data
}

export async function toggleMenuItemAvailability(itemId: string, available: boolean) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("menu_items_availability")
    .upsert([{ item_id: itemId, available }], { onConflict: "item_id" })

  if (error) throw new Error(`Failed to update availability: ${error.message}`)
  return data
}
