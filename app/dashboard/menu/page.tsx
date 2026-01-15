"use client"

import { useState } from "react"
import { menuItems, menuCategories } from "@/components/menu-data"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { Suspense } from "react"

interface EditingItem {
  id: string
  name: string
  price: number
  description: string
  available: boolean
  dietary: "veg" | "non-veg" | "vegan"
  spice?: "mild" | "medium" | "bold"
  portion: "light" | "regular" | "shareable"
}

function MenuContent() {
  const [items, setItems] = useState(menuItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("pizzas")
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredItems = items.filter(
    (item) => item.category === selectedCategory && item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEditItem = (item: (typeof items)[0]) => {
    setEditingItem({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      available: true,
      dietary: item.dietary,
      spice: item.spice,
      portion: item.portion,
    })
  }

  const handleSaveItem = (item: EditingItem) => {
    setItems(
      items.map((i) =>
        i.id === item.id ? { ...i, name: item.name, price: item.price, description: item.description } : i,
      ),
    )
    setEditingItem(null)
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleToggleAvailability = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-light">Menu Management</h1>
          <p className="text-muted-foreground mt-1">Customize items, prices, and availability</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      {/* Search and Category Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-accent text-white"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              {/* Item Info */}
              <div>
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>

              {/* Price and Dietary */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">₹{item.price}</span>
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded">
                  {item.dietary === "veg" ? "🥬 Veg" : item.dietary === "vegan" ? "🌱 Vegan" : "🍗 Non-Veg"}
                </span>
              </div>

              {/* Portion and Spice */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Portion: {item.portion}</span>
                {item.spice && <span>Spice: {item.spice}</span>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <button
                  onClick={() => handleEditItem(item)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-secondary hover:bg-secondary/80 rounded transition-colors flex-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleAvailability(item.id)}
                  className={`px-2 py-1 text-xs rounded transition-colors flex-1 ${
                    true ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                  }`}
                >
                  {true ? "Available" : "Sold Out"}
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-red-500/20 text-red-600 hover:bg-red-500/30 rounded transition-colors flex-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full space-y-4">
            <h2 className="font-serif text-2xl font-light">Edit Item</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="Item name"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Description"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                rows={3}
              />
              <input
                type="number"
                value={editingItem.price}
                onChange={(e) => setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })}
                placeholder="Price (₹)"
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => setEditingItem(null)}
                className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveItem(editingItem)}
                className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={null}>
      <MenuContent />
    </Suspense>
  )
}
