'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AccountMenuDrawer from './AccountMenuDrawer'
import SignInDrawer from './SignInDrawer'

const profileIconClass = 'object-contain w-[22px] h-[22px] md:w-9 md:h-9'

/**
 * Header icons: account (profile menu or sign-in) plus cart.
 * @param {{ authUser?: { id: string, displayName: string, initial: string } | null, invert?: boolean }} props
 */
export default function HeaderAuthIcons({ authUser, invert = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [signInOpen, setSignInOpen] = useState(false)
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

      <Link href="/cart" aria-label="Cart" className="hover:opacity-80 transition-opacity">
        <Image
          src="/images/cart-icon-figma.png"
          alt="Cart"
          width={36}
          height={36}
          className={`object-contain w-[22px] h-[22px] md:w-9 md:h-9 ${iconClass}`}
        />
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
