import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { name: 'Dresses', image: '/images/product-dress.png' },
  { name: 'Lehengas', image: '/images/product-lehenga.png' },
  { name: 'Saris', image: '/images/product-sari.png' },
  { name: 'Kurtas', image: '/images/product-kurta.png' },
]

export default function ShopSection() {
  return (
    <section id="apparel" className="py-8 md:py-12 bg-white">
      {/* Mobile: centered title */}
      <div className="md:hidden text-center mb-6">
        <h2 className="font-cardo font-bold text-navy text-2xl">
          SHOP →
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Desktop: categories sidebar */}
        <div className="hidden md:flex flex-col gap-1 w-48 flex-shrink-0 pt-4">
          <h2 className="font-cardo font-bold text-navy text-3xl mb-2">
            SHOP <span className="font-normal italic">→</span>
          </h2>
          {['Dresses', 'Lehengas', 'Saris', 'Kurtas', 'Churidars'].map((cat) => (
            <Link
              key={cat}
              href={`#${cat.toLowerCase()}`}
              className="font-cardo italic text-navy text-2xl hover:underline transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Product images */}
        {/* Mobile: horizontal scrolling cards with gradient overlays */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`#${cat.name.toLowerCase()}`}
              className="relative flex-shrink-0 w-[45vw] h-[60vw] max-w-[200px] max-h-[280px] border-4 border-sanji-border overflow-hidden snap-center"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
              {/* Category label */}
              <p className="absolute bottom-3 left-0 right-0 text-center font-cardo text-white text-sm tracking-wide">
                {cat.name.toUpperCase()}
              </p>
            </Link>
          ))}
        </div>

        {/* Desktop: grid of product images */}
        <div className="hidden md:grid grid-cols-4 gap-8 flex-1">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`#${cat.name.toLowerCase()}`}
              className="relative h-[350px] border-4 border-sanji-border overflow-hidden group"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
