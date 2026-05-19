'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  CART_STORAGE_KEY,
  addOrUpdateItem,
  cartItemCount,
  parseStoredCart,
  removeItemById,
  updateItemQuantity,
} from '../lib/cart'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(CART_STORAGE_KEY) : null
    setItems(parseStoredCart(stored))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((incoming) => {
    setItems((prev) => addOrUpdateItem(prev, incoming))
  }, [])

  const changeQuantity = useCallback((id, delta) => {
    setItems((prev) => updateItemQuantity(prev, id, delta))
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => removeItemById(prev, id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount: cartItemCount(items),
      addItem,
      changeQuantity,
      removeItem,
      clearCart,
    }),
    [items, hydrated, addItem, changeQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
