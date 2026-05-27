'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { submitOrderInquiry } from '../actions/submitOrderInquiry'
import { useCart } from '../context/CartContext'
import { calculateTotals, DEFAULT_TAX_RATE } from '../lib/cart'

const fieldClass =
  'w-full font-cardo text-navy text-sm md:text-base bg-white border border-navy/40 rounded-sm px-3 py-2 md:py-2.5 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy/30 transition-colors'
const labelClass =
  'block font-cardo text-navy text-sm md:text-base mb-1.5'
const sectionTitle =
  'font-cardo font-bold text-navy text-xl md:text-2xl mb-4 md:mb-6'

const shippingOptions = [
  { id: 'standard', label: 'Standard', detail: 'Arrives between 4/24 \u2013 4/29', price: 0 },
  { id: 'two-day', label: 'Two-Day', detail: 'Arrives between 4/24 \u2013 4/26', price: 10.99 },
  { id: 'overnight', label: 'Overnight', detail: 'Arrives by 4/24', price: 20.99 },
]

export default function CheckoutView() {
  const router = useRouter()
  const { items, hydrated, clearCart } = useCart()
  const [delivery, setDelivery] = useState('ship')
  const [shipping, setShipping] = useState('standard')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const shipCost =
    delivery === 'ship'
      ? (shippingOptions.find((s) => s.id === shipping)?.price ?? 0)
      : 0
  const { subtotal, tax, total } = calculateTotals(items, {
    shippingCost: shipCost,
    taxRate: DEFAULT_TAX_RATE,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSubmitting(true)

    const form = e.currentTarget
    const fd = new FormData(form)

    const email = fd.get('email')?.toString().trim() || ''
    const phone = fd.get('phone')?.toString().trim() || ''

    if (delivery === 'pickup' && (!email || !phone)) {
      setFormError('Missing required fields')
      setSubmitting(false)
      return
    }

    const customer = {
      firstName: fd.get('firstName')?.toString() || '',
      lastName: fd.get('lastName')?.toString() || '',
      email: fd.get('email')?.toString() || '',
      phone: fd.get('phone')?.toString() || '',
      address: fd.get('address')?.toString() || '',
      city: fd.get('city')?.toString() || '',
      state: fd.get('state')?.toString() || '',
      zip: fd.get('zip')?.toString() || '',
    }

    const result = await submitOrderInquiry({
      customer,
      items,
      shippingId: shipping,
      delivery,
    })

    setSubmitting(false)

    if (!result.ok) {
      setFormError(result.error)
      return
    }

    clearCart()

    const params = new URLSearchParams({
      order: result.orderNumber,
      total: result.total.toFixed(2),
      city: customer.city || 'Issaquah',
      state: customer.state || 'WA',
    })

    router.push(`/checkout/confirmation?${params.toString()}`)
  }

  if (!hydrated) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center font-cardo text-navy">
        Loading checkout…
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-4">
          Checkout
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
      <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-2 md:mb-3">
        Checkout
      </h1>
      <Link
        href="/cart"
        className="inline-block mb-8 md:mb-10 font-cardo text-navy text-sm md:text-base underline underline-offset-4 hover:no-underline"
      >
        &larr; Return to My Bag
      </Link>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col gap-8 md:gap-12">
          <section>
            <h2 className={sectionTitle}>Contact Information</h2>
            <div className="mb-4 md:mb-5">
              <label htmlFor="email" className={labelClass}>Email</label>
              <input id="email" name="email" type="email" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="(555) 555-0123" required className={fieldClass} />
            </div>
          </section>

          <section>
            <h2 className={sectionTitle}>Delivery Options</h2>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
              {[
                { id: 'ship', label: 'Ship to Me' },
                { id: 'pickup', label: 'Pickup in Store' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDelivery(opt.id)}
                  className={`font-cardo text-sm md:text-base py-2.5 md:py-3 rounded-sm border transition-colors ${
                    delivery === opt.id
                      ? 'bg-navy text-white border-navy'
                      : 'bg-white text-navy border-navy/40 hover:border-navy'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {delivery === 'ship' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>First Name</label>
                    <input id="firstName" name="firstName" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>Last Name</label>
                    <input id="lastName" name="lastName" required className={fieldClass} />
                  </div>
                </div>
                <div className="mb-4 md:mb-5">
                  <label htmlFor="address1" className={labelClass}>Address Line 1</label>
                  <input id="address1" name="address" required className={fieldClass} />
                </div>
                <div className="mb-4 md:mb-5">
                  <label htmlFor="address2" className={labelClass}>
                    Address Line 2 (Optional)
                  </label>
                  <input id="address2" className={fieldClass} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="city" className={labelClass}>City</label>
                    <input id="city" name="city" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="state" className={labelClass}>State</label>
                    <input id="state" name="state" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="zip" className={labelClass}>Zip Code</label>
                    <input id="zip" name="zip" required inputMode="numeric" maxLength={10} className={fieldClass} />
                  </div>
                </div>
              </>
            )}
          </section>

          {delivery === 'ship' && (
            <section>
              <h2 className={sectionTitle}>Shipping Method</h2>
              <div className="flex flex-col gap-3">
                {shippingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 md:gap-4 border rounded-sm px-4 md:px-5 py-3 md:py-4 cursor-pointer transition-colors ${
                      shipping === opt.id ? 'border-navy bg-navy/5' : 'border-navy/30 hover:border-navy'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shipping === opt.id}
                      onChange={(e) => setShipping(e.target.value)}
                      className="accent-navy"
                    />
                    <div className="flex-1">
                      <p className="font-cardo text-navy text-sm md:text-base font-bold">{opt.label}</p>
                      <p className="font-cardo italic text-navy/70 text-xs md:text-sm">{opt.detail}</p>
                    </div>
                    <p className="font-cardo text-navy text-sm md:text-base">
                      {opt.price === 0 ? 'Free' : `$${opt.price.toFixed(2)}`}
                    </p>
                  </label>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="bg-light-bg border border-sanji-border rounded-sm px-5 md:px-7 py-6 md:py-8 h-fit lg:sticky lg:top-6">
          <h2 className="font-cardo font-bold text-navy text-xl md:text-2xl mb-4 md:mb-5">
            My Bag ({items.length} {items.length === 1 ? 'Item' : 'Items'})
          </h2>
          <div className="flex flex-col gap-4 md:gap-5 mb-5 md:mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-16 md:w-20 aspect-[4/5] flex-shrink-0 border border-sanji-border bg-white overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-cardo font-bold text-navy text-sm md:text-base truncate">{item.name}</p>
                  <p className="font-cardo text-navy text-sm md:text-base">${item.price.toFixed(2)}</p>
                  <p className="font-cardo italic text-navy/70 text-xs md:text-sm">
                    Color: {item.color} &middot; Size: {item.size} &middot; Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <dl className="font-cardo text-navy text-sm md:text-base space-y-2 md:space-y-3 mb-4">
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
              <dd>
                {delivery === 'pickup' || shipCost === 0
                  ? 'Free \u00b7 Issaquah, WA'
                  : `$${shipCost.toFixed(2)}`}
              </dd>
            </div>
          </dl>
          <div className="border-t border-sanji-border pt-3 md:pt-4 mb-5 md:mb-6">
            <div className="flex justify-between font-cardo font-bold text-navy text-lg md:text-xl">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="font-cardo text-navy/80 text-sm md:text-base mb-4 leading-relaxed">
            This site does not process payments. If Sanji confirms your order, you will receive a separate email with PayPal instructions.
          </p>

          {formError && (
            <p className="font-cardo text-red-600 text-sm md:text-base mb-3 font-bold" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="block w-full text-center font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 rounded-sm disabled:opacity-60"
          >
            {submitting ? 'Sending…' : 'Submit order inquiry'}
          </button>
        </aside>
      </form>
    </div>
  )
}
