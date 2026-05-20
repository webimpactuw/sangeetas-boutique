'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DASHBOARD_LINKS } from '@/app/lib/auth/routes'
import UserAvatar from './auth/UserAvatar'

const menuItems = [
  {
    label: 'Apparel',
    href: '/apparel',
    submenu: [
      { label: 'All Apparel', href: '/apparel' },
      { label: 'Women', href: '/apparel?category=women' },
      { label: 'Mens', href: '/apparel?category=mens' },
      { label: 'Kids', href: '/apparel?category=kids' },
    ],
  },
  {
    label: 'Accessories',
    href: '/accessories',
    submenu: [
      { label: 'All Accessories', href: '/accessories' },
      { label: 'Necklaces', href: '/accessories?category=necklaces' },
      { label: 'Earrings', href: '/accessories?category=earrings' },
      { label: 'Bracelets', href: '/accessories?category=bracelets' },
      { label: 'Purses', href: '/accessories?category=purses' },
    ],
  },
  {
    label: 'Booking',
    href: '/booking',
    submenu: null,
  },
  {
    label: 'Gallery',
    href: '/gallery',
    submenu: null,
  },
  {
    label: "About Sanji's",
    href: '/about',
    submenu: null,
  },
]

/**
 * @param {{ isOpen: boolean, onClose: () => void, authUser?: { id: string, email: string | null, displayName: string, initial: string } | null }} props
 */
export default function MobileMenu({ isOpen, onClose, authUser = null }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)

  const handleClose = () => {
    setActiveSubmenu(null)
    onClose()
  }

  const handleItemClick = (item) => {
    if (item.submenu) {
      setActiveSubmenu(item)
    } else {
      handleClose()
    }
  }

  const handleBack = () => {
    setActiveSubmenu(null)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[83vw] max-w-[325px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <Image
            src="/images/logo-nav-small.png"
            alt="Sangeeta's Boutique"
            width={63}
            height={45}
            className="object-contain"
          />
          <button onClick={handleClose} aria-label="Close menu" className="text-navy">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Menu content */}
        <div className="px-5 pt-4">
          <div className="pb-4 mb-2 border-b border-gray-200">
            {authUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <UserAvatar initial={authUser.initial} size="sm" />
                  <span className="font-cardo font-bold text-navy text-xl capitalize">
                    Hi, {authUser.displayName}
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  onClick={handleClose}
                  className="block font-cardo text-navy text-lg hover:underline"
                >
                  My Dashboard
                </Link>
                {DASHBOARD_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClose}
                    className="block font-cardo text-navy text-lg hover:underline"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href="/login"
                onClick={handleClose}
                className="font-cardo text-navy text-xl hover:underline"
              >
                Sign in
              </Link>
            )}
          </div>
          {activeSubmenu === null ? (
            /* Main menu */
            <ul className="flex flex-col">
              {menuItems.map((item, i) => (
                <li key={item.label}>
                  {item.submenu ? (
                    <button
                      onClick={() => handleItemClick(item)}
                      className="flex items-center justify-between w-full py-4 font-cardo text-xl text-black hover:text-navy transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="text-navy text-2xl">&gt;</span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center justify-between w-full py-4 font-cardo text-xl text-black hover:text-navy transition-colors"
                    >
                      <span>{item.label}</span>
                      <span className="text-navy text-2xl">&gt;</span>
                    </Link>
                  )}
                  {i < menuItems.length - 1 && (
                    <div className="border-b border-gray-200" />
                  )}
                </li>
              ))}
            </ul>
          ) : (
            /* Submenu */
            <div>
              {/* Back button */}
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-gray-400 text-sm mb-4 hover:text-gray-600 transition-colors"
              >
                <span>&lt;</span>
                <span className="underline">Back</span>
              </button>

              {/* Submenu title */}
              <h3 className="font-cardo font-bold text-xl text-black mb-4">
                &lt; {activeSubmenu.label.toUpperCase()}
              </h3>

              {/* Submenu items */}
              <ul className="flex flex-col">
                {activeSubmenu.submenu.map((sub, i) => (
                  <li key={sub.label}>
                    <Link
                      href={sub.href}
                      onClick={handleClose}
                      className="flex items-center justify-between w-full py-4 font-cardo text-base text-black hover:text-navy transition-colors"
                    >
                      <span>{sub.label}</span>
                      <span className="text-navy text-2xl">&gt;</span>
                    </Link>
                    {i < activeSubmenu.submenu.length - 1 && (
                      <div className="border-b border-gray-200" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
