function money(n) {
  return `$${Number(n).toFixed(2)}`
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
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

export function buildPaymentInstructionsText({
  orderNumber,
  customer,
  items,
  total,
  paypalUrl,
}) {
  const firstName = customer.firstName?.trim() || 'friend'

  return [
    '✦  SANGEETA\'S BOUTIQUE  ✦',
    '',
    `Dear ${firstName},`,
    '',
    'Great news — Sanji has confirmed your order!',
    '',
    `Reference: ${orderNumber}`,
    `Amount due: ${money(total)}`,
    '',
    'Pay Sanji directly via PayPal (not through our website or school):',
    paypalUrl,
    '',
    `Please include reference ${orderNumber} in your PayPal note if possible.`,
    '',
    'ITEMS',
    buildItemsBlock(items),
    '',
    '─'.repeat(40),
    'Payment goes directly to Sanji. Sangeeta\'s Boutique and your school club',
    'do not process or hold your payment.',
    '',
    'Questions? Reply to this email.',
    '',
    'With gratitude,',
    'Sanji',
    "Sangeeta's Boutique",
  ].join('\n')
}

export function buildPaymentInstructionsHtml({
  orderNumber,
  customer,
  items,
  total,
  paypalUrl,
  qrImageUrl,
}) {
  const firstName = escapeHtml(customer.firstName?.trim() || 'friend')
  const ref = escapeHtml(orderNumber)
  const payUrl = escapeHtml(paypalUrl)

  const itemRows = items
    .map((it) => {
      const lineTotal = it.price * it.quantity
      return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e8e4dc;">
            <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:16px;font-weight:700;color:#1a2744;">${escapeHtml(it.name)}</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#5c6478;">${escapeHtml(it.color)} · Size ${escapeHtml(it.size)} · Qty ${it.quantity}</p>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #e8e4dc;text-align:right;font-family:Georgia,serif;font-size:14px;color:#1a2744;">${money(lineTotal)}</td>
        </tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e8e4dc;border-radius:4px;overflow:hidden;">
        <tr>
          <td style="background:#1a2744;padding:28px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9b896;">Sangeeta's Boutique</p>
            <h1 style="margin:0;font-family:Georgia,serif;font-size:24px;font-weight:400;font-style:italic;color:#ffffff;">Your order is confirmed</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:17px;color:#1a2744;">Dear ${firstName},</p>
            <p style="margin:0 0 20px;font-family:Georgia,serif;font-size:16px;line-height:1.65;color:#3d4556;">
              Sanji has reviewed and <strong style="color:#1a2744;">confirmed your order</strong>.
              When you are ready, pay <strong style="color:#1a2744;">${money(total)}</strong> directly to Sanji via PayPal below.
            </p>
            <table role="presentation" width="100%" style="margin:0 0 24px;background:#f7f5f0;border:1px solid #e8e4dc;border-radius:4px;">
              <tr>
                <td style="padding:20px;text-align:center;">
                  <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#5c6478;">Reference</p>
                  <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:20px;font-weight:700;color:#1a2744;">${ref}</p>
                  <a href="${payUrl}" style="display:inline-block;font-family:Georgia,serif;font-size:16px;font-weight:700;color:#ffffff;background:#1a2744;text-decoration:none;padding:14px 28px;border-radius:4px;">Pay ${money(total)} with PayPal</a>
                  ${qrImageUrl ? `<p style="margin:20px 0 8px;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Or scan to pay</p><img src="${escapeHtml(qrImageUrl)}" width="160" height="160" alt="PayPal QR code" style="display:block;margin:0 auto;border:1px solid #e8e4dc;" />` : ''}
                  <p style="margin:16px 0 0;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Add reference <strong>${ref}</strong> in the PayPal note if you can.</p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#1a2744;">Your items</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${itemRows}</table>
            <p style="margin:24px 0 0;font-family:Georgia,serif;font-size:12px;line-height:1.5;color:#5c6478;">
              Payment goes <strong>directly to Sanji</strong>. This website and your school club do not process or hold your funds.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f7f5f0;padding:20px 32px;text-align:center;border-top:1px solid #e8e4dc;">
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;font-style:italic;color:#1a2744;">With gratitude, Sanji</p>
            <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Sangeeta's Boutique · Issaquah, WA</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
