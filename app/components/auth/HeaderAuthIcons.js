'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BagIcon from '../BagIcon'
import { useCart } from '../../context/CartContext'
import AccountMenuDrawer from './AccountMenuDrawer'
import SignInDrawer from './SignInDrawer'

const profileIconClass = 'object-contain w-[22px] h-[22px] md:w-9 md:h-9'

/**
 * Header icons: account (profile menu or sign-in) plus bag.
 * @param {{ authUser?: { id: string, displayName: string, initial: string } | null, invert?: boolean }} props
 */
export default function HeaderAuthIcons({ authUser, invert = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
  const { itemCount, hydrated } = useCart()
  const iconClass = invert ? 'invert brightness-0' : ''
  const dividerClass = invert ? 'bg-white/50' : 'bg-navy/30'

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

      <div className={`w-px h-5 md:h-8 ${dividerClass}`} />

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
