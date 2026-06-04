'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/brand-logo.png'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  NAV_ACCESSORIES_LINKS,
  NAV_APPAREL_LINKS,
} from '../lib/contentDefaults'
import HeaderAuthIcons from './auth/HeaderAuthIcons'
import MobileMenu from './MobileMenu'
import NavDropdown from './NavDropdown'

function SearchIcon({ className = 'text-navy' }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" strokeLinecap="round" />
    </svg>
  )
}

/**
 * @param {{ authUser?: { id: string, email: string | null, displayName: string, initial: string } | null }} props
 */
export default function Navbar({ authUser = null }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlQuery = searchParams.get('q') ?? ''

  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  useEffect(() => {
    if (
      pathname === '/search' ||
      pathname === '/apparel' ||
      pathname === '/accessories'
    ) {
      setSearchQuery(urlQuery)
      if (urlQuery) setMobileSearchOpen(true)
    }
  }, [pathname, urlQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    setMobileSearchOpen(false)
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <>
      {/* Mobile: single white header row (below TopBanner) */}
      <div className="md:hidden bg-white border-b border-navy/10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] relative z-20">
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-1 hover:opacity-80 transition-opacity shrink-0"
            aria-label="Open menu"
          >
            <svg width="24" height="18" viewBox="0 0 26 20" fill="none" aria-hidden>
              <rect width="26" height="3" className="fill-navy" />
              <rect y="8" width="26" height="3" className="fill-navy" />
              <rect y="16" width="26" height="3" className="fill-navy" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMobileSearchOpen((open) => !open)}
            className="p-1 hover:opacity-80 transition-opacity shrink-0 text-navy"
            aria-label={mobileSearchOpen ? 'Close search' : 'Open search'}
            aria-expanded={mobileSearchOpen}
          >
            <SearchIcon />
          </button>

          <Link href="/" className="flex-1 flex justify-center min-w-0">
            <Image
              src={logo}
              alt="Sanji's Label"
              width={120}
              height={120}
              className="object-contain w-12 h-12"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <HeaderAuthIcons authUser={authUser} />
          </div>
        </div>

        {mobileSearchOpen && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 px-3 pb-3 border-t border-navy/10 pt-2"
            role="search"
          >
            <SearchIcon className="text-navy shrink-0" />
            <input
              type="search"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apparel & accessories"
              autoFocus
              className="font-cardo italic text-navy text-base bg-transparent border-0 border-b border-[#d1d5db] focus:border-navy/40 p-0 pb-1 focus:outline-none focus:ring-0 w-full placeholder:text-navy/60 placeholder:italic"
              aria-label="Search products"
            />
          </form>
        )}
      </div>

      {/* Desktop: logo row + nav links */}
      <div className="hidden md:grid bg-white grid-cols-[1fr_auto_1fr] items-center px-10 py-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-20">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2.5 border-b border-[#d1d5db] focus-within:border-navy/40 pb-1 min-w-[160px] max-w-[240px] transition-colors justify-self-start self-center"
          role="search"
        >
          <SearchIcon />
          <input
            type="search"
            name="q"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="font-cardo italic text-navy text-xl bg-transparent border-0 p-0 focus:outline-none focus:ring-0 w-full min-w-[100px] placeholder:text-navy placeholder:italic"
            aria-label="Search products"
          />
        </form>
        <Link href="/" className="justify-self-center">
          <Image
            src={logo}
            alt="Sangeeta's Boutique"
            width={250}
            height={250}
            className="object-contain w-[200px] h-[200px]"
            priority
          />
        </Link>
        <div className="flex items-center gap-4 justify-self-end self-center">
          <HeaderAuthIcons authUser={authUser} />
        </div>
      </div>

      <nav className="hidden md:block bg-cream shadow-[0_2px_8px_rgba(0,0,0,0.1)] relative z-10">
        <ul className="flex items-center justify-center gap-12 py-3 font-cardo text-navy text-lg tracking-wide">
          <NavDropdown label="APPAREL" href="/apparel" items={NAV_APPAREL_LINKS} />
          <NavDropdown label="ACCESSORIES" href="/accessories" items={NAV_ACCESSORIES_LINKS} />
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

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        authUser={authUser}
      />
    </>
  )
}
