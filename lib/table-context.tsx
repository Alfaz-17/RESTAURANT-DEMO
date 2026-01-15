"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface TableContextType {
  tableNumber: string | null
  setTableNumber: (table: string | null) => void
  clearTable: () => void
}

const TableContext = createContext<TableContextType | undefined>(undefined)

export function TableProvider({ children }: { children: React.ReactNode }) {
  const [tableNumber, setTableNumberState] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load table number from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTable = localStorage.getItem("current_table_number")
      if (savedTable) {
        setTableNumberState(savedTable)
      }
      setIsHydrated(true)
    }
  }, [])

  // Save to localStorage whenever it changes
  useEffect(() => {
    if (!isHydrated) return
    
    if (typeof window !== "undefined") {
      if (tableNumber) {
        localStorage.setItem("current_table_number", tableNumber)
      } else {
        localStorage.removeItem("current_table_number")
      }
    }
  }, [tableNumber, isHydrated])

  const setTableNumber = (table: string | null) => {
    setTableNumberState(table)
  }

  const clearTable = () => {
    setTableNumberState(null)
  }

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber, clearTable }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTable() {
  const context = useContext(TableContext)
  if (context === undefined) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}
