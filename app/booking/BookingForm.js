'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const fieldClass =
  'w-full font-cardo text-navy text-base md:text-lg bg-white border border-navy/40 rounded-sm px-4 py-2.5 md:py-3 focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy/30 transition-colors'
const labelClass =
  'block font-cardo font-bold text-navy text-base md:text-lg mb-1.5'

export default function BookingForm() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    areaCode: '',
    phone: '',
    month: '',
    day: '',
    year: '',
    hour: '',
    minute: '',
    ampm: 'AM',
    notes: '',
  })

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const params = new URLSearchParams({
      name: `${form.firstName} ${form.lastName}`.trim(),
      date: `${form.month}/${form.day}/${form.year}`,
      time: `${form.hour}:${form.minute || '00'} ${form.ampm}`,
    })
    setTimeout(() => router.push(`/booking/confirmation?${params}`), 250)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-light-bg rounded-sm p-6 md:p-10 border border-sanji-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-5 md:mb-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>First Name</label>
          <input id="firstName" required value={form.firstName} onChange={update('firstName')} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>Last Name</label>
          <input id="lastName" required value={form.lastName} onChange={update('lastName')} className={fieldClass} />
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input id="email" type="email" required value={form.email} onChange={update('email')} className={fieldClass} />
      </div>

      <div className="mb-5 md:mb-6">
        <label className={labelClass}>Phone Number</label>
        <div className="flex gap-3">
          <input
            placeholder="Area Code"
            aria-label="Area code"
            required
            inputMode="numeric"
            maxLength={3}
            value={form.areaCode}
            onChange={update('areaCode')}
            className={`${fieldClass} w-24 md:w-32`}
          />
          <input
            placeholder="555 0123"
            aria-label="Phone number"
            required
            inputMode="numeric"
            value={form.phone}
            onChange={update('phone')}
            className={`${fieldClass} flex-1`}
          />
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <label className={labelClass}>Booking Date</label>
        <div className="grid grid-cols-3 gap-3">
          <input placeholder="Month" aria-label="Month" required inputMode="numeric" maxLength={2} value={form.month} onChange={update('month')} className={fieldClass} />
          <input placeholder="Day" aria-label="Day" required inputMode="numeric" maxLength={2} value={form.day} onChange={update('day')} className={fieldClass} />
          <input placeholder="Year" aria-label="Year" required inputMode="numeric" maxLength={4} value={form.year} onChange={update('year')} className={fieldClass} />
        </div>
      </div>

      <div className="mb-5 md:mb-6">
        <label className={labelClass}>Time</label>
        <div className="grid grid-cols-3 gap-3">
          <input placeholder="Hour" aria-label="Hour" required inputMode="numeric" maxLength={2} value={form.hour} onChange={update('hour')} className={fieldClass} />
          <input placeholder="Minute" aria-label="Minute" inputMode="numeric" maxLength={2} value={form.minute} onChange={update('minute')} className={fieldClass} />
          <select aria-label="AM or PM" value={form.ampm} onChange={update('ampm')} className={fieldClass}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
      </div>

      <div className="mb-6 md:mb-8">
        <label htmlFor="notes" className={labelClass}>Additional Notes (optional)</label>
        <textarea
          id="notes"
          rows={5}
          value={form.notes}
          onChange={update('notes')}
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full md:w-auto md:px-16 font-cardo text-white text-base md:text-lg bg-navy hover:bg-navy/90 transition-colors py-3 md:py-3.5 rounded-sm disabled:opacity-60"
      >
        {submitting ? 'Booking…' : 'Book my appointment'}
      </button>
    </form>
  )
}
