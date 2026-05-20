'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import {
  authDrawerBodyClass,
  authDrawerButtonClass,
  authDrawerInputClass,
  authDrawerLabelClass,
  authDrawerLinkClass,
  authDrawerTitleClass,
} from './authFormStyles'

/**
 * @param {{ onSwitchToSignin?: () => void }} props
 */
export default function SignupForm({ onSwitchToSignin }) {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        },
      },
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      router.push('/dashboard')
      router.refresh()
      return
    }

    setMessage('Check your email to confirm your account, then sign in.')
  }

  return (
    <div className="max-w-[580px]">
      <h1 className={`${authDrawerTitleClass} mb-4 md:mb-5`}>Sign up</h1>
      <p className={`${authDrawerBodyClass} mb-6 md:mb-8`}>
        Create an account for your Sanji&apos;s Label deals, store information and much more.
      </p>

      <div className="h-px bg-navy/30 mb-6 md:mb-8" />

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div>
          <label htmlFor="firstName" className={authDrawerLabelClass}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={authDrawerInputClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={authDrawerLabelClass}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={authDrawerInputClass}
          />
        </div>
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
        <div>
          <label htmlFor="password" className={authDrawerLabelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="text-center mt-8 md:mt-10">
        {onSwitchToSignin ? (
          <button type="button" onClick={onSwitchToSignin} className={authDrawerLinkClass}>
            Already have an account? Login
          </button>
        ) : (
          <Link href="/login" className={authDrawerLinkClass}>
            Already have an account? Login
          </Link>
        )}
      </p>
    </div>
  )
}
