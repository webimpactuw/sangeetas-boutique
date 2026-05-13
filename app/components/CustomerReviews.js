const reviews = [
  {
    name: 'Seema Jain',
    quote:
      'I recently purchased a lehenga from Sanji. She was amazing to work with. She has a beautiful collection and was very helpful in selecting what was right for me.',
  },
  {
    name: 'Vishal Habib',
    quote:
      'The collection is fabulous, every dress in the boutique has its touch of elegance. Highly recommend.',
  },
  {
    name: 'Soujanya Vemuri',
    quote:
      'Sangeeta has a very delightful and unique collection of Indian wear for all. She is also very diligent about helping you style your costumes with the right accessories and is your personal stylist!',
  },
]

export default function CustomerReviews() {
  return (
    <section className="bg-white py-12 md:py-20 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-cardo font-bold text-navy text-3xl md:text-5xl text-center mb-3 md:mb-4">
          Customer Reviews
        </h2>
        <p className="font-cardo italic text-navy/70 text-sm md:text-base text-center max-w-2xl mx-auto mb-8 md:mb-12">
          See what our customers are saying. Read real reviews from our community
          on Facebook and discover why people love Sanji&rsquo;s.
        </p>

        <div className="bg-navy text-white rounded-sm px-6 md:px-10 py-8 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {reviews.map((review) => (
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
