"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/lib/dashboard-context"
import { getMenuItems, addMenuItem as addMenuItemAction } from "@/app/actions/menu-actions"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"
import type { MenuItem } from "@/components/menu-data"

export function MenuControlTab() {
  const { 
    itemAvailability, 
    toggleItemAvailability, 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    updateMenuItem,
    deleteMenuItem,
    togglePopularity,
    menuItems,
    refreshMenuItems,
    addMenuItem: addMenuItemCtx
  } = useDashboard()

  const [activeSubTab, setActiveSubTab] = useState<"items" | "categories">("items")
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<{ id: string; name: string; description: string } | null>(null)

  useEffect(() => {
    refreshMenuItems()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b border-border pb-4">
        <button
          onClick={() => setActiveSubTab("items")}
          className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
            activeSubTab === "items" ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Menu Items
          {activeSubTab === "items" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-accent" />}
        </button>
        <button
          onClick={() => setActiveSubTab("categories")}
          className={`pb-2 px-4 text-sm font-medium transition-colors relative ${
            activeSubTab === "categories" ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Categories
          {activeSubTab === "categories" && <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-accent" />}
        </button>
      </div>

      {activeSubTab === "items" ? (
        <div className="luxury-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-light">Manage Menu Items</h2>
            <button 
              onClick={() => setIsAddingItem(true)}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Price</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Available</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium">Popular</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="py-3 px-4 text-muted-foreground capitalize">{item.category}</td>
                    <td className="py-3 px-4">₹{item.price}</td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={itemAvailability[item.id]}
                        onChange={() => toggleItemAvailability(item.id)}
                        className="w-4 h-4 accent-accent"
                      />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.isPopular}
                        onChange={() => togglePopularity(item.id)}
                        className="w-4 h-4 accent-accent"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={async () => {
                            if (confirm(`Delete ${item.name}?`)) {
                              await deleteMenuItem(item.id)
                            }
                          }}
                          className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="luxury-card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-light">Manage Categories</h2>
            <button 
              onClick={() => setIsAddingCategory(true)}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Description</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{cat.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{cat.description}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setEditingCategory(cat)}
                          className="p-1.5 hover:bg-accent/10 hover:text-accent rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={async () => {
                            if (confirm(`Delete category ${cat.name}? This will not delete items in it.`)) {
                              await deleteCategory(cat.id)
                            }
                          }}
                          className="p-1.5 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category Modal (Add/Edit) */}
      {(isAddingCategory || editingCategory) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card w-full max-w-md p-6 rounded-lg pointer-events-auto shadow-2xl">
            <h3 className="text-lg font-serif mb-4">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const name = formData.get("name") as string
              const description = formData.get("description") as string
              
              if (editingCategory) {
                await updateCategory({ id: editingCategory.id, name, description })
              } else {
                const id = name.toLowerCase().replace(/\s+/g, "-")
                await addCategory({ id, name, description })
              }
              
              setIsAddingCategory(false)
              setEditingCategory(null)
            }} className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Name</label>
                <input 
                  name="name" 
                  defaultValue={editingCategory?.name || ""}
                  required 
                  className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent" 
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Description</label>
                <textarea 
                  name="description" 
                  defaultValue={editingCategory?.description || ""}
                  rows={3} 
                  className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent resize-none" 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setIsAddingCategory(false); setEditingCategory(null); }} className="flex-1 px-4 py-2 border border-border rounded text-sm hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded text-sm hover:opacity-90 transition-opacity">
                  {editingCategory ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal (Add/Edit) */}
      {(isAddingItem || editingItem) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-card w-full max-w-md p-6 rounded-lg pointer-events-auto shadow-2xl my-8">
            <h3 className="text-lg font-serif mb-4">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h3>
            <form onSubmit={async (e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const name = formData.get("name") as string
              
              const itemData: MenuItem = {
                id: editingItem?.id || "item-" + Date.now(),
                name,
                category: formData.get("category") as string,
                price: Number(formData.get("price")),
                description: formData.get("description") as string,
                dietary: formData.get("dietary") as any,
                portion: formData.get("portion") as any,
                pairing: formData.get("pairing") as string,
                image: editingItem?.image || "/placeholder.png",
                isPopular: formData.get("isPopular") === "on",
                chefNote: formData.get("chefNote") as string,
              }
              
              if (editingItem) {
                await updateMenuItem(itemData)
              } else {
                await addMenuItemCtx(itemData)
              }
              
              setIsAddingItem(false)
              setEditingItem(null)
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Name</label>
                  <input name="name" defaultValue={editingItem?.name || ""} required className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Price (₹)</label>
                  <input name="price" type="number" defaultValue={editingItem?.price || ""} required className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent" />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input name="isPopular" type="checkbox" defaultChecked={editingItem?.isPopular} className="w-4 h-4 accent-accent" />
                  <label className="text-xs text-muted-foreground uppercase tracking-wider">Popular</label>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Category</label>
                  <select name="category" defaultValue={editingItem?.category || ""} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent">
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Dietary</label>
                <select name="dietary" defaultValue={editingItem?.dietary || "veg"} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent">
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Portion</label>
                <select name="portion" defaultValue={editingItem?.portion || "regular"} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent">
                  <option value="regular">Regular</option>
                  <option value="light">Light</option>
                  <option value="shareable">Shareable</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Chef Note / Tagline</label>
                <input name="chefNote" defaultValue={editingItem?.chefNote || ""} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Description</label>
                <textarea name="description" defaultValue={editingItem?.description || ""} rows={2} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent resize-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">Pairing</label>
                <input name="pairing" defaultValue={editingItem?.pairing || ""} className="w-full bg-secondary px-3 py-2 rounded border border-border outline-none focus:border-accent" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setIsAddingItem(false); setEditingItem(null); }} className="flex-1 px-4 py-2 border border-border rounded text-sm hover:bg-secondary transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded text-sm hover:opacity-90 transition-opacity">
                  {editingItem ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
