'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const PAGE_SIZE = 9

export default function CatalogView({ title, description, products, categories, basePath }) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter((p) => p.category === activeCategory)
  }, [products, activeCategory])

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  return (
    <main className="bg-white py-10 md:py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-cardo font-bold italic text-navy text-5xl md:text-7xl mb-3 md:mb-4">
            {title}
          </h1>
          {description && (
            <p className="font-cardo italic text-navy/75 text-sm md:text-base max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </header>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 md:mb-10 scrollbar-hide snap-x snap-mandatory">
          <button
            onClick={() => {
              setActiveCategory('all')
              setPage(1)
            }}
            className={`flex-shrink-0 snap-start font-cardo text-sm md:text-base px-5 md:px-7 py-2 md:py-2.5 rounded-sm border transition-colors ${
              activeCategory === 'all'
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-navy border-navy/40 hover:border-navy'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setPage(1)
              }}
              className={`flex-shrink-0 snap-start font-cardo text-sm md:text-base px-5 md:px-7 py-2 md:py-2.5 rounded-sm border transition-colors ${
                activeCategory === cat.id
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy border-navy/40 hover:border-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
          {visible.map((product) => (
            <Link
              key={product.id}
              href={`${basePath}/${product.id}`}
              className="group flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden border border-sanji-border bg-light-bg mb-2 md:mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-cardo text-navy text-sm md:text-base">
                {product.name}
              </h3>
              <p className="font-cardo italic text-navy/70 text-xs md:text-sm">
                ${product.price.toFixed(2)}
              </p>
            </Link>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="font-cardo italic text-navy/60 text-center py-16">
            No products in this category yet.
          </p>
        )}

        {hasMore && (
          <div className="flex justify-center mt-10 md:mt-14">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="font-cardo text-navy text-sm md:text-base border border-navy rounded-sm px-10 md:px-14 py-2.5 md:py-3 hover:bg-navy hover:text-white transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
