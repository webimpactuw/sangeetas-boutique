import { getSiteUrl } from './siteUrl'

const REQUIRED = ['RESEND_API_KEY', 'SANJI_ORDER_EMAIL', 'RESEND_FROM_EMAIL']

/**
 * @returns {{ ok: true, apiKey: string, sanjiEmail: string, from: string } | { ok: false, missing: string[] }}
 */
export function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const sanjiEmail = process.env.SANJI_ORDER_EMAIL?.trim()
  const from = process.env.RESEND_FROM_EMAIL?.trim()

  const missing = REQUIRED.filter((key) => {
    if (key === 'RESEND_API_KEY') return !apiKey
    if (key === 'SANJI_ORDER_EMAIL') return !sanjiEmail
    if (key === 'RESEND_FROM_EMAIL') return !from
    return false
  })

  if (missing.length) {
    return { ok: false, missing }
  }

  return { ok: true, apiKey, sanjiEmail, from }
}

/** User-facing message when Resend env is missing. */
export const RESEND_NOT_CONFIGURED_ERROR =
  'Email is not configured. Please contact the boutique directly.'

export const BOOKING_NOT_CONFIGURED_ERROR =
  'Booking email is not configured yet. Please call or email the boutique directly.'

/**
 * Order inquiry + approve-link readiness (for ops / handoff checks).
 */
export function getResendHandoffStatus() {
  const resend = getResendConfig()
  const siteUrl = getSiteUrl()
  const approvalSecret = process.env.ORDER_APPROVAL_SECRET?.trim() || ''
  const paypalEmail =
    process.env.PAYPAL_BUSINESS_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL?.trim() ||
    ''
  const paypalMe = process.env.PAYPAL_ME_USERNAME?.trim() || ''

  return {
    resendOk: resend.ok,
    missing: resend.ok ? [] : resend.missing,
    sanjiEmail: resend.ok ? resend.sanjiEmail : null,
    from: resend.ok ? resend.from : null,
    siteUrl,
    approvalLinksReady: Boolean(approvalSecret),
    paypalReady: Boolean(paypalMe || paypalEmail),
    usingResendSandboxFrom: resend.ok
      ? resend.from.includes('@resend.dev')
      : false,
  }
}
