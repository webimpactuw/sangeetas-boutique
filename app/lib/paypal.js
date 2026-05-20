export function buildPayPalMeUrl(amountUsd) {
  const username = process.env.PAYPAL_ME_USERNAME?.trim()
  if (!username) return null
  const amount = Number(amountUsd)
  if (!Number.isFinite(amount) || amount <= 0) return null
  return `https://paypal.me/${encodeURIComponent(username)}/${amount.toFixed(2)}USD`
}

export function buildPayPalQrImageUrl(paypalUrl) {
  const params = new URLSearchParams({
    size: '200x200',
    data: paypalUrl,
    margin: '8',
  })
  return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`
}
