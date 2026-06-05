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

export function buildSanjiEmailHtml({ orderNumber, customer, items, totals, approveUrl }) {
  const fullName = `${customer.firstName} ${customer.lastName}`.trim()
  const itemsHtml = items
    .map(
      (it) =>
        `<li style="margin-bottom:8px;font-family:Georgia,serif;font-size:14px;color:#1a2744;"><strong>${escapeHtml(it.name)}</strong> — ${escapeHtml(it.color)}, ${escapeHtml(it.size)} × ${it.quantity} — $${(it.price * it.quantity).toFixed(2)}</li>`,
    )
    .join('')

  const approveBlock = approveUrl
    ? `<table role="presentation" width="100%" style="margin:24px 0;"><tr><td align="center">
         <a href="${escapeHtml(approveUrl)}" style="display:inline-block;font-family:Georgia,serif;font-size:17px;font-weight:700;color:#ffffff;background:#1a2744;text-decoration:none;padding:16px 32px;border-radius:4px;">Approve &amp; send payment link</a>
         <p style="margin:12px 0 0;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Tap only after you have confirmed this order. The customer will receive PayPal instructions by email.</p>
       </td></tr></table>`
    : `<p style="font-family:Georgia,serif;font-size:13px;color:#8b4513;">Approval link not configured. Set ORDER_APPROVAL_SECRET in env.</p>`

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;background:#f7f5f0;">
  <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e8e4dc;">
    <tr><td style="background:#1a2744;padding:20px 24px;">
      <p style="margin:0;font-family:Georgia,serif;font-size:12px;letter-spacing:0.15em;color:#c9b896;text-transform:uppercase;">New order inquiry</p>
      <h1 style="margin:6px 0 0;font-family:Georgia,serif;font-size:22px;font-weight:400;font-style:italic;color:#fff;">${escapeHtml(orderNumber)}</h1>
    </td></tr>
    <tr><td style="padding:24px;font-family:Georgia,serif;color:#1a2744;">
      <p style="margin:0 0 4px;font-size:14px;"><strong>Customer:</strong> ${escapeHtml(fullName)}</p>
      <p style="margin:0 0 4px;font-size:14px;"><strong>Email:</strong> ${escapeHtml(customer.email)}</p>
      <p style="margin:0 0 16px;font-size:14px;"><strong>Phone:</strong> ${escapeHtml(customer.phone || '—')}</p>
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.1em;text-transform:uppercase;">Items</p>
      <ul style="margin:0 0 16px;padding-left:20px;">${itemsHtml}</ul>
      <p style="margin:0;font-size:16px;font-weight:700;">Total (estimate): $${totals.total.toFixed(2)}</p>
      ${approveBlock}
      <p style="margin:16px 0 0;font-size:12px;color:#5c6478;">No payment was collected on the website. Payment goes to your PayPal when the customer pays.</p>
    </td></tr>
  </table>
</body></html>`
}

export function buildCustomerEmailHtml({ orderNumber, customer, items, totals, shippingCost }) {
  const firstName = escapeHtml(customer.firstName.trim() || 'friend')
  const ref = escapeHtml(orderNumber)

  const itemRows = items
    .map((it) => {
      const lineTotal = it.price * it.quantity
      return `
        <tr>
          <td style="padding:16px 0;border-bottom:1px solid #e8e4dc;">
            <p style="margin:0 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#1a2744;">${escapeHtml(it.name)}</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#5c6478;">${escapeHtml(it.color)} · Size ${escapeHtml(it.size)} · Qty ${it.quantity}</p>
          </td>
          <td style="padding:16px 0;border-bottom:1px solid #e8e4dc;text-align:right;vertical-align:top;font-family:Georgia,serif;font-size:15px;color:#1a2744;white-space:nowrap;">${money(lineTotal)}</td>
        </tr>`
    })
    .join('')

  const shippingLine = shippingCost === 0 ? 'Complimentary' : money(shippingCost)

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f7f5f0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f5f0;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #e8e4dc;border-radius:4px;overflow:hidden;">
        <tr>
          <td style="background:#1a2744;padding:28px 32px;text-align:center;">
            <p style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#c9b896;">Sangeeta's Boutique</p>
            <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;font-style:italic;color:#ffffff;">Your inquiry is received</h1>
            <p style="margin:10px 0 0;font-family:Georgia,serif;font-size:12px;color:#a8b4c8;">Elegance · Beauty · Tradition</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 32px 24px;">
            <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:17px;line-height:1.6;color:#1a2744;">Dear ${firstName},</p>
            <p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;line-height:1.65;color:#3d4556;">
              Thank you for choosing us. <strong style="color:#1a2744;">You have exquisite taste.</strong>
              Sanji is personally reviewing your selection. If your order is confirmed, you will receive a <strong>separate email with PayPal payment instructions</strong>. <em>Nothing has been charged on our website yet.</em>
            </p>
            <table role="presentation" width="100%" style="margin:24px 0;background:#f7f5f0;border:1px solid #e8e4dc;border-radius:4px;">
              <tr>
                <td style="padding:18px 20px;text-align:center;">
                  <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#5c6478;">Your reference</p>
                  <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:700;color:#1a2744;letter-spacing:0.05em;">${ref}</p>
                  <p style="margin:8px 0 0;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Keep this handy for any follow-up</p>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1a2744;">What happens next</p>
            <table role="presentation" width="100%" style="margin:0 0 28px;">
              <tr>
                <td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;line-height:1.5;color:#3d4556;">
                  <span style="display:inline-block;width:22px;font-weight:700;color:#1a2744;">1.</span> Sanji reviews your inquiry (typically 1–2 business days)
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;line-height:1.5;color:#3d4556;">
                  <span style="display:inline-block;width:22px;font-weight:700;color:#1a2744;">2.</span> You receive a personal reply to confirm availability &amp; details
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-family:Georgia,serif;font-size:15px;line-height:1.5;color:#3d4556;">
                  <span style="display:inline-block;width:22px;font-weight:700;color:#1a2744;">3.</span> Payment &amp; delivery are arranged together — simple and human
                </td>
              </tr>
            </table>
            <p style="margin:0 0 8px;font-family:Georgia,serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#1a2744;border-bottom:2px solid #1a2744;padding-bottom:8px;">Your selection</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
              ${itemRows}
            </table>
            <table role="presentation" width="100%" style="margin:0 0 8px;">
              <tr><td style="padding:4px 0;font-family:Georgia,serif;font-size:14px;color:#5c6478;">Subtotal</td><td style="padding:4px 0;text-align:right;font-family:Georgia,serif;font-size:14px;color:#1a2744;">${money(totals.subtotal)}</td></tr>
              <tr><td style="padding:4px 0;font-family:Georgia,serif;font-size:14px;color:#5c6478;">Tax</td><td style="padding:4px 0;text-align:right;font-family:Georgia,serif;font-size:14px;color:#1a2744;">${money(totals.tax)}</td></tr>
              <tr><td style="padding:4px 0;font-family:Georgia,serif;font-size:14px;color:#5c6478;">Shipping</td><td style="padding:4px 0;text-align:right;font-family:Georgia,serif;font-size:14px;color:#1a2744;">${shippingLine}</td></tr>
              <tr><td colspan="2" style="padding:12px 0 4px;border-top:2px solid #1a2744;"></td></tr>
              <tr><td style="font-family:Georgia,serif;font-size:16px;font-weight:700;color:#1a2744;">Estimated total</td><td style="text-align:right;font-family:Georgia,serif;font-size:18px;font-weight:700;color:#1a2744;">${money(totals.total)}</td></tr>
            </table>
            <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:12px;font-style:italic;color:#5c6478;">Final total confirmed by Sanji when she replies.</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:15px;line-height:1.6;color:#3d4556;">
              Questions before you hear back? <strong style="color:#1a2744;">Reply to this email</strong> — we read every message.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background:#f7f5f0;padding:24px 32px;border-top:1px solid #e8e4dc;text-align:center;">
            <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:16px;font-style:italic;color:#1a2744;">With gratitude,</p>
            <p style="margin:0 0 12px;font-family:Georgia,serif;font-size:17px;font-weight:700;color:#1a2744;">Sanji</p>
            <p style="margin:0;font-family:Georgia,serif;font-size:12px;color:#5c6478;">Sangeeta's Boutique · Issaquah, WA</p>
            <p style="margin:16px 0 0;font-family:Georgia,serif;font-size:11px;color:#8a919e;">Inquiry confirmation only — not a payment receipt.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
