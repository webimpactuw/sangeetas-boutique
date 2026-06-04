'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_FAQ_ITEMS } from '../lib/contentDefaults'

function FaqQuestion({ item }) {
  if (item.questionHighlight) {
    return (
      <>
        {item.questionLead}{' '}
        <em className="italic font-bold">{item.questionHighlight}</em>?
      </>
    )
  }
  return item.question
}

function FaqChevron({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`text-navy/60 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {{ items?: Array<{ id: string; question: string; answer: string; questionLead?: string; questionHighlight?: string }> }} props
 */
function openIdFromHash(list) {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace('#faq-', '')
  return hash && list.some((item) => item.id === hash) ? hash : null
}

export default function FaqSection({ items }) {
  const list = items?.length ? items : DEFAULT_FAQ_ITEMS
  const [openId, setOpenId] = useState(() => openIdFromHash(list))

  useEffect(() => {
    if (!openId) return
    document.getElementById(`faq-${openId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [openId])

  useEffect(() => {
    const onHash = () => setOpenId(openIdFromHash(list))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [list])

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <section id="faq" className="bg-cream py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-cardo font-bold italic text-navy text-3xl md:text-5xl text-center mb-8 md:mb-12">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-3 md:gap-4">
          {list.map((item) => {
            const open = openId === item.id
            return (
              <article
                key={item.id}
                id={`faq-${item.id}`}
                className="bg-white border border-sanji-border rounded-sm overflow-hidden scroll-mt-28"
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 font-cardo font-bold text-navy text-left text-base md:text-lg hover:bg-cream/50 transition-colors"
                >
                  <FaqQuestion item={item} />
                  <FaqChevron open={open} />
                </button>
                {open && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 font-cardo text-navy/85 text-sm md:text-base leading-relaxed border-t border-sanji-border/60">
                    {item.answer}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
