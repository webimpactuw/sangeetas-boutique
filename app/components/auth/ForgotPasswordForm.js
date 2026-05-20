'use client'

import Link from 'next/link'
import { useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import {
  authDrawerButtonClass,
  authDrawerInputClass,
  authDrawerLabelClass,
  authDrawerLinkClass,
  authDrawerTitleClass,
} from './authFormStyles'

/**
 * @param {{ onSwitchToSignin?: () => void }} props
 */
export default function ForgotPasswordForm({ onSwitchToSignin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const supabase = createClient()
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${origin}/auth/callback?next=/dashboard/manage-account`,
    })

    setLoading(false)

    if (resetError) {
      setError(resetError.message)
      return
    }

    setMessage('If an account exists for that email, you will receive a reset link shortly.')
  }

  return (
    <div className="max-w-[580px]">
      <h1 className={`${authDrawerTitleClass} mb-6 md:mb-8`}>Reset password</h1>
      <div className="h-px bg-navy/30 mb-6 md:mb-8" />

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div>
          <label htmlFor="email" className={authDrawerLabelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authDrawerInputClass}
          />
        </div>
        {error ? (
          <p className="font-cardo text-red-700 text-base md:text-lg" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="font-cardo text-navy text-base md:text-lg" role="status">
            {message}
          </p>
        ) : null}
        <button type="submit" disabled={loading} className={authDrawerButtonClass}>
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="text-center mt-8 md:mt-10">
        {onSwitchToSignin ? (
          <button type="button" onClick={onSwitchToSignin} className={authDrawerLinkClass}>
            Back to sign in
          </button>
        ) : (
          <Link href="/login" className={authDrawerLinkClass}>
            Back to sign in
          </Link>
        )}
      </p>
    </div>
  )
}
