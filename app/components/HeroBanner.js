'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CarouselArrow from './CarouselArrow'
import { DEFAULT_HERO_SLIDES } from '../lib/contentDefaults'

const AUTOPLAY_MS = 6000

/**
 * @param {{ slides?: Array<{ title: string; cta: string; href: string; image: string; alt: string }> }} props
 */
export default function HeroBanner({ slides }) {
  const list = slides?.length ? slides : DEFAULT_HERO_SLIDES
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % list.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, list.length])

  const goTo = (i) => setIndex((i + list.length) % list.length)
  const prev = () => goTo(index - 1)
  const next = () => goTo(index + 1)

  return (
    <section
      className="relative w-full h-[60vw] min-h-[280px] max-h-[560px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      {list.map((slide, i) => (
        <div
          key={`${slide.title}-${i}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20">
            <p className="font-cardo italic text-white text-3xl md:text-7xl leading-none drop-shadow-lg">
              {slide.title}
            </p>
            <Link
              href={slide.href}
              className="font-cardo font-bold text-white text-base md:text-2xl tracking-widest underline underline-offset-[6px] decoration-[1.5px] hover:opacity-80 transition-opacity w-fit mt-3 md:mt-5"
            >
              {slide.cta}
            </Link>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
      >
        <CarouselArrow direction="left" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
      >
        <CarouselArrow direction="right" />
      </button>

      <div className="absolute bottom-3 md:bottom-5 left-0 right-0 flex justify-center gap-2">
        {list.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'w-2 bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
