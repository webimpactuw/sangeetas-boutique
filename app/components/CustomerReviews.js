import { DEFAULT_REVIEWS } from '../lib/contentDefaults'

/**
 * @param {{ heading?: string; intro?: string; items?: Array<{ name: string; quote: string }> }} props
 */
export default function CustomerReviews({ heading, intro, items }) {
  const h = heading?.trim() || DEFAULT_REVIEWS.heading
  const p = intro?.trim() || DEFAULT_REVIEWS.intro
  const list = items?.length ? items : DEFAULT_REVIEWS.items

  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cardo font-bold text-navy text-3xl md:text-5xl text-center mb-3 md:mb-4">
          {h}
        </h2>
        <p className="font-cardo italic text-navy/70 text-sm md:text-base text-center max-w-2xl mx-auto mb-8 md:mb-12">
          {p}
        </p>

        <div className="bg-navy text-white rounded-sm px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {list.map((review) => (
            <article key={review.name} className="flex flex-col">
              <h3 className="font-cardo font-bold text-xl md:text-2xl mb-3 md:mb-4">
                {review.name}
              </h3>
              <p className="font-cardo italic text-white/85 text-sm md:text-base leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
