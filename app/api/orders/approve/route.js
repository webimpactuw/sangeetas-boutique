import { NextResponse } from 'next/server'
import { verifyApprovalToken } from '../../../lib/orderApprovalToken'
import { sendPaymentInstructionsEmail } from '../../../lib/sendPaymentInstructions'
import { getSiteUrl } from '../../../lib/siteUrl'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const base = getSiteUrl()

  if (!token) {
    return NextResponse.redirect(`${base}/order-approved?error=missing`)
  }

  const payload = verifyApprovalToken(token)
  if (!payload) {
    return NextResponse.redirect(`${base}/order-approved?error=invalid`)
  }

  const result = await sendPaymentInstructionsEmail(payload)
  if (!result.ok) {
    const reason = encodeURIComponent(result.error || 'send')
    return NextResponse.redirect(`${base}/order-approved?error=${reason}`)
  }

  const customer = encodeURIComponent(payload.customer.email)
  const order = encodeURIComponent(payload.orderNumber)
  return NextResponse.redirect(`${base}/order-approved?sent=1&order=${order}&customer=${customer}`)
}
