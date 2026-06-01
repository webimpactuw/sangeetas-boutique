'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import BagIcon from '../../components/BagIcon'
import FavoriteButton from '../../components/FavoriteButton'
import ProductCard from '../../components/ProductCard'
import { useCart } from '../../context/CartContext'

const COLOR_SWATCHES = {
  Blue: '#1e3a5f',
  Red: '#8b2635',
  Green: '#2d5a3d',
  Cream: '#f6f3ef',
  Gold: '#c9a227',
  Black: '#1a1a1a',
  White: '#ffffff',
}

/**
 * @param {{ product: object; related?: object[] }} props
 */
export default function ProductDetail({ product, related = [] }) {
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const gallery = product.images?.length ? product.images : [product.image]
  const mainSrc = gallery[activeImage] ?? product.image

  const dec = () => setQuantity((q) => Math.max(1, q - 1))
  const inc = () => setQuantity((q) => Math.min(99, q + 1))

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color,
      size,
      quantity,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div>
          <div className="relative w-full aspect-[4/5] border border-sanji-border bg-light-bg mb-4">
            <Image
              src={mainSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {gallery.length > 1 ? (
          <div className="grid grid-cols-4 gap-3">
            {gallery.slice(0, 4).map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative w-full aspect-square border overflow-hidden transition-all ${
                  activeImage === i
                    ? 'border-navy ring-2 ring-navy/30'
                    : 'border-sanji-border hover:border-navy/60'
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  fill
                  className={`object-cover ${activeImage === i ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                  sizes="120px"
                />
              </button>
            ))}
          </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <h1 className="font-cardo font-bold italic text-navy text-3xl md:text-5xl mb-2 md:mb-3">
            {product.name}
          </h1>
          <p className="font-cardo text-navy text-xl md:text-2xl mb-6 md:mb-8">
            Price: ${product.price.toFixed(2)}
          </p>

          <div className="border-t border-sanji-border pt-5 md:pt-6 mb-5 md:mb-6">
            <p className="font-cardo text-navy text-base md:text-lg mb-3">
              Color: <span className="italic">{color}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => {
                const swatch = COLOR_SWATCHES[c] ?? '#d1d5db'
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    title={c}
                    aria-label={`Color ${c}`}
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-sm border-2 transition-all ${
                      c === color ? 'border-navy scale-105' : 'border-navy/25 hover:border-navy/60'
                    }`}
                    style={{ backgroundColor: swatch }}
                  />
                )
              })}
            </div>
          </div>

          <div className="mb-5 md:mb-6">
            <p className="font-cardo text-navy text-base md:text-lg mb-3">
              Size: <span className="italic">{size}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`font-cardo text-sm md:text-base w-12 md:w-14 py-1.5 border rounded-sm transition-colors ${
                    s === size
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy border-navy/40 hover:border-navy'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <p className="font-cardo text-navy text-base md:text-lg mb-3">Quantity:</p>
            <div className="inline-flex items-center border border-navy/40 rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={dec}
                aria-label="Decrease quantity"
                className="w-10 md:w-12 h-10 md:h-12 font-cardo text-navy text-xl hover:bg-navy hover:text-white transition-colors"
              >
                &minus;
              </button>
              <span className="w-12 md:w-14 text-center font-cardo text-navy text-lg">{quantity}</span>
              <button
                type="button"
                onClick={inc}
                aria-label="Increase quantity"
                className="w-10 md:w-12 h-10 md:h-12 font-cardo text-navy text-xl hover:bg-navy hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-3 mb-6 md:mb-8">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 px-8 rounded-sm flex items-center justify-center gap-3"
            >
              <BagIcon className="w-5 h-5" light />
              {added ? 'Added to bag!' : 'Add to Bag'}
            </button>
            <FavoriteButton productId={product.id} variant="pdp" />
          </div>

          <div className="border-t border-sanji-border pt-5 md:pt-6">
            <h2 className="font-cardo font-bold text-navy text-base md:text-lg mb-2 md:mb-3">
              Product Details
            </h2>
            <p className="font-cardo italic text-navy/75 text-sm md:text-base leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14 md:mt-20 border-t border-sanji-border pt-10 md:pt-14">
          <h2 className="font-cardo font-bold italic text-navy text-2xl md:text-4xl mb-6 md:mb-8">
            Customers Also Bought
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
