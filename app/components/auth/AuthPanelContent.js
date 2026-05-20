'use client'

import { Suspense } from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

/**
 * @param {{ view: 'signin' | 'signup' | 'forgot', onViewChange: (view: 'signin' | 'signup' | 'forgot') => void }} props
 */
export default function AuthPanelContent({ view, onViewChange }) {
  if (view === 'signup') {
    return <SignupForm onSwitchToSignin={() => onViewChange('signin')} />
  }

  if (view === 'forgot') {
    return <ForgotPasswordForm onSwitchToSignin={() => onViewChange('signin')} />
  }

  return (
    <Suspense fallback={<p className="font-cardo text-navy text-base md:text-lg">Loading…</p>}>
      <LoginForm
        onSwitchToSignup={() => onViewChange('signup')}
        onSwitchToForgot={() => onViewChange('forgot')}
      />
    </Suspense>
  )
}
