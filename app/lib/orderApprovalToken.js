import crypto from 'crypto'
import { getSiteUrl } from './siteUrl'

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function getSecret() {
  return process.env.ORDER_APPROVAL_SECRET || ''
}

export function createApprovalToken(payload) {
  const secret = getSecret()
  if (!secret) return null

  const body = {
    ...payload,
    exp: Date.now() + TOKEN_TTL_MS,
  }
  const data = Buffer.from(JSON.stringify(body)).toString('base64url')
  const sig = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  return `${data}.${sig}`
}

export function verifyApprovalToken(token) {
  const secret = getSecret()
  if (!secret || !token) return null

  const [data, sig] = token.split('.')
  if (!data || !sig) return null

  const expected = crypto.createHmac('sha256', secret).update(data).digest('base64url')
  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expected)
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'))
    if (!payload.exp || Date.now() > payload.exp) return null
    if (!payload.orderNumber || !payload.customer?.email) return null
    return payload
  } catch {
    return null
  }
}

export function buildApprovalUrl(token) {
  return `${getSiteUrl()}/api/orders/approve?token=${encodeURIComponent(token)}`
}
