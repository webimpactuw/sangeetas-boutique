import { Resend } from 'resend'
import { buildPayPalMeUrl, buildPayPalQrImageUrl } from './paypal'
import { buildPaymentInstructionsHtml, buildPaymentInstructionsText } from './paymentEmails'
import { getResendConfig, RESEND_NOT_CONFIGURED_ERROR } from './resendConfig'

export async function sendPaymentInstructionsEmail(payload) {
  const config = getResendConfig()
  if (!config.ok) {
    return { ok: false, error: RESEND_NOT_CONFIGURED_ERROR }
  }
  const { apiKey, sanjiEmail, from } = config

  const paypalUrl = buildPayPalMeUrl(payload.total)
  if (!paypalUrl) {
    return {
      ok: false,
      error: 'PayPal is not configured (set PAYPAL_BUSINESS_EMAIL or PAYPAL_ME_USERNAME).',
    }
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
