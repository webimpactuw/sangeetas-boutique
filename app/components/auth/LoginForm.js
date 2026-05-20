'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { DEFAULT_AUTH_REDIRECT } from '@/app/lib/auth/routes'
import { createClient } from '@/app/lib/supabase/client'
import {
  authDrawerBodyClass,
  authDrawerButtonClass,
  authDrawerInputClass,
  authDrawerLabelClass,
  authDrawerLinkClass,
  authDrawerSubtitleClass,
  authDrawerTitleClass,
} from './authFormStyles'

/**
 * @param {{ onSwitchToSignup?: () => void, onSwitchToForgot?: () => void }} props
 */
export default function LoginForm({ onSwitchToSignup, onSwitchToForgot }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || DEFAULT_AUTH_REDIRECT
  const authError = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(
    authError === 'auth_callback' ? 'Sign-in link expired or invalid. Please try again.' : ''
  )
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    router.push(redirectTo)
    router.refresh()
  }

  return (
    <div className="max-w-[580px]">
      <h1 className={`${authDrawerTitleClass} mb-6 md:mb-8`}>Sign in to Account</h1>

      <div className="h-px bg-navy/30 mb-6 md:mb-8" />

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div>
          <label htmlFor="email" className={authDrawerLabelClass}>
            Username
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authDrawerInputClass}
          />
        </div>
        <div>
          <label htmlFor="password" className={authDrawerLabelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authDrawerInputClass}
          />
        </div>
        <p className="text-right -mt-4">
          {onSwitchToForgot ? (
            <button type="button" onClick={onSwitchToForgot} className={authDrawerLinkClass}>
              Forgot your password?
            </button>
          ) : (
            <Link href="/forgot-password" className={authDrawerLinkClass}>
              Forgot your password?
            </Link>
          )}
        </p>
        {error ? (
          <p className="font-cardo text-red-700 text-base md:text-lg" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" disabled={loading} className={authDrawerButtonClass}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <div className="h-px bg-navy/30 my-8 md:my-10" />

      <h2 className={`${authDrawerSubtitleClass} mb-4 md:mb-5`}>Don&apos;t have an account?</h2>
      <p className={`${authDrawerBodyClass} mb-6 md:mb-8`}>
        Create an account for your Sanji&apos;s Label deals, store information and much more.
      </p>
      {onSwitchToSignup ? (
        <button
          type="button"
          onClick={onSwitchToSignup}
          className={`${authDrawerButtonClass} inline-flex items-center justify-center`}
        >
          Create Account
        </button>
      ) : (
        <Link href="/signup" className={`${authDrawerButtonClass} inline-flex items-center justify-center`}>
          Create Account
        </Link>
      )}
    </div>
  )
}
