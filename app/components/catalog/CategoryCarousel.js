'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import CarouselArrow from '../CarouselArrow'
import { CATEGORY_IMAGES } from '../../lib/products'

/**
 * @param {{
 *   categories: Array<{ id: string; label: string }>
 *   activeIds: string[]
 *   onSelect: (categoryId: string | null) => void
 * }} props
 */
export default function CategoryCarousel({ categories, activeIds, onSelect }) {
  const scrollRef = useRef(null)
  const [activeDot, setActiveDot] = useState(0)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-carousel-card]')
    const amount = card ? card.clientWidth + 16 : 280
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector('[data-carousel-card]')
    const step = card ? card.clientWidth + 16 : 280
    setActiveDot(Math.round(el.scrollLeft / step))
  }

  const isActive = (id) => activeIds.length === 1 && activeIds[0] === id

  return (
    <section className="mb-8 md:mb-10">
      <div className="relative">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous categories"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 text-navy hover:opacity-70 transition-opacity"
        >
          <CarouselArrow direction="left" />
        </button>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1 md:px-12 pb-2"
        >
          {categories.map((cat) => {
            const image = CATEGORY_IMAGES[cat.id] ?? '/images/product-sari.png'
            const selected = isActive(cat.id)
            return (
              <button
                key={cat.id}
                type="button"
                data-carousel-card
                onClick={() => onSelect(selected ? null : cat.id)}
                className="flex-shrink-0 w-[42vw] max-w-[200px] md:w-[220px] snap-start text-left group focus:outline-none"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden mb-2">
                  <Image
                    src={image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="220px"
                  />
                </div>
                <div className="flex justify-center">
                  <span
                    className={`font-cardo italic text-navy text-lg md:text-xl transition-colors ${
                      selected
                        ? 'border border-navy rounded-full px-4 md:px-5 py-0.5 md:py-1'
                        : ''
                    }`}
                  >
                    {cat.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next categories"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 text-navy hover:opacity-70 transition-opacity"
        >
          <CarouselArrow direction="right" />
        </button>
      </div>

      <div className="flex justify-center gap-1.5 mt-4">
        {categories.map((cat, i) => (
          <span
            key={cat.id}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === activeDot ? 'bg-navy' : 'bg-navy/25'
            }`}
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}
