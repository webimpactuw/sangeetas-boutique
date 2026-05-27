import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  formatBookingDateTime,
  validateBookingFields,
} from '../app/lib/booking.js'

describe('validateBookingFields', () => {
  const valid = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    phone: '4255551234',
    date: '2030-06-15',
    time: '14:30',
    notes: 'Looking for lehenga',
  }

  it('accepts valid booking', () => {
    const result = validateBookingFields(valid)
    assert.equal(result.ok, true)
    assert.equal(result.data.email, 'jane@example.com')
  })

  it('rejects invalid email', () => {
    const result = validateBookingFields({ ...valid, email: 'bad' })
    assert.equal(result.ok, false)
  })

  it('rejects past dates', () => {
    const result = validateBookingFields({ ...valid, date: '2000-01-01' })
    assert.equal(result.ok, false)
  })
})

describe('formatBookingDateTime', () => {
  it('returns readable date and time strings', () => {
    const { dateStr, timeStr } = formatBookingDateTime('2030-06-15', '14:30')
    assert.match(dateStr, /June/)
    assert.match(timeStr, /2:30/)
  })
})
