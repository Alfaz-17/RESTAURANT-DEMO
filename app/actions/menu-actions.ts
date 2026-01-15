import { localDb } from "@/lib/local-db"
import type { MenuItem } from "@/components/menu-data"

// Get all menu items from local storage
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const data = localDb.getMenuItems()

    return (
      data?.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: item.category,
        dietary: item.dietary as "veg" | "non-veg" | "vegan",
        spice: item.spice as "mild" | "medium" | "bold" | undefined,
        portion: item.portion as "light" | "regular" | "shareable",
        pairing: item.pairing,
        chefNote: item.chef_note,
        isPopular: item.is_popular,
        available: item.available,
      })) || []
    )
  } catch (error) {
    console.error("[v0] Local action - Failed to fetch menu items:", error instanceof Error ? error.message : String(error))
    return []
  }
}

// Add a single menu item
export async function addMenuItem(item: MenuItem): Promise<boolean> {
  try {
    const success = localDb.addMenuItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      dietary: item.dietary,
      spice: item.spice || "mild",
      portion: item.portion,
      pairing: item.pairing,
      chef_note: item.chefNote || "",
      available: true,
      is_popular: item.isPopular || false,
    })
    if (success) console.log("[v0] Local action - Menu item added:", item.id)
    return success
  } catch (error) {
    console.error("[v0] Local action - Failed to add menu item:", error instanceof Error ? error.message : String(error))
    return false
  }
}

// Update a menu item
export async function updateMenuItem(item: MenuItem): Promise<boolean> {
  try {
    const success = localDb.updateMenuItem({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
      dietary: item.dietary,
      spice: item.spice || "mild",
      portion: item.portion,
      pairing: item.pairing,
      chef_note: item.chefNote || "",
      available: item.available !== false,
      is_popular: item.isPopular || false,
    })
    if (success) console.log("[v0] Local action - Menu item updated:", item.id)
    return success
  } catch (error) {
    console.error("[v0] Local action - Failed to update menu item:", error instanceof Error ? error.message : String(error))
    return false
  }
}

// Delete a menu item
export async function deleteMenuItem(id: string): Promise<boolean> {
  try {
    const success = localDb.deleteMenuItem(id)
    if (success) console.log("[v0] Local action - Menu item deleted:", id)
    return success
  } catch (error) {
    console.error("[v0] Local action - Failed to delete menu item:", error instanceof Error ? error.message : String(error))
    return false
  }
}

export async function seedInitialData(items: any[], categories: any[]) {
  try {
    return localDb.seedInitialData(items, categories)
  } catch (error) {
    console.error("[v0] Local action - Failed to seed initial data")
    return false
  }
}

// --- Category Actions ---

export async function getCategories() {
  try {
    return localDb.getCategories()
  } catch (error) {
    console.error("[v0] Local action - Failed to fetch categories")
    return []
  }
}

export async function addCategory(category: { id: string; name: string; description: string }) {
  try {
    return localDb.addCategory(category)
  } catch (error) {
    console.error("[v0] Local action - Failed to add category")
    return false
  }
}

export async function updateCategory(category: { id: string; name: string; description: string }) {
  try {
    return localDb.updateCategory(category)
  } catch (error) {
    console.error("[v0] Local action - Failed to update category")
    return false
  }
}

export async function deleteCategory(id: string) {
  try {
    return localDb.deleteCategory(id)
  } catch (error) {
    console.error("[v0] Local action - Failed to delete category")
    return false
  }
}

export async function seedCategories(categories: any[]) {
  try {
    return localDb.seedCategories(categories)
  } catch (error) {
    console.error("[v0] Local action - Failed to seed categories")
    return false
  }
}

// Seed initial menu items (run once)
export async function seedMenuItems(items: MenuItem[]): Promise<boolean> {
  try {
    const success = localDb.seedMenuItems(items)
    if (success) {
      console.log("[v0] Local action - Menu items seeded successfully:", items.length)
    }
    return success
  } catch (error) {
    console.error("[v0] Local action - Failed to seed menu items:", error instanceof Error ? error.message : String(error))
    return false
  }
}
