'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '../context/CartContext'
import { calculateTotals, DEFAULT_TAX_RATE } from '../lib/cart'
import { DEFAULT_PAYMENT_QR } from '../lib/contentDefaults'
import { buildPayPalMeUrl, buildPayPalQrImageUrl } from '../lib/paypal'

const venmoPath = DEFAULT_PAYMENT_QR.handle.replace('@', '')
const venmoQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`https://venmo.com/${venmoPath}`)}`

export default function CartView() {
  const { items, changeQuantity, removeItem, hydrated } = useCart()

  if (!hydrated) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center font-cardo text-navy">
        Loading bag…
      </div>
    )
  }

  const { subtotal, tax, total } = calculateTotals(items, {
    shippingCost: 0,
    taxRate: DEFAULT_TAX_RATE,
  })

  const paypalUrl = buildPayPalMeUrl(total)
  const paypalQrUrl = paypalUrl ? buildPayPalQrImageUrl(paypalUrl) : venmoQrUrl

  const itemCount = items.reduce((n, it) => n + it.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-4">
          My Bag
        </h1>
        <p className="font-cardo italic text-navy/70 text-base md:text-lg mb-8">
          Your bag is empty.
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
      <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-5xl mb-8 md:mb-10">
        My Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
        <div className="lg:col-span-3 flex flex-col divide-y divide-sanji-border">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex gap-5 md:gap-8 py-6 md:py-8 first:pt-0"
            >
              <div className="flex flex-col flex-shrink-0 w-28 md:w-36">
                <Link
                  href={`/products/${item.productId}`}
                  className="relative w-full aspect-[4/5] border border-sanji-border bg-light-bg overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </Link>
                <div className="flex gap-3 mt-2 font-cardo text-sm text-navy">
                  <Link
                    href={`/products/${item.productId}`}
                    className="hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-navy/70 hover:text-navy hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.productId}`}
                  className="font-cardo font-bold text-navy text-lg md:text-xl hover:underline block mb-1"
                >
                  {item.name}
                </Link>
                <p className="font-cardo text-navy text-base md:text-lg mb-3">
                  ${item.price.toFixed(2)}
                </p>
                <p className="font-cardo text-navy/75 text-sm md:text-base mb-1">
                  Color: {item.color}
                </p>
                <p className="font-cardo text-navy/75 text-sm md:text-base mb-4">
                  Size: {item.size}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-cardo text-navy text-sm md:text-base">
                    Quantity:
                  </span>
                  <div className="inline-flex items-center border border-navy/40 rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 font-cardo text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      &minus;
                    </button>
                    <span className="w-10 text-center font-cardo text-navy">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 font-cardo text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="lg:col-span-2 h-fit lg:sticky lg:top-8 font-cardo text-navy">
          <dl className="text-base md:text-lg space-y-2 mb-6">
            <div className="flex justify-between">
              <dt>Subtotal:</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between font-bold text-lg md:text-xl pt-2 border-t border-sanji-border">
              <dt>Total:</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="text-navy/65 text-xs md:text-sm italic mb-6 leading-relaxed">
            Total includes estimated tax. Shipping is confirmed when Sanji approves your
            request.
          </p>

          <p className="text-sm md:text-base mb-3 font-bold">Choose how to continue</p>

          <Link
            href="/checkout"
            className="block w-full text-center text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3.5 md:py-4 rounded-sm"
          >
            Confirm your request
          </Link>
          <p className="text-xs md:text-sm text-navy/70 text-center mt-2 mb-1 leading-relaxed">
            Sanji will review your bag and follow up by email — no payment on this step.
          </p>

          <p className="font-cardo italic text-navy/60 text-center text-sm my-5">OR</p>

          <p className="text-center text-sm md:text-base mb-4">
            {paypalUrl
              ? 'Scan the QR or pay with PayPal'
              : 'Scan the QR to purchase your items'}
          </p>

          <div className="flex flex-col items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={paypalQrUrl}
              alt={paypalUrl ? 'PayPal payment QR code' : `Venmo ${DEFAULT_PAYMENT_QR.handle}`}
              width={200}
              height={200}
              className="border border-sanji-border bg-white p-2 mb-3"
            />
            {paypalUrl ? (
              <a
                href={paypalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-sm md:text-base underline underline-offset-2 hover:text-navy/70 mb-2"
              >
                Pay with PayPal
              </a>
            ) : null}
            <p className="font-bold text-sm md:text-base text-navy/80">
              {DEFAULT_PAYMENT_QR.handle}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
