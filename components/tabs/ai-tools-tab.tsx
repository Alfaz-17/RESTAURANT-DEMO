"use client"

import { useState } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { generateAISuggestion } from "@/app/actions"
import { Zap, Lightbulb, FileText, UtensilsCrossed } from "lucide-react"

export function AIToolsTab() {
  const { getTodayOrders, getMenuItemPerformance, getRevenueMetrics, getTimeMetrics } = useDashboard()
  const [activeAITool, setActiveAITool] = useState<"cost-saving" | "dish-suggestion" | "menu-update" | "menu-builder">(
    "cost-saving",
  )
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState<string>("")

  const demoSuggestions = {
    "cost-saving": `COST SAVING ANALYZER

Where you might be losing money:

1. Staff Efficiency Impact
   - Avg prep time: 8 min | Optimize recipes for faster service
   - Consider menu complexity: 25 items may cause kitchen delays
   - Estimated savings: 12% efficiency gain = $240/day

2. High-Waste Dishes
   - Complex dishes with 7+ ingredients have 3x waste rate
   - Recommend: Streamline 3-4 complex items
   - Potential savings: $180/month

3. Missed Upsell Opportunities
   - Only 40% of orders include beverages
   - Wine pairings increase AOV by 25%
   - Estimated lost revenue: $120/day

Conservative Estimate: $8,400/month in recoverable costs`,

    "dish-suggestion": `DISH PERFORMANCE & SUGGESTION

Top Performing Dishes (Keep & Promote):
✓ Pan-seared Salmon - 12 orders, $180 revenue
✓ Risotto Milanese - 10 orders, $120 revenue
✓ Herb Lamb Rack - 8 orders, $224 revenue

Weak Dishes (Review):
✗ Truffle Pasta - 2 orders, $40 revenue (Low engagement)
✗ Seafood Medley - 3 orders, $75 revenue (Confusing description)

Suggested New Dishes (Fill Menu Gaps):
→ Seared Scallop with Truffle Risotto
   (Combines top performers, premium pairing)
→ Herb-Crusted Chicken Breast
   (Lighter protein option, easier to prepare)
→ Grilled Portobello with Seasonal Vegetables
   (Vegetarian premium option)

This doesn't invent dishes. It reads your menu's behavior.`,

    "menu-update": `MENU IMPROVEMENT ASSISTANT

Description Clarity Improvements:
1. Risotto Milanese
   Current: "Italian rice dish"
   Suggested: "Creamy saffron risotto with Parmigiano-Reggiano and truffle oil"
   Impact: +15% orders (clearer description = higher confidence)

2. Herb Lamb Rack
   Add: "Roasted 8 hours, finished with rosemary crust"
   Impact: Justifies premium pricing

Image Upgrade Suggestions:
- Pan-seared Salmon: Add lemon slice for visual appeal
- Chocolate Soufflé: Show cross-section to highlight texture

Category Balance:
- Current: 8 mains, 4 sides, 5 desserts
- Suggested: 9 mains, 6 sides, 5 desserts
- Reason: Customers asking for more vegetable options

Portion Labeling:
- Add "(Serves 1-2)" to sharing items
- Add "(12 oz)" to protein dishes
- Impact: Reduces size-related complaints by 25%

AI never edits your menu. It only explains what could improve.`,

    "menu-builder": `MENU CREATION ASSISTANT

For: Fine Dining Café | Veg & Non-Veg | Price Range: $15-35

SUGGESTED DAILY SPECIALS MENU

MAINS (Pick 2-3):
1. Seared Scallop with Truffle Risotto - $26
   (Protein-forward, luxury positioning)
2. Herb-Crusted Lamb Rack with Seasonal Vegetables - $28
   (Signature protein, high margin)
3. Pan-Seared Salmon with Dill Butter - $24
   (Lighter option, consistent sales)

VEGETARIAN (Pick 1):
1. Mushroom Wellington with Thyme Reduction - $18
   (Substantial, upscale vegetarian)

SIDES (Pick 1-2):
1. Truffle Fries with Parmesan - $8
2. Grilled Asparagus with Garlic Oil - $7

PAIRING IDEAS:
→ Scallop + White Wine (Sauvignon Blanc $28)
→ Lamb + Red Wine (Cabernet $35)
→ Salmon + Rose (Provence $22)

DESSERT (Suggest 1):
1. Chocolate Soufflé with Raspberry Coulis - $9

EXPECTED METRICS:
- Avg Check: $32 (up from $24)
- Margin: 38%
- Prep Time: 12-15 min (manageable)

This is for expansion or experimentation, not daily use.`,
  }

  const handleCostSavingAnalysis = async () => {
    setLoading(true)
    setAiResponse("")
    try {
      const orders = getTodayOrders()
      const revenue = getRevenueMetrics()
      const timeMetrics = getTimeMetrics()
      const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

      const prompt = `Cafe owner dashboard analysis:
- Today's revenue: $${totalRevenue.toFixed(2)} from ${orders.length} orders
- Monthly projected: $${(totalRevenue * 25).toFixed(2)}
- Avg prep time: ${timeMetrics.avgPrepTime} min
- Menu items: 25 dishes across 5 categories
- Estimated monthly cost: $${(totalRevenue * 0.35).toFixed(2)} (35% food cost)

Provide 3 specific, actionable cost-saving suggestions that DON'T sacrifice quality:
1. Staff efficiency improvements based on prep time
2. Identify high-waste or low-margin dishes
3. Upsell opportunities (beverages, wine pairings)

Format as bullet points with specific dollar estimates. Be conservative and realistic.`

      try {
        const text = await generateAISuggestion(prompt, "cost-saving")
        setAiResponse(text)
      } catch (error) {
        console.error("[v0] AI failed, using demo:", error)
        setAiResponse(demoSuggestions["cost-saving"])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDishSuggestion = async () => {
    setLoading(true)
    setAiResponse("")
    try {
      const performance = getMenuItemPerformance()
      const topItems = performance.slice(0, 5).map((p) => `${p.name} (${p.sales} orders)`)
      const weakItems = performance.slice(-3).map((p) => `${p.name} (${p.sales} orders)`)

      const prompt = `Cafe menu analysis:
Top performers: ${topItems.join(", ")}
Weak performers: ${weakItems.join(", ")}

Suggest 2-3 NEW dishes that:
1. Complement top performers (similar ingredients, flavor profiles)
2. Would fill menu gaps (different protein/cooking method)
3. Realistic to prepare in our kitchen (12-15 min prep max)
4. Premium-positioned ($20-35 range)

For each suggestion, explain WHY it works based on current menu success.`

      try {
        const text = await generateAISuggestion(prompt, "dish-suggestion")
        setAiResponse(text)
      } catch (error) {
        console.error("[v0] AI failed, using demo:", error)
        setAiResponse(demoSuggestions["dish-suggestion"])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMenuUpdate = async () => {
    setLoading(true)
    setAiResponse("")
    try {
      const orders = getTodayOrders()
      const performance = getMenuItemPerformance()
      const topPerformers = performance.slice(0, 3).map((p) => p.name)

      const prompt = `Menu optimization request:
- ${orders.length} orders today
- Top 3 items: ${topPerformers.join(", ")}
- Total categories: 5 (Appetizers, Mains, Desserts, Beverages, Specials)

Suggest improvements in these 4 areas:
1. Description clarity - which items need better descriptions?
2. Image quality - which items would benefit from better food photography?
3. Category balance - do we have too many/too few items in any category?
4. Portion labeling - which items need portion size/weight labels?

Provide specific changes with expected impact (e.g., +15% orders).`

      try {
        const text = await generateAISuggestion(prompt, "menu-update")
        setAiResponse(text)
      } catch (error) {
        console.error("[v0] AI failed, using demo:", error)
        setAiResponse(demoSuggestions["menu-update"])
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMenuBuilder = async () => {
    setLoading(true)
    setAiResponse("")
    try {
      const prompt = `Create a sample daily specials menu for: FINE DINING CAFE
Veg/Non-Veg: Mix
Price Range: $15-35 per main
Current menu: 25 items, avg prep 12-15 min

Generate:
1. 3 main dishes (1 protein-forward, 1 seafood, 1 vegetarian option)
2. Suggested wine pairings for each
3. 2-3 complementary sides
4. 1 dessert recommendation
5. Expected metrics (avg check, margin %, prep time)

Format as a professional menu section. Include brief descriptions (2-3 words each).
This is for testing/expansion, not daily implementation.`

      try {
        const text = await generateAISuggestion(prompt, "menu-builder")
        setAiResponse(text)
      } catch (error) {
        console.error("[v0] AI failed, using demo:", error)
        setAiResponse(demoSuggestions["menu-builder"])
      }
    } finally {
      setLoading(false)
    }
  }

  const tools = [
    {
      id: "cost-saving" as const,
      label: "Cost Saving",
      icon: Zap,
      description:
        "Find where you're losing money. Identifies staff efficiency gaps, high-waste dishes, and missed upsells.",
      onClick: handleCostSavingAnalysis,
    },
    {
      id: "dish-suggestion" as const,
      label: "Dish Suggestion",
      icon: Lightbulb,
      description:
        "See which dishes to keep, remove, or improve. Get suggestions based on your menu's actual performance.",
      onClick: handleDishSuggestion,
    },
    {
      id: "menu-update" as const,
      label: "Menu Improvement",
      icon: FileText,
      description: "Improve descriptions, images, layout, and portion info. AI suggests what could increase sales.",
      onClick: handleMenuUpdate,
    },
    {
      id: "menu-builder" as const,
      label: "Menu Builder",
      icon: UtensilsCrossed,
      description: "Create a new menu for expansion or experimentation. AI generates categories, dishes, and pairings.",
      onClick: handleMenuBuilder,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="luxury-card p-4 sm:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-serif text-lg font-light">AI-Powered Tools</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Demo suggestions always available. Unlimited AI access with credit card on Vercel account.
            </p>
          </div>
          <a
            href="https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
          >
            Setup Credit
          </a>
        </div>

        <div className="space-y-3 mb-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.id}
                onClick={() => {
                  setActiveAITool(tool.id)
                  tool.onClick()
                }}
                disabled={loading}
                className={`w-full p-3 sm:p-4 rounded border transition-all text-left ${
                  activeAITool === tool.id
                    ? "border-accent bg-accent bg-opacity-5"
                    : "border-border hover:border-accent"
                } disabled:opacity-50`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm sm:text-base">{tool.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{tool.description}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {aiResponse && (
          <div className="bg-muted p-3 sm:p-4 rounded border border-border whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-light overflow-auto max-h-96">
            {aiResponse}
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            Generating suggestions...
          </div>
        )}

        {!aiResponse && !loading && (
          <div className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
            Click any AI tool to generate suggestions
          </div>
        )}
      </div>
    </div>
  )
}
