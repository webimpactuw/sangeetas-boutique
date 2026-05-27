'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { submitBooking } from '../actions/submitBooking'

const fieldClass =
  'w-full font-cardo text-navy text-base md:text-lg bg-white border border-navy/40 rounded-sm px-4 py-2.5 md:py-3 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy/30 transition-colors'
const labelClass =
  'block font-cardo font-bold text-navy text-base md:text-lg mb-1.5'

export default function BookingForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const minDate = useMemo(() => {
    const d = new Date()
    return d.toISOString().slice(0, 10)
  }, [])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: '',
  })

  const update = (key) => (e) => {
    setError('')
    setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    const result = await submitBooking(form)
    setSubmitting(false)

    if (!result.ok && !result.partial) {
      setError(result.error)
      return
    }

    const params = new URLSearchParams({
      name: result.name ?? `${form.firstName} ${form.lastName}`.trim(),
      date: result.dateStr ?? form.date,
      time: result.timeStr ?? form.time,
      ref: result.bookingRef ?? '',
    })

    router.push(`/booking/confirmation?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-light-bg rounded-sm p-6 md:p-10 border border-sanji-border"
    >
      {error ? (
        <p className="font-cardo text-red-600 text-sm md:text-base mb-5 font-bold" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={update('firstName')}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={update('lastName')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={update('email')}
          className={fieldClass}
        />
      </div>

      <div className="mb-5 md:mb-6">
        <label htmlFor="phone" className={labelClass}>
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="(425) 555-0123"
          value={form.phone}
          onChange={update('phone')}
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-6">
        <div>
          <label htmlFor="date" className={labelClass}>
            Preferred date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            min={minDate}
            value={form.date}
            onChange={update('date')}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>
            Preferred time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            value={form.time}
            onChange={update('time')}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <label htmlFor="notes" className={labelClass}>
          Additional Notes (optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          placeholder="Occasion, styles you are looking for, sizing needs…"
          value={form.notes}
          onChange={update('notes')}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <p className="font-cardo italic text-navy/70 text-sm md:text-base mb-6 text-center">
        Submitting sends your request to Sanji by email. She will confirm your appointment
        personally — nothing is finalized until you hear back.
      </p>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto md:px-16 font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 rounded-sm disabled:opacity-60"
        >
          {submitting ? 'Sending request…' : 'Book my appointment'}
        </button>
      </div>
    </form>
  )
}
