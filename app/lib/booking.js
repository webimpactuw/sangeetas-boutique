/** Shared booking copy — matches footer shop hours. */
export const DEFAULT_BOOKING_HOURS = [
  { label: 'Mon – Fri', time: '10AM – 5PM' },
  { label: 'Sat – Sun', time: '10AM – 3PM' },
]

export const DEFAULT_BOOKING_AVAILABILITY_NOTE =
  'Call for additional availability — we are happy to accommodate when possible.'

/**
 * @param {{ firstName?: string; lastName?: string; email?: string; phone?: string; date?: string; time?: string }} fields
 */
export function validateBookingFields(fields) {
  const firstName = fields.firstName?.trim() ?? ''
  const lastName = fields.lastName?.trim() ?? ''
  const email = fields.email?.trim() ?? ''
  const phone = fields.phone?.trim() ?? ''
  const date = fields.date?.trim() ?? ''
  const time = fields.time?.trim() ?? ''

  if (!firstName) return { ok: false, error: 'First name is required.' }
  if (!lastName) return { ok: false, error: 'Last name is required.' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'A valid email is required.' }
  }
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return { ok: false, error: 'A valid phone number is required.' }
  }
  if (!date) return { ok: false, error: 'Please choose a date.' }
  if (!time) return { ok: false, error: 'Please choose a time.' }

  const parsed = new Date(`${date}T${time}`)
  if (Number.isNaN(parsed.getTime())) {
    return { ok: false, error: 'Date or time is not valid.' }
  }

  const todayStr = new Date().toISOString().slice(0, 10)
  if (date < todayStr) {
    return { ok: false, error: 'Please choose a future date.' }
  }

  return {
    ok: true,
    data: { firstName, lastName, email, phone, date, time, notes: fields.notes?.trim() ?? '' },
  }
}

/**
 * @param {string} date YYYY-MM-DD
 * @param {string} time HH:mm
 */
export function formatBookingDateTime(date, time) {
  const [y, m, d] = date.split('-').map(Number)
  const [hh, mm] = time.split(':').map(Number)
  const dt = new Date(y, m - 1, d, hh, mm)
  const dateStr = dt.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timeStr = dt.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  })
  return { dateStr, timeStr, iso: dt.toISOString() }
}

export function createBookingReference() {
  return `BKG-${Date.now().toString().slice(-6)}`
}
