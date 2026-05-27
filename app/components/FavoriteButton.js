'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useFavorites } from '../context/FavoritesContext'

/**
 * @param {{
 *   productId: string
 *   variant?: 'overlay' | 'pdp'
 *   className?: string
 * }} props
 */
export default function FavoriteButton({
  productId,
  variant = 'overlay',
  className = '',
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { userId, isFavorite, toggle, busyId, hydrated } = useFavorites()

  const favorited = hydrated && isFavorite(productId)
  const busy = busyId === productId

  const handleClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!userId) {
      const next = pathname.startsWith('/products/')
        ? pathname
        : `/products/${productId}`
      router.push(`/login?redirectTo=${encodeURIComponent(next)}`)
      return
    }

    await toggle(productId)
  }

  const base =
    variant === 'pdp'
      ? `w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-colors disabled:opacity-60 ${
          favorited
            ? 'bg-navy text-white border-navy'
            : 'bg-white text-navy border-navy/40 hover:border-navy'
        }`
      : `w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center shadow-sm transition-colors disabled:opacity-60 ${
          favorited
            ? 'bg-navy text-white border-navy'
            : 'bg-white/95 text-navy border-white/80 hover:border-navy'
        }`

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={favorited}
      className={`${base} ${className}`.trim()}
    >
      <svg
        width={variant === 'pdp' ? 22 : 18}
        height={variant === 'pdp' ? 22 : 18}
        viewBox="0 0 24 24"
        fill={favorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
