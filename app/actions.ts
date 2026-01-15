"use server"

import { generateText as generateAIText } from "ai"
import { z } from "zod"

const toolSchema = z.enum(["cost-saving", "dish-suggestion", "menu-update", "menu-builder"])
export type ToolType = z.infer<typeof toolSchema>

export async function generateAISuggestion(prompt: string, tool: ToolType): Promise<string> {
  const hasKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY

  if (!hasKey) {
    console.log(`[v0] AI Demo Mode - No API key found. Providing mock response for tool: ${tool}`)
    // Artificial delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    switch(tool) {
      case "cost-saving":
        return `COST SAVING ANALYSIS (AI DEMO MODE)\n\n1. Staff Efficiency: Your average prep time of 12 minutes is slightly above industry average (10m). Training staff on prep-efficiency could save ~$450/month.\n2. Inventory Waste: Reducing specialized ingredients for low-volume items (like the Truffle Fondue) could reduce waste by 15%.\n3. Upsell Strategy: Your beverage attachment rate is 32%. Increasing this to 45% via pairings would add ~$1,200 to monthly revenue.`
      case "dish-suggestion":
        return `DISH PERFORMANCE INSIGHTS (AI DEMO MODE)\n\n- Based on your current High-Margin performers, we suggest adding a "Signature Lamb Shank" or "Spicy Seared Scallops".\n- Your Vegetarian options represent 40% of sales; consider a "Wild Mushroom Risotto" to capitalize on this trend.`
      case "menu-update":
        return `MENU OPTIMIZATION SUGGESTIONS (AI DEMO MODE)\n\n- Description Update: "Classic Pizza" is too simple. Try "Hand-stretched Sourdough Pizza with San Marzano tomatoes and buffalo mozzarella".\n- Visual Appeal: Add high-resolution images to your "Specials" category to increase conversion by 20%.\n- Category Layout: Move "Best Sellers" to the very top to reduce decision fatigue.`
      case "menu-builder":
        return `MENU BUILDER RECOMMENDATION (AI DEMO MODE)\n\nProposed Weekend Special Menu:\n- Appetizer: Honey-Glazed Halloumi Fries (₹280)\n- Main: Pan-Roasted Sea Bass with Lemon Caper Sauce (₹750)\n- Dessert: Deconstructed Apple Crumble (₹220)\n\nEstimated Margin: 68% | Prep Time: 15min`
      default:
        return "AI Suggestion for your restaurant: Focus on seasonal ingredients and high-margin seasonal pairings to maximize revenue."
    }
  }

  try {
    console.log("[v0] Calling AI with model: openai/gpt-4o-mini")
    const { text } = await generateAIText({
      model: "openai/gpt-4o-mini",
      prompt,
    })
    console.log("[v0] AI response received, length:", text.length)
    return text
  } catch (error) {
    console.error("[v0] Error in generateAISuggestion:", error instanceof Error ? error.message : String(error))
    // Fallback if AI actually fails despite having a key
    return "The AI service is temporarily unavailable. Please try again later or check your API configuration."
  }
}
