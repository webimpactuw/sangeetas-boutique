'use client'

import Link from 'next/link'
import { useState } from 'react'

/**
 * @param {{ label: string; href: string; items: Array<{ label: string; href: string }> }} props
 */
export default function NavDropdown({ label, href, items }) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="hover:underline underline-offset-4 transition-all inline-flex items-center gap-1"
      >
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden className="opacity-70">
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </Link>
      {open && (
        <ul className="absolute left-1/2 -translate-x-1/2 top-full pt-2 min-w-[200px] z-50">
          <li className="bg-white border border-sanji-border shadow-lg rounded-sm py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-5 py-2 font-cardo text-navy text-base hover:bg-cream transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </li>
        </ul>
      )}
    </li>
  )
}
