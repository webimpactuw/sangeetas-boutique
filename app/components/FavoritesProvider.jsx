'use client'

import { FavoritesProvider as Provider } from '../context/FavoritesContext'

export default function FavoritesProvider({
  children,
  userId = null,
  initialFavoriteIds = [],
}) {
  return (
    <Provider userId={userId} initialFavoriteIds={initialFavoriteIds}>
      {children}
    </Provider>
  )
}
