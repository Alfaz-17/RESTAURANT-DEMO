import type { MenuItem } from "@/components/menu-data"

export interface AIFoodyInput {
  dietary: "veg" | "non-veg" | "vegan" | null
  mood: "light" | "filling" | null
  spice: "mild" | "medium" | "spicy" | null
  budget: "low" | "medium" | "any" | null
}

export function calculatePriorityScore(item: MenuItem, input: AIFoodyInput): number {
  let score = 0

  // Dietary match (VERY HIGH - remove if not matching)
  if (input.dietary) {
    if (item.dietary === input.dietary) {
      score += 100
    } else if (input.dietary === "vegan" && item.dietary === "veg") {
      score += 50 // Partial match for vegan preference
    } else {
      return -1000 // Fail dietary requirement
    }
  } else {
    score += 50 // No preference = slight boost for flexibility
  }

  // Mood/Portion match (HIGH)
  if (input.mood) {
    if (input.mood === "light" && item.portion === "light") {
      score += 80
    } else if (input.mood === "filling" && item.portion === "shareable") {
      score += 80
    } else if (input.mood === "filling" && item.portion === "regular") {
      score += 60
    } else if (input.mood === "light" && item.portion === "regular") {
      score += 40
    }
  }

  // Spice match (HIGH)
  if (input.spice && item.spice) {
    if (item.spice === input.spice) {
      score += 80
    } else if (input.spice === "mild" && item.spice === "medium") {
      score += 40
    } else if (input.spice === "medium" && item.spice === "bold") {
      score += 40
    } else if (
      (input.spice === "spicy" && item.spice === "bold") ||
      (input.spice === "mild" && item.spice === "medium")
    ) {
      score += 60
    }
  }

  // Budget fit (MEDIUM)
  if (input.budget && input.budget !== "any") {
    const priceThresholds = {
      low: 150, // Up to ₹150
      medium: 250, // Up to ₹250
      any: 999, // No limit
    }

    const threshold = priceThresholds[input.budget]
    if (item.price <= threshold) {
      score += 60
    } else if (item.price <= threshold + 100) {
      score += 20
    } else {
      score -= 50
    }
  }

  // Popularity boost (MEDIUM)
  if (item.chefNote?.includes("Save")) {
    score += 30 // Combo deals
  }
  if (item.category === "combos") {
    score += 25
  }

  return score
}

export function getSuggestions(items: MenuItem[], input: AIFoodyInput): MenuItem[] {
  // Score all items
  const scored = items.map((item) => ({
    item,
    score: calculatePriorityScore(item, input),
  }))

  // Remove failed dietary requirements
  const valid = scored.filter((s) => s.score > -1000)

  // Sort by score
  const sorted = valid.sort((a, b) => b.score - a.score)

  // Return top 3, or fallback to bestsellers
  if (sorted.length > 0) {
    return sorted.slice(0, 3).map((s) => s.item)
  }

  // Fallback: bestsellers + chef specials + mid-price items
  return items.filter((item) => item.category === "combos" || item.category === "specials").slice(0, 3)
}
