'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function ConfirmationContent() {
  const sp = useSearchParams()
  const name = sp.get('name') || 'Jane Smith'
  const date = sp.get('date') || '1/1/2026'
  const time = sp.get('time') || '12 pm (PST)'

  return (
    <div className="max-w-3xl mx-auto bg-light-bg border border-sanji-border rounded-sm px-6 md:px-12 py-10 md:py-14 text-center">
      <div className="flex justify-center mb-6 md:mb-8">
        <div
          aria-hidden
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-navy text-white flex items-center justify-center"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      <h1 className="font-cardo font-bold italic text-navy text-4xl md:text-6xl mb-3 md:mb-4">
        Booking Confirmed
      </h1>
      <p className="font-cardo text-navy/80 text-base md:text-lg mb-8 md:mb-10">
        Thank you for booking with Sanji!
      </p>

      <div className="bg-white border border-sanji-border rounded-sm px-6 md:px-10 py-6 md:py-8 mb-8 md:mb-10 text-left max-w-xl mx-auto">
        <h2 className="font-cardo font-bold text-navy text-xl md:text-2xl mb-4 md:mb-5">
          Booking Details
        </h2>
        <dl className="grid grid-cols-3 gap-y-2 md:gap-y-3 font-cardo text-navy text-sm md:text-base">
          <dt className="font-bold">Name</dt>
          <dd className="col-span-2">{name}</dd>
          <dt className="font-bold">Date</dt>
          <dd className="col-span-2">{date}</dd>
          <dt className="font-bold">Time</dt>
          <dd className="col-span-2">{time}</dd>
        </dl>
      </div>

      <Link
        href="/"
        className="inline-block font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 px-10 md:px-14 rounded-sm"
      >
        Continue shopping!
      </Link>
    </div>
  )
}
