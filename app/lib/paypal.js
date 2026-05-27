/** PayPal.me username (preferred) or business email for payment links. */

function getPayPalUsername() {
  return (
    process.env.PAYPAL_ME_USERNAME?.trim() ||
    process.env.NEXT_PUBLIC_PAYPAL_ME_USERNAME?.trim() ||
    ''
  )
}

function getPayPalBusinessEmail() {
  return (
    process.env.PAYPAL_BUSINESS_EMAIL?.trim() ||
    process.env.NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL?.trim() ||
    ''
  )
}

/**
 * @param {number | null | undefined} amountUsd When set, link includes amount
 */
export function buildPayPalMeUrl(amountUsd) {
  const username = getPayPalUsername()
  const amount =
    amountUsd != null && Number.isFinite(Number(amountUsd)) && Number(amountUsd) > 0
      ? Number(amountUsd)
      : null

  if (username) {
    if (amount != null) {
      return `https://paypal.me/${encodeURIComponent(username)}/${amount.toFixed(2)}USD`
    }
    return `https://paypal.me/${encodeURIComponent(username)}`
  }

  const email = getPayPalBusinessEmail()
  if (!email) return null

  const params = new URLSearchParams({
    cmd: '_xclick',
    business: email,
    currency_code: 'USD',
    item_name: "Sanji's Label order",
  })
  if (amount != null) {
    params.set('amount', amount.toFixed(2))
  }
  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`
}

export function buildPayPalQrImageUrl(paypalUrl) {
  const params = new URLSearchParams({
    size: '220x220',
    data: paypalUrl,
    margin: '8',
  })
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
}
