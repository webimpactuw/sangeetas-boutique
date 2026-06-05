import { DEFAULT_TAX_RATE, calculateTotals } from './cart'
import { buildCustomerEmailHtml, buildSanjiEmailHtml } from './orderInquiryEmails'
import { buildPaymentInstructionsHtml } from './paymentEmails'
import { buildPayPalMeUrl, buildPayPalQrImageUrl } from './paypal'

export function isEmailPreviewEnabled() {
  return (
    process.env.NODE_ENV === 'development' ||
    process.env.ENABLE_EMAIL_PREVIEW === 'true'
  )
}

const SAMPLE_ITEMS = [
  {
    name: 'Gold silk lehenga',
    color: 'Gold',
    size: 'M',
    price: 275,
    quantity: 1,
  },
  {
    name: 'Kundan choker set',
    color: 'Gold',
    size: 'One size',
    price: 85,
    quantity: 1,
  },
]

const SAMPLE_CUSTOMER = {
  firstName: 'Priya',
  lastName: 'Sharma',
  email: 'priya@example.com',
  phone: '425-677-5848',
}

const SAMPLE_ORDER_NUMBER = 'SNJ-482901'
const SAMPLE_SHIPPING_COST = 0

function getSampleTotals() {
  return calculateTotals(SAMPLE_ITEMS, {
    shippingCost: SAMPLE_SHIPPING_COST,
    taxRate: DEFAULT_TAX_RATE,
  })
}

/**
 * @returns {Array<{ id: string; title: string; audience: string; when: string; html: string }>}
 */
export function buildEmailPreviews() {
  const totals = getSampleTotals()
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://sangeetas-boutique.vercel.app'
  const approveUrl = `${siteUrl}/api/orders/approve?token=sample-preview-only`
  const paypalUrl =
    buildPayPalMeUrl(totals.total) ||
    'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sanjimunoth@gmail.com&currency_code=USD&amount=385.88'
  const qrImageUrl = buildPayPalQrImageUrl(paypalUrl)

  const inquiryContext = {
    orderNumber: SAMPLE_ORDER_NUMBER,
    customer: SAMPLE_CUSTOMER,
    items: SAMPLE_ITEMS,
    totals,
    shippingCost: SAMPLE_SHIPPING_COST,
  }

  return [
    {
      id: 'sanji-inquiry',
      title: '1. New order inquiry',
      audience: 'Sanji',
      when: 'When a customer submits checkout',
      html: buildSanjiEmailHtml({ ...inquiryContext, approveUrl }),
    },
    {
      id: 'customer-inquiry',
      title: '2. Inquiry confirmation',
      audience: 'Customer',
      when: 'Same moment — right after they submit',
      html: buildCustomerEmailHtml(inquiryContext),
    },
    {
      id: 'customer-payment',
      title: '3. Payment instructions',
      audience: 'Customer',
      when: 'After Sanji clicks “Approve & send payment link”',
      html: buildPaymentInstructionsHtml({
        orderNumber: SAMPLE_ORDER_NUMBER,
        customer: SAMPLE_CUSTOMER,
        items: SAMPLE_ITEMS,
        total: totals.total,
        paypalUrl,
        qrImageUrl,
      }),
    },
  ]
}
