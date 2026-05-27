'use server'

import { Resend } from 'resend'
import {
  BOOKING_NOT_CONFIGURED_ERROR,
  getResendConfig,
} from '../lib/resendConfig'
import {
  createBookingReference,
  formatBookingDateTime,
  validateBookingFields,
} from '../lib/booking'

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildSanjiBookingText({ bookingRef, fullName, email, phone, dateStr, timeStr, notes }) {
  return [
    `NEW APPOINTMENT REQUEST — ${bookingRef}`,
    '═'.repeat(40),
    '',
    'CUSTOMER',
    `  Name:     ${fullName}`,
    `  Email:    ${email}`,
    `  Phone:    ${phone}`,
    '',
    'REQUESTED TIME',
    `  Date:     ${dateStr}`,
    `  Time:     ${timeStr}`,
    '',
    'NOTES',
    notes ? `  ${notes.replace(/\n/g, '\n  ')}` : '  (none)',
    '',
    '─'.repeat(40),
    'Reply to confirm or suggest another time.',
    'This request was submitted from the booking page on the website.',
  ].join('\n')
}

function buildSanjiBookingHtml({ bookingRef, fullName, email, phone, dateStr, timeStr, notes }) {
  const notesHtml = notes
    ? escapeHtml(notes).replace(/\n/g, '<br/>')
    : '<em>(none)</em>'

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f7f5f0;">
  <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e4dc;">
    <tr><td style="background:#1a2744;padding:20px 24px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:12px;letter-spacing:0.15em;color:#c9b896;text-transform:uppercase;">New appointment request</p>
      <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#fff;">${escapeHtml(bookingRef)}</h1>
    </td></tr>
    <tr><td style="padding:24px;font-family:Georgia,serif;color:#1a2744;font-size:14px;line-height:1.6;">
      <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p style="margin-top:16px;"><strong>Date:</strong> ${escapeHtml(dateStr)}</p>
      <p><strong>Time:</strong> ${escapeHtml(timeStr)}</p>
      <p style="margin-top:16px;"><strong>Notes:</strong><br/>${notesHtml}</p>
      <p style="margin-top:20px;font-size:12px;color:#5c6478;">Reply to the customer to confirm timing.</p>
    </td></tr>
  </table>
</body></html>`
}

function buildCustomerBookingText({ bookingRef, firstName, dateStr, timeStr, notes }) {
  return [
    "✦  SANGEETA'S BOUTIQUE  ✦",
    '   Elegance · Beauty · Tradition',
    '',
    `Dear ${firstName},`,
    '',
    'Thank you for requesting an appointment with Sanji.',
    'She will review your preferred time and follow up personally to confirm',
    'or suggest another slot that works.',
    '',
    `Reference: ${bookingRef}`,
    '',
    'YOUR REQUEST',
    `  Date:  ${dateStr}`,
    `  Time:  ${timeStr}`,
    notes ? `  Notes: ${notes}` : '',
    '',
    'WHAT HAPPENS NEXT',
    '  Sanji typically replies within 1–2 business days.',
    '  If you need to change your request, reply to this email or call the boutique.',
    '',
    'With gratitude,',
    'Sanji',
    "Sangeeta's Boutique · Issaquah, WA",
    '',
    '—',
    'This is a request confirmation, not a finalized appointment.',
  ]
    .filter(Boolean)
    .join('\n')
}

function buildCustomerBookingHtml({ bookingRef, firstName, dateStr, timeStr, notes }) {
  const fn = escapeHtml(firstName)
  const ref = escapeHtml(bookingRef)
  const notesBlock = notes
    ? `<p style="margin:8px 0 0;font-family:Georgia,serif;font-size:14px;color:#3d4556;"><strong>Notes:</strong> ${escapeHtml(notes)}</p>`
    : ''

  return `<!DOCTYPE html>
<html lang="en"><body style="margin:0;padding:0;background:#f7f5f0;">
  <table role="presentation" width="100%" style="background:#f7f5f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#fff;border:1px solid #e8e4dc;border-radius:4px;">
        <tr><td style="background:#1a2744;padding:28px 32px;text-align:center;">
          <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9b896;">Sangeeta's Boutique</p>
          <h1 style="margin:8px 0 0;font-family:Georgia,serif;font-size:24px;font-weight:400;font-style:italic;color:#fff;">Appointment request received</h1>
        </td></tr>
        <tr><td style="padding:32px;font-family:Georgia,serif;color:#1a2744;">
          <p style="font-size:17px;line-height:1.6;">Dear ${fn},</p>
          <p style="font-size:16px;line-height:1.65;color:#3d4556;">Thank you for booking with Sanji. She will personally confirm your appointment or suggest another time.</p>
          <table role="presentation" width="100%" style="margin:24px 0;background:#f7f5f0;border:1px solid #e8e4dc;border-radius:4px;">
            <tr><td style="padding:18px 20px;text-align:center;">
              <p style="margin:0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#5c6478;">Reference</p>
              <p style="margin:4px 0 0;font-size:22px;font-weight:700;">${ref}</p>
            </td></tr>
          </table>
          <p style="font-size:15px;"><strong>Date:</strong> ${escapeHtml(dateStr)}</p>
          <p style="font-size:15px;"><strong>Time:</strong> ${escapeHtml(timeStr)}</p>
          ${notesBlock}
          <p style="margin-top:24px;font-size:14px;color:#5c6478;">Sanji usually replies within 1–2 business days.</p>
        </td></tr>
        <tr><td style="background:#f7f5f0;padding:20px;text-align:center;font-size:12px;color:#5c6478;">
          Sangeeta's Boutique · Issaquah, WA — request only, not a finalized appointment.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function submitBooking(payload) {
  const config = getResendConfig()
  if (!config.ok) {
    console.error('Resend not configured; missing:', config.missing.join(', '))
    return { ok: false, error: BOOKING_NOT_CONFIGURED_ERROR }
  }
  const { apiKey, sanjiEmail, from } = config

  const validated = validateBookingFields(payload)
  if (!validated.ok) {
    return { ok: false, error: validated.error }
  }

  const { firstName, lastName, email, phone, date, time, notes } = validated.data
  const fullName = `${firstName} ${lastName}`.trim()
  const { dateStr, timeStr } = formatBookingDateTime(date, time)
  const bookingRef = createBookingReference()
  const resend = new Resend(apiKey)

  const sanjiText = buildSanjiBookingText({
    bookingRef,
    fullName,
    email,
    phone,
    dateStr,
    timeStr,
    notes,
  })
  const sanjiHtml = buildSanjiBookingHtml({
    bookingRef,
    fullName,
    email,
    phone,
    dateStr,
    timeStr,
    notes,
  })

  const { error: sanjiError } = await resend.emails.send({
    from,
    to: [sanjiEmail],
    replyTo: email,
    subject: `Appointment request ${bookingRef} — ${fullName}`,
    text: sanjiText,
    html: sanjiHtml,
  })

  if (sanjiError) {
    console.error('Resend error (booking → boutique):', sanjiError)
    return {
      ok: false,
      error: 'Could not send your request. Please try again or contact the boutique by phone.',
    }
  }

  const customerText = buildCustomerBookingText({
    bookingRef,
    firstName,
    dateStr,
    timeStr,
    notes,
  })
  const customerHtml = buildCustomerBookingHtml({
    bookingRef,
    firstName,
    dateStr,
    timeStr,
    notes,
  })

  const { error: customerError } = await resend.emails.send({
    from,
    to: [email],
    replyTo: sanjiEmail,
    subject: `Your appointment request — ${bookingRef} | Sangeeta's Boutique`,
    text: customerText,
    html: customerHtml,
  })

  if (customerError) {
    console.error('Resend error (booking → customer):', customerError)
    return {
      ok: false,
      error:
        'Your request was sent to Sanji, but we could not email you a confirmation. Please save your details or call the boutique.',
      partial: true,
      bookingRef,
      dateStr,
      timeStr,
      name: fullName,
    }
  }

  return {
    ok: true,
    bookingRef,
    dateStr,
    timeStr,
    name: fullName,
  }
}
