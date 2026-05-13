import { DEFAULT_ELEGANCE } from '../lib/contentDefaults'

/**
 * @param {{ words?: string[]; tagline?: string }} props
 */
export default function EleganceSection({ words, tagline }) {
  const w = words?.filter(Boolean)?.length ? words.filter(Boolean) : DEFAULT_ELEGANCE.words
  const line = w.length >= 3 ? w.slice(0, 3) : DEFAULT_ELEGANCE.words
  const body = tagline?.trim() || DEFAULT_ELEGANCE.tagline

  return (
    <section className="bg-cream py-10 md:py-14 px-6 md:px-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-cardo font-bold text-navy text-xl md:text-3xl tracking-[0.18em] flex items-center justify-center gap-3 md:gap-5 flex-wrap">
          <span>{line[0]}</span>
          <span aria-hidden className="text-navy/60">&bull;</span>
          <span>{line[1]}</span>
          <span aria-hidden className="text-navy/60">&bull;</span>
          <span>{line[2]}</span>
        </h2>
        <p className="mt-4 md:mt-5 font-cardo italic text-navy/80 text-sm md:text-base leading-relaxed">
          {body}
        </p>
      </div>
    </section>
  )
}
