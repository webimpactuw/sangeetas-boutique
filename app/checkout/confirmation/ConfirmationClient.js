'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ConfirmationClient() {
  const params = useSearchParams()
  const orderNumber = params.get('order') || 'SNJ-000000'
  const total = params.get('total') || '0.00'
  const city = params.get('city') || 'Issaquah'
  const state = params.get('state') || 'WA'

  return (
    <main className="bg-white py-10 md:py-20 px-6 md:px-16">
      <div className="max-w-3xl mx-auto bg-light-bg border border-sanji-border rounded-sm px-6 md:px-12 py-10 md:py-14 text-center">
        <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-3 md:mb-4">
          Inquiry received
        </h1>
        <p className="font-cardo text-navy/80 text-base md:text-lg mb-8 md:mb-10">
          Thank you! Sanji will email you to confirm your order and arrange payment. No payment was charged on this website.
        </p>
        <dl className="bg-white border border-sanji-border rounded-sm px-6 py-6 mb-8 text-left max-w-xl mx-auto font-cardo text-navy text-sm md:text-base grid grid-cols-3 gap-y-2">
          <dt className="font-bold">Reference #</dt>
          <dd className="col-span-2">{orderNumber}</dd>
          <dt className="font-bold">Estimated total</dt>
          <dd className="col-span-2">${total}</dd>
          <dt className="font-bold">Ship to</dt>
          <dd className="col-span-2">{city}, {state}</dd>
        </dl>
        <Link href="/" className="inline-block font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 px-10 rounded-sm">
          Continue shopping
        </Link>
      </div>
    </main>
  )
}
