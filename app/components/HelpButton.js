'use client'

import { useState } from 'react'
import { DEFAULT_HELP } from '../lib/contentDefaults'

function formatTel(phone) {
  return phone.replace(/\D/g, '')
}

/**
 * @param {{ title?: string; ctaLabel?: string; phone?: string }} props
 */
export default function HelpButton({ title, ctaLabel, phone }) {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('help-dismissed') === 'true'
  })
  const [expanded, setExpanded] = useState(false)

  const t = title?.trim() || DEFAULT_HELP.title
  const cta = ctaLabel?.trim() || DEFAULT_HELP.ctaLabel
  const ph = phone?.trim() || DEFAULT_HELP.phone
  const telHref = `tel:+1${formatTel(ph)}`

  const dismiss = () => {
    setDismissed(true)
    setExpanded(false)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('help-dismissed', 'true')
    }
  }

  if (dismissed) return null

  return (
    <div className="fixed bottom-5 right-4 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3">
      {expanded && (
        <div
          className="relative bg-navy text-white rounded-md shadow-2xl pl-4 pr-8 py-3 md:pl-5 md:pr-9 md:py-4 max-w-[240px]"
          role="dialog"
          aria-label="Contact Sanji"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss help"
            className="absolute top-1 right-1.5 w-5 h-5 flex items-center justify-center text-white/80 hover:text-white text-base leading-none"
          >
            &times;
          </button>
          <p className="font-cardo text-sm md:text-base font-bold mb-1">{t}</p>
          <a
            href={telHref}
            className="font-cardo text-sm md:text-base underline underline-offset-2 hover:no-underline block"
          >
            {cta}
          </a>
          <p className="font-cardo text-xs md:text-sm mt-2 text-white/90">{ph}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-label={expanded ? 'Close help menu' : 'Open help menu'}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-navy text-white flex items-center justify-center shadow-2xl hover:bg-navy/90 transition-colors"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
    </div>
  )
}
