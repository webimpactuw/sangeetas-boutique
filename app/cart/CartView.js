'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const initialItems = [
  {
    id: 'apparel-1',
    name: 'Lehengas 01',
    price: 150,
    color: 'Blue',
    size: 'L',
    quantity: 1,
    image: '/images/product-lehenga.png',
  },
  {
    id: 'apparel-4',
    name: 'Dresses 04',
    price: 250,
    color: 'Red',
    size: 'L',
    quantity: 1,
    image: '/images/product-dress.png',
  },
]

const TAX_RATE = 0.025

export default function CartView() {
  const [items, setItems] = useState(initialItems)

  const updateQty = (id, delta) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity + delta) } : it,
      ),
    )

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id))

  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-4">
          My Cart
        </h1>
        <p className="font-cardo italic text-navy/70 text-base md:text-lg mb-8">
          Your cart is empty.
        </p>
        <Link
          href="/apparel"
          className="font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 px-10 md:px-14 rounded-sm"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-baseline gap-4 mb-8 md:mb-10">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl">
          My Cart
        </h1>
        <span className="font-cardo italic text-navy/70 text-base md:text-xl">
          ({items.length} {items.length === 1 ? 'Item' : 'Items'})
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col">
          {items.map((item, i) => (
            <article
              key={item.id}
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 py-6 md:py-8 ${
                i < items.length - 1 ? 'border-b border-sanji-border' : ''
              }`}
            >
              <Link
                href={`/products/${item.id}`}
                className="relative w-full sm:w-40 md:w-52 aspect-[4/5] flex-shrink-0 border border-sanji-border bg-light-bg overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 200px"
                />
              </Link>

              <div className="flex-1 flex flex-col">
                <Link
                  href={`/products/${item.id}`}
                  className="font-cardo font-bold text-navy text-lg md:text-xl hover:underline mb-1.5"
                >
                  {item.name}
                </Link>
                <p className="font-cardo text-navy text-base md:text-lg mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <p className="font-cardo italic text-navy/70 text-sm md:text-base mb-4">
                  Color: {item.color} &middot; Size: {item.size}
                </p>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4 md:mb-5">
                  <p className="font-cardo text-navy text-sm md:text-base">
                    Quantity:
                  </p>
                  <div className="inline-flex items-center border border-navy/40 rounded-sm overflow-hidden">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="w-9 md:w-10 h-9 md:h-10 font-cardo text-navy text-lg hover:bg-navy hover:text-white transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="w-10 md:w-12 text-center font-cardo text-navy text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      aria-label="Increase quantity"
                      className="w-9 md:w-10 h-9 md:h-10 font-cardo text-navy text-lg hover:bg-navy hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-5 font-cardo text-sm md:text-base">
                  <Link
                    href={`/products/${item.id}`}
                    className="text-navy hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-navy/70 hover:text-navy hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="bg-light-bg border border-sanji-border rounded-sm px-5 md:px-7 py-6 md:py-8 h-fit lg:sticky lg:top-6">
          <h2 className="font-cardo font-bold text-navy text-xl md:text-2xl mb-4 md:mb-5">
            Order Summary
          </h2>
          <dl className="font-cardo text-navy text-sm md:text-base space-y-2 md:space-y-3 mb-4 md:mb-5">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Tax</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>Free &middot; Issaquah, WA</dd>
            </div>
          </dl>
          <div className="border-t border-sanji-border pt-3 md:pt-4 mb-5 md:mb-6">
            <div className="flex justify-between font-cardo font-bold text-navy text-lg md:text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 rounded-sm"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  )
}
