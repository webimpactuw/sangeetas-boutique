'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useFavorites } from '@/app/context/FavoritesContext'

/**
 * @param {{ products: Array<{ id: string; name: string; price: number; image: string }> }} props
 */
export default function FavoritesView({ products }) {
  const router = useRouter()
  const { toggle, hydrated, favoriteIdsKey } = useFavorites()
  const [error, setError] = useState('')

  const items = useMemo(() => {
    if (!hydrated) return products
    const saved = new Set(favoriteIdsKey ? favoriteIdsKey.split(',') : [])
    return products.filter((p) => saved.has(p.id))
  }, [products, hydrated, favoriteIdsKey])

  const handleRemove = async (productId) => {
    setError('')
    const result = await toggle(productId)

    if (result.needsLogin) {
      router.push(`/login?redirectTo=${encodeURIComponent('/dashboard/favorites')}`)
      return
    }

    if (!result.ok) {
      setError(result.error ?? 'Could not update favorites')
      return
    }

  }

  if (items.length === 0) {
    return (
      <section className="border border-sanji-border rounded-sm p-8 md:p-12 bg-cream text-center">
        <p className="font-cardo text-navy text-lg md:text-xl mb-4">
          You have not saved any favorites yet.
        </p>
        <p className="font-cardo italic text-navy/70 text-sm mb-6">
          Tap the heart on any product while signed in to save it here.
        </p>
        <Link
          href="/apparel"
          className="inline-block font-cardo text-white bg-navy hover:bg-navy/90 transition-colors py-3 px-10 rounded-sm"
        >
          Browse apparel
        </Link>
      </section>
    )
  }

  return (
    <section>
      {error ? (
        <p className="font-cardo text-red-600 text-sm mb-4" role="alert">
          {error}
        </p>
      ) : null}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {items.map((product) => (
          <li
            key={product.id}
            className="flex gap-4 border border-sanji-border bg-light-bg rounded-sm p-4 md:p-5"
          >
            <Link
              href={`/products/${product.id}`}
              className="relative w-24 md:w-28 aspect-[4/5] flex-shrink-0 border border-sanji-border overflow-hidden bg-white"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="120px"
              />
            </Link>
            <div className="flex-1 flex flex-col min-w-0">
              <Link
                href={`/products/${product.id}`}
                className="font-cardo font-bold text-navy text-lg hover:underline truncate"
              >
                {product.name}
              </Link>
              <p className="font-cardo text-navy/80 text-base mt-1">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-auto pt-4 flex flex-wrap gap-3">
                <Link
                  href={`/products/${product.id}`}
                  className="font-cardo text-sm text-navy underline underline-offset-2"
                >
                  View product
                </Link>
                <button
                  type="button"
                  onClick={() => handleRemove(product.id)}
                  className="font-cardo text-sm text-navy/70 hover:text-navy"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
