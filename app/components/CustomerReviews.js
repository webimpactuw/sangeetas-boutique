'use client'

import { useRef } from 'react'
import { DEFAULT_REVIEWS } from '../lib/contentDefaults'

/**
 * @param {{ heading?: string; intro?: string; items?: Array<{ name: string; quote: string }> }} props
 */
export default function CustomerReviews({ heading, intro, items }) {
  const scrollRef = useRef(null)
  const h = heading?.trim() || DEFAULT_REVIEWS.heading
  const p = intro?.trim() || DEFAULT_REVIEWS.intro
  const list = items?.length ? items : DEFAULT_REVIEWS.items

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('article')
    const gap = 16
    const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.85
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const showControls = list.length > 1

  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cardo font-bold text-navy text-3xl md:text-5xl text-center mb-3 md:mb-4">
          {h}
        </h2>
        <p className="font-cardo italic text-navy/70 text-sm md:text-base text-center max-w-2xl mx-auto mb-8 md:mb-12">
          {p}
        </p>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-1 px-1 scroll-smooth md:justify-center"
          >
            {list.map((review, index) => (
              <article
                key={`${review.name}-${index}`}
                className="shrink-0 w-[min(85vw,320px)] md:w-[340px] snap-start bg-navy text-white rounded-sm px-6 md:px-8 py-8 md:py-10 text-center"
              >
                <h3 className="font-cardo font-bold text-xl md:text-2xl mb-3 md:mb-4">
                  {review.name}
                </h3>
                <p className="font-cardo italic text-white/85 text-sm md:text-base leading-relaxed">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </article>
            ))}
          </div>

          {showControls && (
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => scroll(-1)}
                aria-label="Previous reviews"
                className="font-cardo text-navy border border-navy/40 rounded-sm px-4 py-2 hover:bg-navy hover:text-white transition-colors min-w-[44px]"
              >
                &larr;
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                aria-label="Next reviews"
                className="font-cardo text-navy border border-navy/40 rounded-sm px-4 py-2 hover:bg-navy hover:text-white transition-colors min-w-[44px]"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
