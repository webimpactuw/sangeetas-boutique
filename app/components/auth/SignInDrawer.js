'use client'

import { useEffect, useState } from 'react'
import AuthDrawer from './AuthDrawer'
import AuthPanelContent from './AuthPanelContent'

/**
 * Auth drawer overlay on the current page — switches sign-in / sign-up / forgot in place.
 */
export default function SignInDrawer({ open, onClose }) {
  const [view, setView] = useState('signin')

  useEffect(() => {
    if (open) setView('signin')
  }, [open])

  if (!open) return null

  return (
    <AuthDrawer onClose={onClose}>
      <div key={view}>
        <AuthPanelContent view={view} onViewChange={setView} />
      </div>
    </AuthDrawer>
  )
}
