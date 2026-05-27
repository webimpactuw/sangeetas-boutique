import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'

/**
 * @param {{
 *   product: { id: string; name: string; price: number; image: string }
 *   basePath?: string
 * }} props
 */
export default function ProductCard({ product, basePath = '/products' }) {
  const href = `${basePath}/${product.id}`

  return (
    <article className="group flex flex-col">
      <div className="relative w-full aspect-[4/5] overflow-hidden border border-sanji-border bg-light-bg mb-2 md:mb-3">
        <Link href={href} className="block absolute inset-0 z-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </Link>
        <FavoriteButton
          productId={product.id}
          variant="overlay"
          className="absolute top-2 right-2 z-10"
        />
      </div>
      <Link href={href} className="flex flex-col">
        <h3 className="font-cardo text-navy text-sm md:text-base">{product.name}</h3>
        <p className="font-cardo italic text-navy/70 text-xs md:text-sm">
          ${product.price.toFixed(2)}
        </p>
      </Link>
    </article>
  )
}
