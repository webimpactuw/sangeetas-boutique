'use server'

import { Resend } from 'resend'
import {
  getResendConfig,
  RESEND_NOT_CONFIGURED_ERROR,
} from '../lib/resendConfig'
import { calculateTotals, DEFAULT_TAX_RATE } from '../lib/cart'
import { buildApprovalUrl, createApprovalToken } from '../lib/orderApprovalToken'
import { buildCustomerEmailHtml, buildSanjiEmailHtml } from '../lib/orderInquiryEmails'

const SHIPPING_LABELS = {
  standard: 'Standard (free)',
  'two-day': 'Two-day ($10.99)',
  overnight: 'Overnight ($20.99)',
}

const DELIVERY_LABELS = {
  ship: 'Ship to address',
  pickup: 'In-store pickup',
}

function money(n) {
  return `$${n.toFixed(2)}`
}

function formatShippingAddress(customer) {
  const lines = []
  if (customer.address) lines.push(customer.address)
  const cityLine = [customer.city, customer.state, customer.zip].filter(Boolean).join(', ')
  if (cityLine) lines.push(cityLine)
  return lines.length ? lines.join('\n  ') : '—'
}

function buildItemsBlock(items) {
  return items
    .map((it) => {
      const lineTotal = it.price * it.quantity
      return [
        `  • ${it.name}`,
        `    ${it.color} · Size ${it.size} · Qty ${it.quantity}`,
        `    ${money(it.price)} each → ${money(lineTotal)}`,
      ].join('\n')
    })
    .join('\n\n')
}

function buildTotalsBlock({ subtotal, tax, total, shippingCost }) {
  const shippingLine =
    shippingCost === 0 ? 'Free' : money(shippingCost)
  return [
    `  Subtotal     ${money(subtotal)}`,
    `  Tax          ${money(tax)}`,
    `  Shipping     ${shippingLine}`,
    `  ─────────────────────`,
    `  Total        ${money(total)}`,
  ].join('\n')
}

function buildSanjiEmail({ orderNumber, customer, items, delivery, shippingId, totals, shippingCost, approveUrl }) {
  const fullName = `${customer.firstName} ${customer.lastName}`.trim()
  const shippingLabel = SHIPPING_LABELS[shippingId] ?? shippingId
  const deliveryLabel = DELIVERY_LABELS[delivery] ?? delivery

  return [
    `NEW ORDER INQUIRY — ${orderNumber}`,
    '═'.repeat(40),
    '',
    'CUSTOMER',
    `  Name:     ${fullName}`,
    `  Email:    ${customer.email}`,
    `  Phone:    ${customer.phone || '—'}`,
    '',
    'FULFILLMENT',
    `  Type:     ${deliveryLabel}`,
    delivery === 'ship' ? `  Shipping: ${shippingLabel}` : null,
    delivery === 'ship'
      ? ['  Address:', `  ${formatShippingAddress(customer)}`].join('\n')
      : null,
    '',
    'ITEMS',
    buildItemsBlock(items),
    '',
    'TOTALS (estimate)',
    buildTotalsBlock({ ...totals, shippingCost }),
    '',
    '─'.repeat(40),
    'Payment is arranged offline with the customer.',
    'No card was collected on the website.',
    '',
    '',
    '─'.repeat(40),
    'APPROVE & EMAIL PAYMENT LINK TO CUSTOMER',
    '  Only after you have confirmed stock and details:',
    approveUrl ? `  ${approveUrl}` : '  (Approval link unavailable — check ORDER_APPROVAL_SECRET)',
    '',
    'Or reply to the customer directly from this thread.',
  ]
    .filter(Boolean)
    .join('\n')
}

function buildCustomerEmailText({ orderNumber, customer, items, totals, shippingCost }) {
  const firstName = customer.firstName.trim() || 'friend'

  return [
    '✦  SANGEETA\'S BOUTIQUE  ✦',
    '   Elegance · Beauty · Tradition',
    '',
    `Dear ${firstName},`,
    '',
    'Your inquiry is in — and we could not be more delighted.',
    '',
    'You have exquisite taste. Sanji is personally reviewing your selection.',
    'If your order is confirmed, you will receive a separate email with PayPal',
    'payment instructions — nothing has been charged on our website yet.',
    '',
    `┌──────────────────────────────────────┐`,
    `│  REFERENCE   ${orderNumber.padEnd(22)}│`,
    `└──────────────────────────────────────┘`,
    '  Save this number — it is yours for any follow-up.',
    '',
    'WHAT HAPPENS NEXT',
    '  1. Sanji reviews your pieces (usually within 1–2 business days)',
    '  2. You receive a personal reply to confirm your order',
    '  3. Payment & delivery are arranged together — simple and human',
    '',
    '─'.repeat(42),
    '  YOUR SELECTION',
    '─'.repeat(42),
    '',
    buildItemsBlock(items),
    '',
    buildTotalsBlock({ ...totals, shippingCost }),
    '  (estimate — final total confirmed by Sanji)',
    '',
    '─'.repeat(42),
    '',
    'Questions before Sanji writes back? Just reply to this email.',
    '',
    'With gratitude,',
    'Sanji',
    "Sangeeta's Boutique · Issaquah, WA",
    '',
    '—',
    'This is a confirmation of your inquiry, not a charge receipt.',
  ].join('\n')
}

export async function submitOrderInquiry(payload) {
  const config = getResendConfig()
  if (!config.ok) {
    console.error('Resend not configured; missing:', config.missing.join(', '))
    return { ok: false, error: RESEND_NOT_CONFIGURED_ERROR }
  }
  const { apiKey, sanjiEmail, from } = config

  const { customer, items, shippingId, delivery } = payload

  if (!customer?.email || !customer?.firstName || !items?.length) {
    return { ok: false, error: 'Missing required fields.' }
  }

  const shippingCost =
    shippingId === 'two-day' ? 10.99 : shippingId === 'overnight' ? 20.99 : 0

  const totals = calculateTotals(items, {
    shippingCost,
    taxRate: DEFAULT_TAX_RATE,
  })

  const orderNumber = `SNJ-${Date.now().toString().slice(-6)}`
  const resend = new Resend(apiKey)

  const emailContext = {
    orderNumber,
    customer,
    items,
    delivery,
    shippingId,
    totals,
    shippingCost,
  }

  const token = createApprovalToken({
    orderNumber,
    customer: {
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName ?? '',
    },
    items,
    total: totals.total,
  })
  const approveUrl = token ? buildApprovalUrl(token) : null

  const sanjiBody = buildSanjiEmail({ ...emailContext, approveUrl: approveUrl ?? '' })
  const sanjiHtml = buildSanjiEmailHtml({ ...emailContext, approveUrl })
  const customerText = buildCustomerEmailText(emailContext)
  const customerHtml = buildCustomerEmailHtml(emailContext)

  const { error: sanjiError } = await resend.emails.send({
    from,
    to: [sanjiEmail],
    replyTo: customer.email,
    subject: `New order inquiry ${orderNumber} — Sangeeta's Boutique`,
    text: sanjiBody,
    html: sanjiHtml,
  })

  if (sanjiError) {
    console.error('Resend error (boutique):', sanjiError)
    return { ok: false, error: 'Could not send your inquiry. Please try again or email the boutique.' }
  }

  const { error: customerError } = await resend.emails.send({
    from,
    to: [customer.email],
    replyTo: sanjiEmail,
    subject: `Your inquiry is in — ${orderNumber} | Sangeeta's Boutique`,
    text: customerText,
    html: customerHtml,
  })

  if (customerError) {
    console.error('Resend error (customer confirmation):', customerError)
    return {
      ok: false,
      error:
        'Your inquiry was received, but we could not send a confirmation email. Please save your reference number or contact the boutique.',
    }
  }

  return { ok: true, orderNumber, total: totals.total }
}
