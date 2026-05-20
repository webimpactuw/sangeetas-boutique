import { Resend } from 'resend'
import { buildPayPalMeUrl, buildPayPalQrImageUrl } from './paypal'
import { buildPaymentInstructionsHtml, buildPaymentInstructionsText } from './paymentEmails'

export async function sendPaymentInstructionsEmail(payload) {
  const apiKey = process.env.RESEND_API_KEY
  const sanjiEmail = process.env.SANJI_ORDER_EMAIL
  const from = process.env.RESEND_FROM_EMAIL

  if (!apiKey || !sanjiEmail || !from) {
    return { ok: false, error: 'Email is not configured.' }
  }

  const paypalUrl = buildPayPalMeUrl(payload.total)
  if (!paypalUrl) {
    return { ok: false, error: 'PayPal is not configured (set PAYPAL_ME_USERNAME).' }
  }

  const qrImageUrl = buildPayPalQrImageUrl(paypalUrl)
  const emailArgs = {
    orderNumber: payload.orderNumber,
    customer: payload.customer,
    items: payload.items,
    total: payload.total,
    paypalUrl,
    qrImageUrl,
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to: [payload.customer.email],
    replyTo: sanjiEmail,
    subject: `Order confirmed — pay ${payload.total.toFixed(2)} | ${payload.orderNumber}`,
    text: buildPaymentInstructionsText(emailArgs),
    html: buildPaymentInstructionsHtml(emailArgs),
  })

  if (error) {
    console.error('Resend error (payment instructions):', error)
    return { ok: false, error: 'Could not send payment email to the customer.' }
  }

  return { ok: true }
}
