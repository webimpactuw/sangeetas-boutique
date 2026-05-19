'use server'

import { Resend } from 'resend'
import { calculateTotals, DEFAULT_TAX_RATE } from '../lib/cart'

function formatAddress(fields) {
  const parts = [
    fields.address,
    fields.city,
    fields.state,
    fields.zip,
  ].filter(Boolean)
  return parts.join(', ')
}

function buildItemsText(items) {
  return items
    .map(
      (it) =>
        `- ${it.name} (${it.color}, ${it.size}) x${it.quantity} @ $${it.price.toFixed(2)} = $${(it.price * it.quantity).toFixed(2)}`,
    )
    .join('\n')
}

export async function submitOrderInquiry(payload) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.SANJI_ORDER_EMAIL
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !to || !from) {
    return { ok: false, error: 'Email is not configured. Please contact the boutique directly.' }
  }

  const { customer, items, shippingId, delivery } = payload

  if (!customer?.email || !customer?.firstName || !items?.length) {
    return { ok: false, error: 'Missing required fields.' }
  }

  const shippingCost =
    shippingId === 'two-day' ? 10.99 : shippingId === 'overnight' ? 20.99 : 0

  const { subtotal, tax, total } = calculateTotals(items, {
    shippingCost,
    taxRate: DEFAULT_TAX_RATE,
  })

  const orderNumber = `SNJ-${Date.now().toString().slice(-6)}`

  const resend = new Resend(apiKey)

  const body = [
    `Order inquiry ${orderNumber}`,
    '',
    `Customer: ${customer.firstName} ${customer.lastName}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone || '—'}`,
    `Delivery: ${delivery}`,
    `Ship to: ${formatAddress(customer)}`,
    '',
    'Items:',
    buildItemsText(items),
    '',
    `Subtotal: $${subtotal.toFixed(2)}`,
    `Tax: $${tax.toFixed(2)}`,
    `Shipping: $${shippingCost.toFixed(2)}`,
    `Total (estimate): $${total.toFixed(2)}`,
    '',
    'Payment will be arranged offline — no card was collected on the website.',
  ].join('\n')

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: customer.email,
    subject: `New order inquiry ${orderNumber} — Sangeeta's Boutique`,
    text: body,
  })

  if (error) {
    console.error('Resend error:', error)
    return { ok: false, error: 'Could not send your inquiry. Please try again or email the boutique.' }
  }

  return { ok: true, orderNumber, total }
}
