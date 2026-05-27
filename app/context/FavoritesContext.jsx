'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toggleFavorite as toggleFavoriteAction } from '../actions/favorites'
import { FAVORITES_TABLE } from '../lib/favorites'
import { createClient } from '../lib/supabase/client'

const FavoritesContext = createContext(null)

async function fetchFavoriteIdsForUser(userId) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from(FAVORITES_TABLE)
    .select('product_id')
    .eq('user_id', userId)

  if (error) {
    console.error('[favorites] client fetch:', error.message)
    return []
  }

  return (data ?? []).map((row) => row.product_id)
}

export function FavoritesProvider({
  children,
  userId: initialUserId = null,
  initialFavoriteIds = [],
}) {
  const [userId, setUserId] = useState(initialUserId)
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(initialFavoriteIds),
  )
  const [hydrated, setHydrated] = useState(true)
  const [busyId, setBusyId] = useState(null)

  useEffect(() => {
    const supabase = createClient()

    const applySession = async (uid) => {
      setUserId(uid)
      if (!uid) {
        setFavoriteIds(new Set())
        setHydrated(true)
        return
      }
      const ids = await fetchFavoriteIdsForUser(uid)
      setFavoriteIds(new Set(ids))
      setHydrated(true)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session?.user?.id ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const isFavorite = useCallback(
    (productId) => favoriteIds.has(productId),
    [favoriteIds],
  )

  const toggle = useCallback(
    async (productId) => {
      if (!userId) {
        return { ok: false, needsLogin: true }
      }

      const wasFavorited = favoriteIds.has(productId)
      setBusyId(productId)

      setFavoriteIds((prev) => {
        const next = new Set(prev)
        if (wasFavorited) next.delete(productId)
        else next.add(productId)
        return next
      })

      const result = await toggleFavoriteAction(productId)
      setBusyId(null)

      if (!result.ok) {
        setFavoriteIds((prev) => {
          const next = new Set(prev)
          if (wasFavorited) next.add(productId)
          else next.delete(productId)
          return next
        })
        return { ok: false, error: result.error }
      }

      setFavoriteIds((prev) => {
        const next = new Set(prev)
        if (result.favorited) next.add(productId)
        else next.delete(productId)
        return next
      })

      return { ok: true, favorited: result.favorited }
    },
    [userId, favoriteIds],
  )

  const favoriteIdsKey = [...favoriteIds].sort().join(',')

  const value = useMemo(
    () => ({
      userId,
      hydrated,
      busyId,
      favoriteCount: favoriteIds.size,
      favoriteIdsKey,
      isFavorite,
      toggle,
    }),
    [userId, hydrated, busyId, favoriteIds.size, favoriteIdsKey, isFavorite, toggle],
  )

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return ctx
}
