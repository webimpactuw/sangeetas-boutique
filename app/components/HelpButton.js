'use client'

import { useState } from 'react'
import { DEFAULT_HELP } from '../lib/contentDefaults'

/**
 * @param {{ title?: string; ctaLabel?: string; email?: string }} props
 */
export default function HelpButton({ title, ctaLabel, email }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('help-dismissed') !== 'true'
  })

  const t = title?.trim() || DEFAULT_HELP.title
  const cta = ctaLabel?.trim() || DEFAULT_HELP.ctaLabel
  const em = email?.trim() || DEFAULT_HELP.email

  const dismiss = () => {
    setVisible(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('help-dismissed', 'true')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-5 right-4 md:bottom-8 md:right-8 z-40">
      <div className="relative bg-navy text-white rounded-md shadow-xl pl-4 pr-7 py-2.5 md:pl-5 md:pr-8 md:py-3">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss help button"
          className="absolute top-1 right-1.5 md:top-1.5 md:right-2 w-5 h-5 flex items-center justify-center text-white/80 hover:text-white text-base leading-none rounded-full hover:bg-white/10 transition-colors"
        >
          &times;
        </button>
        <a
          href={`mailto:${em}`}
          className="block font-cardo text-xs md:text-sm leading-tight"
        >
          <span className="block">{t}</span>
          <span className="block underline underline-offset-2 hover:no-underline">
            {cta}
          </span>
        </a>
      </div>
    </div>
  )
}
