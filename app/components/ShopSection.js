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
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-3 md:bottom-5 flex flex-col items-center gap-1.5 md:gap-2.5 px-3">
        <span className="font-cardo italic text-white text-base md:text-2xl drop-shadow">
          {cat.name}
        </span>
        <span className="font-cardo text-white text-xs md:text-sm bg-navy/40 backdrop-blur-sm border border-white/70 rounded-sm px-5 md:px-8 py-1 md:py-1.5 group-hover:bg-navy group-hover:border-white transition-colors">
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

      <div className="md:hidden flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
        {cats.map((cat) => (
          <div key={cat.name} className="flex-shrink-0 w-[42vw] max-w-[180px] snap-start">
            <CategoryCard cat={cat} />
          </div>
        ))}
      </div>

      <div className="hidden md:block max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-4 gap-6">
          {cats.map((cat) => (
            <CategoryCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
