import Image from 'next/image'
import Link from 'next/link'

const jewelryImages = [
  { src: '/images/product-churidar.png', alt: 'Jewelry piece 1' },
  { src: '/images/product-sari.png', alt: 'Jewelry piece 2' },
  { src: '/images/product-lehenga.png', alt: 'Jewelry piece 3' },
]

export default function JewelrySection() {
  return (
    <section id="jewelry" className="bg-sanji-border/30 py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="font-cardo font-bold text-navy text-3xl md:text-6xl mb-4 md:mb-8 tracking-wide">
            Explore Jewelry
          </h2>
          <p className="font-cardo italic text-navy/90 text-base md:text-2xl leading-relaxed mb-6 md:mb-10">
            Explore a curated collection of unique jewelry designed to stand
            out and elevate any look. Each design reflects elegance and
            individuality, creating pieces that are sure to be the talk of any
            event.
          </p>
          <Link
            href="#jewelry"
            className="inline-block font-cardo text-base md:text-xl tracking-wide border border-navy bg-white text-navy rounded-sm px-10 md:px-20 py-2.5 md:py-3 hover:bg-navy hover:text-white transition-colors"
          >
            Shop Now
          </Link>
        </div>

        <div className="md:w-1/2 grid grid-cols-3 gap-3 md:gap-4 w-full">
          {jewelryImages.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] border-2 border-sanji-border overflow-hidden"
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
