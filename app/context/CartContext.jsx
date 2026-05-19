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
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return []
    return parseStoredCart(window.localStorage.getItem(CART_STORAGE_KEY))
  })
  const [hydrated, setHydrated] = useState(() => typeof window !== 'undefined')

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
