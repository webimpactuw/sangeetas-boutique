const reviews = [
  {
    name: 'Seema Jain',
    text: 'I recently purchased a lehenga from Sanji\u2019s and I was blown away by the craftsmanship. The fit was perfect and the details were stunning.',
  },
  {
    name: 'Vishal Habib',
    text: 'The collection is fabulous, every design is unique and the quality is unmatched. Sanji has a great eye for detail.',
  },
  {
    name: 'Soujanya Vemuri',
    text: 'Sangeeta has a very delightful approach to her clients. She takes the time to understand what you want and delivers beyond expectations.',
  },
  {
    name: 'Shilpa Puranik',
    text: 'Sanji\u2019s label carries a great selection of clothing. I always find something special for every occasion.',
  },
  {
    name: 'Rinku Jain',
    text: 'Elegant collection at reasonable prices. Highly recommend for anyone looking for traditional wear.',
  },
]

export default function ReviewsSection() {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-6 md:mb-12">
        <h2 className="font-cardo font-bold text-navy text-2xl md:text-5xl mb-3 md:mb-5 tracking-wide">
          Customer Reviews
        </h2>
        <p className="font-cardo italic text-navy/80 text-sm md:text-xl max-w-3xl mx-auto leading-relaxed">
          See what our customers are saying. Read real reviews from our
          community on Facebook and discover why people love Sanji&apos;s.
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        <ul className="flex gap-4 md:gap-8 px-6 md:px-12 pb-2">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex-shrink-0 w-[75vw] md:w-[340px] bg-sanji-border/30 border border-sanji-border rounded-md p-5 md:p-7 snap-start"
            >
              <h3 className="font-cardo font-bold text-navy text-base md:text-2xl mb-3">
                {review.name}
              </h3>
              <p className="font-cardo italic text-navy/90 text-sm md:text-base leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
