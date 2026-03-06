'use client'

import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/brand-logo.png'
import { useState } from 'react'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* MOBILE TOP BAR (navy) */}
      <div className="md:hidden bg-navy flex items-center justify-between px-4 py-2">
        {/* Hamburger menu */}
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

        {/* Search & Cart */}
        <div className="flex items-center gap-3">
          <button aria-label="Search" className="hover:opacity-80 transition-opacity">
            <Image src="/images/search-icon-blue.png" alt="Search" width={22} height={22} className="object-contain invert brightness-0" />
          </button>
          <div className="w-px h-5 bg-white/50" />
          <Link href="#cart" aria-label="Cart" className="hover:opacity-80 transition-opacity">
            <Image src="/images/cart-icon-figma.png" alt="Cart" width={22} height={22} className="object-contain invert brightness-0" />
          </Link>
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

      {/* WHITE BANNER (logo center, Ship To left on desktop, icons right on desktop) */}
      <div className="bg-white flex items-center justify-center relative px-4 md:px-10 py-4 md:py-6">
        {/* Desktop: Ship To text (left) */}
        <p className="hidden md:block absolute top-8 left-10 font-cardo italic text-black text-lg">
          Ship To: Issaquah, WA
        </p>

        {/* Brand logo (centered) */}
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

        {/* Desktop: Search & Cart icons (right) */}
        <div className="hidden md:flex items-center gap-3 absolute top-8 right-10">
          <button aria-label="Search" className="hover:opacity-80 transition-opacity">
            <Image src="/images/search-icon-blue.png" alt="Search" width={36} height={36} className="object-contain" />
          </button>
          <div className="w-px h-8 bg-navy/30" />
          <Link href="#cart" aria-label="Cart" className="hover:opacity-80 transition-opacity">
            <Image src="/images/cart-icon-figma.png" alt="Cart" width={36} height={36} className="object-contain" />
          </Link>
        </div>
      </div>

      {/* NAVIGATION BAR (desktop only, light blue-grey) */}
      <nav className="hidden md:block bg-sanji-border/40">
        <ul className="flex items-center justify-center gap-12 py-3 font-cardo text-navy text-lg tracking-wide">
          <li>
            <Link href="#apparel" className="hover:underline underline-offset-4 transition-all">
              APPAREL
            </Link>
          </li>
          <li>
            <Link href="#accessories" className="hover:underline underline-offset-4 transition-all">
              ACCESSORIES
            </Link>
          </li>
          <li>
            <Link href="#booking" className="hover:underline underline-offset-4 transition-all">
              BOOKING
            </Link>
          </li>
          <li>
            <Link href="#gallery" className="hover:underline underline-offset-4 transition-all">
              GALLERY
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:underline underline-offset-4 transition-all">
              ABOUT SANGEETA&apos;S
            </Link>
          </li>
        </ul>
      </nav>

      {/* MOBILE NAV SEPARATOR (same color as desktop nav bar) */}
      <div className="md:hidden h-2 bg-sanji-border/40" />

      {/* Mobile slide-out menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
