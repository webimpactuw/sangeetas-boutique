import Image from 'next/image'
import Link from 'next/link'

const jewelryImages = [
  '/images/product-sari.png',
  '/images/product-lehenga.png',
  '/images/product-dress.png',
]

export default function ExploreJewelry() {
  return (
    <section className="bg-cream py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="flex flex-col">
          <h2 className="font-cardo font-bold italic text-navy text-3xl md:text-5xl mb-4 md:mb-6">
            Explore Jewelry
          </h2>
          <p className="font-cardo italic text-navy/80 text-sm md:text-base leading-relaxed max-w-md mb-6 md:mb-8">
            Explore a curated collection of unique jewelry designed to stand out
            and elevate any look. Each design reflects elegance and individuality,
            creating pieces that are sure to be the talk of any event.
          </p>
          <Link
            href="/accessories?category=jewelry"
            className="inline-block w-fit font-cardo text-navy text-sm md:text-base bg-cream-soft border border-navy/80 rounded-sm px-10 md:px-16 py-2.5 md:py-3 hover:bg-navy hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {jewelryImages.map((src, i) => (
            <div key={i} className="relative w-full aspect-[16/7] overflow-hidden">
              <Image
                src={src}
                alt={`Jewelry collection piece ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
