'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/brand-logo.png'
import { useState } from 'react'
import { DEFAULT_NAVBAR_SHIP_TO } from '../lib/contentDefaults'
import HeaderAuthIcons from './auth/HeaderAuthIcons'
import MobileMenu from './MobileMenu'

/**
 * @param {{ shipToLine?: string, authUser?: { id: string, email: string | null, displayName: string, initial: string } | null }} props
 */
export default function Navbar({ shipToLine, authUser = null }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const shipLine = shipToLine?.trim() || DEFAULT_NAVBAR_SHIP_TO

  return (
    <>
      {/* MOBILE TOP BAR (navy) */}
      <div className="md:hidden bg-navy flex items-center justify-between px-4 py-2">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="26" height="3" fill="white" />
            <rect y="8" width="26" height="3" fill="white" />
            <rect y="16" width="26" height="3" fill="white" />
          </svg>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderAuthIcons authUser={authUser} invert />
        </div>
      </div>

      {/* DESKTOP TOP BAR (thin navy strip with small logo) */}
      <div className="hidden md:block bg-navy py-1 px-4">
        <Image
          src="/images/brand-logo-small.png"
          alt="Sangeeta's Boutique"
          width={40}
          height={28}
          className="object-contain"
        />
      </div>

      {/* WHITE BANNER */}
      <div className="bg-white flex items-center justify-center relative px-4 md:px-10 py-4 md:py-6">
        <p className="hidden md:block absolute top-8 left-10 font-cardo italic text-black text-lg">
          {shipLine}
        </p>

        <Link href="/">
          <Image
            src={logo}
            alt="Sangeeta's Boutique"
            width={250}
            height={250}
            className="object-contain w-[80px] h-[80px] md:w-[200px] md:h-[200px]"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-4 absolute top-8 right-10">
          <HeaderAuthIcons authUser={authUser} />
        </div>
      </div>

      {/* NAVIGATION BAR (desktop only) */}
      <nav className="hidden md:block bg-sanji-border/40">
        <ul className="flex items-center justify-center gap-12 py-3 font-cardo text-navy text-lg tracking-wide">
          <li>
            <Link href="/apparel" className="hover:underline underline-offset-4 transition-all">
              APPAREL
            </Link>
          </li>
          <li>
            <Link href="/accessories" className="hover:underline underline-offset-4 transition-all">
              ACCESSORIES
            </Link>
          </li>
          <li>
            <Link href="/booking" className="hover:underline underline-offset-4 transition-all">
              BOOKING
            </Link>
          </li>
          <li>
            <Link href="/gallery" className="hover:underline underline-offset-4 transition-all">
              GALLERY
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:underline underline-offset-4 transition-all">
              ABOUT SANJI&apos;S
            </Link>
          </li>
        </ul>
      </nav>

      <div className="md:hidden h-2 bg-sanji-border/40" />

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        authUser={authUser}
      />
    </>
  )
}
