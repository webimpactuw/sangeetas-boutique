'use client'

import Link from 'next/link'
import { signOut } from '@/app/actions/auth'
import { DASHBOARD_LINKS } from '@/app/lib/auth/routes'
import AuthDrawer from './AuthDrawer'
import UserAvatar from './UserAvatar'

const MENU_LINKS = [
  { href: '/dashboard', label: 'My Dashboard' },
  ...DASHBOARD_LINKS,
]

/**
 * @param {{ open: boolean, onClose: () => void, authUser: { displayName: string, initial: string } }} props
 */
export default function AccountMenuDrawer({ open, onClose, authUser }) {
  if (!open) return null

  return (
    <AuthDrawer onClose={onClose}>
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <UserAvatar initial={authUser.initial} size="md" />
        <h2 className="font-cardo font-bold text-navy text-2xl md:text-4xl leading-tight capitalize">
          Hi, {authUser.displayName}
        </h2>
      </div>

      <nav aria-label="Account menu" className="space-y-1 md:space-y-1.5 mb-8 md:mb-10">
        {MENU_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block font-cardo text-navy text-lg md:text-2xl py-2 hover:opacity-80 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <form action={signOut}>
        <button
          type="submit"
          className="block w-full text-center font-cardo text-white text-base md:text-2xl bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 rounded-sm"
        >
          Sign out
        </button>
      </form>
    </AuthDrawer>
  )
}
