'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createClient } from '../lib/supabase/client'
import {
  GUEST_CART_STORAGE_KEY,
  addOrUpdateItem,
  cartItemCount,
  getCartStorageKey,
  parseStoredCart,
  removeItemById,
  updateItemQuantity,
} from '../lib/cart'

const CartContext = createContext(null)

function readCart(key) {
  if (typeof window === 'undefined') return []
  return parseStoredCart(window.localStorage.getItem(key))
}

function writeCart(key, items) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(items))
}

function mergeCarts(primary, secondary) {
  return secondary.reduce(
    (acc, item) =>
      addOrUpdateItem(acc, {
        productId: item.productId,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        image: item.image,
      }),
    primary,
  )
}

export function CartProvider({ children, userId: initialUserId = null }) {
  const [userId, setUserId] = useState(initialUserId)
  const [items, setItems] = useState([])
  const [hydrated, setHydrated] = useState(false)
  const storageKeyRef = useRef(getCartStorageKey(initialUserId))

  useEffect(() => {
    setUserId(initialUserId)
  }, [initialUserId])

  useEffect(() => {
    const key = getCartStorageKey(userId)
    storageKeyRef.current = key
    setItems(readCart(key))
    setHydrated(true)
  }, [userId])

  useEffect(() => {
    const supabase = createClient()
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextId = session?.user?.id ?? null
      setUserId((prev) => {
        if (prev === nextId) return prev

        const guestItems = readCart(GUEST_CART_STORAGE_KEY)
        const userKey = getCartStorageKey(nextId)

        if (nextId && guestItems.length) {
          const userItems = readCart(userKey)
          const merged = mergeCarts(userItems, guestItems)
          writeCart(userKey, merged)
          writeCart(GUEST_CART_STORAGE_KEY, [])
          setItems(merged)
          storageKeyRef.current = userKey
          return nextId
        }

        if (!nextId) {
          setItems(readCart(GUEST_CART_STORAGE_KEY))
          storageKeyRef.current = GUEST_CART_STORAGE_KEY
        }

        return nextId
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeCart(storageKeyRef.current, items)
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
      userId,
      itemCount: cartItemCount(items),
      addItem,
      changeQuantity,
      removeItem,
      clearCart,
    }),
    [items, hydrated, userId, addItem, changeQuantity, removeItem, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
