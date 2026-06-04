import Image from 'next/image'
import Link from 'next/link'
import { DEFAULT_SHOP_CATEGORIES } from '../lib/contentDefaults'

function CategoryCard({ cat }) {
  const alt = cat.alt ?? cat.name
  return (
    <Link
      href={cat.href}
      className="relative block w-full aspect-[3/4] overflow-hidden group"
    >
      <Image
        src={cat.image}
        alt={alt}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 42vw, 20vw"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-3 md:bottom-4 lg:bottom-5 flex flex-col items-center gap-1.5 md:gap-2 px-2 md:px-3 z-10">
        <span className="font-cardo italic text-white text-base md:text-lg lg:text-2xl text-center leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
          {cat.name}
        </span>
        <span className="font-cardo text-white text-xs md:text-sm bg-navy/40 backdrop-blur-sm border border-white/70 rounded-sm px-4 md:px-6 lg:px-8 py-1 md:py-1.5 group-hover:bg-navy group-hover:border-white transition-colors">
          View
        </span>
      </div>
    </Link>
  )
}

/**
 * @param {{ heading?: string; categories?: Array<{ name: string; image: string; href: string; alt?: string }> }} props
 */
export default function ShopSection({ heading, categories }) {
  const title = heading?.trim() || 'SHOP BY CATEGORY'
  const cats = categories?.length ? categories : DEFAULT_SHOP_CATEGORIES

  return (
    <section className="bg-white py-10 md:py-16">
      <h2 className="font-cardo font-bold text-navy text-2xl md:text-5xl text-center mb-6 md:mb-12 tracking-wide">
        {title}
      </h2>

      {/* Mobile: swipeable row */}
      <div className="md:hidden flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
        {cats.map((cat) => (
          <div key={cat.name} className="flex-shrink-0 w-[42vw] max-w-[180px] snap-start">
            <CategoryCard cat={cat} />
          </div>
        ))}
      </div>

      {/* Desktop: all 5 categories on one row */}
      <div className="hidden md:grid max-w-7xl mx-auto px-6 lg:px-8 grid-cols-5 gap-3 lg:gap-5">
        {cats.map((cat) => (
          <CategoryCard key={cat.name} cat={cat} />
        ))}
      </div>
    </section>
  )
}
