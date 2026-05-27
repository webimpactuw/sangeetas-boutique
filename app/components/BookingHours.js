import {
  DEFAULT_BOOKING_AVAILABILITY_NOTE,
  DEFAULT_BOOKING_HOURS,
} from '../lib/booking'
import { DEFAULT_FOOTER_CONTACT } from '../lib/contentDefaults'

/**
 * @param {{ hours?: Array<{ label: string; time: string }>; note?: string; phone?: string }} props
 */
export default function BookingHours({ hours, note, phone }) {
  const rows = hours?.length ? hours : DEFAULT_BOOKING_HOURS
  const availabilityNote = note?.trim() || DEFAULT_BOOKING_AVAILABILITY_NOTE
  const tel = phone?.trim() || DEFAULT_FOOTER_CONTACT.phone
  const telHref = `tel:+1${tel.replace(/\D/g, '')}`

  return (
    <aside className="bg-cream border border-sanji-border rounded-sm p-6 md:p-8 mb-8 md:mb-10">
      <h2 className="font-cardo font-bold text-navy text-xl md:text-2xl mb-4 md:mb-5">
        Studio hours
      </h2>
      <ul className="font-cardo text-navy text-base md:text-lg space-y-2 mb-4 md:mb-5">
        {rows.map((row) => (
          <li key={`${row.label}-${row.time}`} className="flex justify-between gap-4">
            <span>{row.label}</span>
            <span className="text-navy/80">{row.time}</span>
          </li>
        ))}
      </ul>
      <p className="font-cardo italic text-navy/75 text-sm md:text-base leading-relaxed mb-4">
        {availabilityNote}
      </p>
      <p className="font-cardo text-navy text-sm md:text-base">
        Questions? Call{' '}
        <a href={telHref} className="underline underline-offset-2 hover:text-navy/80">
          {tel}
        </a>
      </p>
    </aside>
  )
}
