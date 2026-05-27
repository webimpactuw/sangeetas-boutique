'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BagIcon from '../BagIcon'
import { useCart } from '../../context/CartContext'
import { useFavorites } from '../../context/FavoritesContext'
import AccountMenuDrawer from './AccountMenuDrawer'
import SignInDrawer from './SignInDrawer'

const profileIconClass = 'object-contain w-[22px] h-[22px] md:w-9 md:h-9'

/**
 * Header icons: account (profile menu or sign-in) plus bag.
 * @param {{ authUser?: { id: string, displayName: string, initial: string } | null, invert?: boolean, compact?: boolean }} props
 * `compact` — mobile header: profile + bag only (no favorites)
 */
export default function HeaderAuthIcons({ authUser, invert = false, compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const { itemCount, hydrated } = useCart()
  const { favoriteCount, hydrated: favoritesHydrated, userId } = useFavorites()
  const iconClass = invert ? 'invert brightness-0' : ''
  const dividerClass = invert ? 'bg-white/50' : 'bg-navy/30'
  const heartClass = invert ? 'text-white' : 'text-navy'

  const profileIcon = (
    <Image
      src="/images/profile-icon.png"
      alt=""
      width={37}
      height={37}
      className={`${profileIconClass} ${iconClass}`}
    />
  )

  return (
    <>
      {authUser ? (
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="hover:opacity-80 transition-opacity"
          aria-label="Open account menu"
        >
          {profileIcon}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setSignInOpen(true)}
          className="hover:opacity-80 transition-opacity"
          aria-label="Sign in to account"
        >
          {profileIcon}
        </button>
      )}

      {!compact && (
        <>
          <div className={`w-px h-5 md:h-8 ${dividerClass}`} />

          <Link
            href={userId ? '/dashboard/favorites' : '/login?redirectTo=/dashboard/favorites'}
            aria-label="Favorites"
            className={`relative hover:opacity-80 transition-opacity ${heartClass}`}
          >
            <svg
              width={22}
              height={22}
              className="w-[22px] h-[22px] md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {favoritesHydrated && userId && favoriteCount > 0 && (
              <span
                className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-cardo font-bold flex items-center justify-center border ${
                  invert
                    ? 'bg-red-600 text-white border-white'
                    : 'bg-red-600 text-white border-navy'
                }`}
              >
                {favoriteCount > 99 ? '99+' : favoriteCount}
              </span>
            )}
          </Link>

          <div className={`w-px h-5 md:h-8 ${dividerClass}`} />
        </>
      )}

      <Link
        href="/cart"
        aria-label="My bag"
        className={`relative hover:opacity-80 transition-opacity ${invert ? 'text-white' : 'text-navy'}`}
      >
        <BagIcon className={`w-[22px] h-[22px] md:w-9 md:h-9 ${iconClass}`} />
        {hydrated && itemCount > 0 && (
          <span
            className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] md:min-w-[22px] md:h-[22px] px-1 rounded-full text-[10px] md:text-xs font-cardo font-bold flex items-center justify-center border ${
              invert
                ? 'bg-red-600 text-white border-white'
                : 'bg-red-600 text-white border-navy'
            }`}
          >
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Link>

      {authUser ? (
        <AccountMenuDrawer
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          authUser={authUser}
        />
      ) : (
        <SignInDrawer open={signInOpen} onClose={() => setSignInOpen(false)} />
      )}
    </>
  )
}
