'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '../../context/CartContext'

export default function ProductDetail({ product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0])
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      <div>
        <div className="relative w-full aspect-[4/5] border border-sanji-border bg-light-bg mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative w-full aspect-square border border-sanji-border bg-light-bg"
            >
              <Image
                src={product.image}
                alt={`${product.name} thumbnail ${i + 1}`}
                fill
                className="object-cover opacity-80"
                sizes="120px"
              />
            </div>
          ))}
        </div>
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
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`font-cardo text-sm md:text-base px-4 py-1.5 border rounded-sm transition-colors ${
                  c === color
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-navy border-navy/40 hover:border-navy'
                }`}
              >
                {c}
              </button>
            ))}
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
          <p className="font-cardo text-navy text-base md:text-lg mb-3">
            Quantity:
          </p>
          <div className="inline-flex items-center border border-navy/40 rounded-sm overflow-hidden">
            <button
              onClick={dec}
              aria-label="Decrease quantity"
              className="w-10 md:w-12 h-10 md:h-12 font-cardo text-navy text-xl hover:bg-navy hover:text-white transition-colors"
            >
              &minus;
            </button>
            <span className="w-12 md:w-14 text-center font-cardo text-navy text-lg">
              {quantity}
            </span>
            <button
              onClick={inc}
              aria-label="Increase quantity"
              className="w-10 md:w-12 h-10 md:h-12 font-cardo text-navy text-xl hover:bg-navy hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 px-8 rounded-sm flex items-center justify-center gap-3 mb-6 md:mb-8"
        >
          <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            <circle cx="10" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>
          {added ? 'Added to cart!' : 'Add to Cart'}
        </button>

        <div className="border-t border-sanji-border pt-5 md:pt-6">
          <h2 className="font-cardo font-bold text-navy text-base md:text-lg mb-2 md:mb-3">
            Product Details
          </h2>
          <p className="font-cardo italic text-navy/75 text-sm md:text-base leading-relaxed">
            {product.description}
          </p>
        </div>

        <Link
          href="/cart"
          className="mt-6 md:mt-8 font-cardo text-navy text-sm md:text-base text-center border border-navy rounded-sm py-2.5 md:py-3 hover:bg-navy hover:text-white transition-colors"
        >
          View Cart
        </Link>
      </div>
    </div>
  )
}
