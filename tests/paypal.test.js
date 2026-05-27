import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

describe('buildPayPalMeUrl', () => {
  it('builds email-based PayPal link when business email is set', async () => {
    process.env.PAYPAL_ME_USERNAME = ''
    process.env.PAYPAL_BUSINESS_EMAIL = 'sanjimunoth@gmail.com'
    const { buildPayPalMeUrl } = await import('../app/lib/paypal.js')
    const url = buildPayPalMeUrl(150)
    assert.ok(url?.includes('sanjimunoth%40gmail.com') || url?.includes('sanjimunoth@gmail.com'))
    assert.ok(url?.includes('150.00'))
  })
})
