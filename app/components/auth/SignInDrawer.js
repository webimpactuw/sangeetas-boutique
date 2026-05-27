'use client'

import { useState } from 'react'
import AuthDrawer from './AuthDrawer'
import AuthPanelContent from './AuthPanelContent'

function SignInDrawerPanel({ onClose }) {
  const [view, setView] = useState('signin')

  return (
    <AuthDrawer onClose={onClose}>
      <div key={view}>
        <AuthPanelContent view={view} onViewChange={setView} />
      </div>
    </AuthDrawer>
  )
}

/**
 * Auth drawer overlay on the current page — switches sign-in / sign-up / forgot in place.
 */
export default function SignInDrawer({ open, onClose }) {
  if (!open) return null
  return <SignInDrawerPanel onClose={onClose} />
}
