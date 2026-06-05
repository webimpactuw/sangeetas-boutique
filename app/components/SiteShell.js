'use client'

import { usePathname } from 'next/navigation'

/**
 * Hides storefront chrome on /studio so Sanity is full-screen for Sanji.
 */
export default function SiteShell({ banner, nav, footer, help, children }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  const isDevPreview = pathname?.startsWith('/dev')

  if (isStudio || isDevPreview) {
    return children
  }

  return (
    <>
      {banner}
      {nav}
      <div className="flex-1">{children}</div>
      {footer}
      {help}
    </>
  )
}
