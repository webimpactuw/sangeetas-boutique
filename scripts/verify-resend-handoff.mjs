#!/usr/bin/env node
/**
 * Checks Resend / order-email env for local or Vercel handoff.
 * Usage: node scripts/verify-resend-handoff.mjs
 * Loads .env.local if present (does not print secret values).
 */

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

function loadEnvLocal() {
  const path = join(process.cwd(), '.env.local')
  if (!existsSync(path)) return false
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
  return true
}

function check(name, ok, hint = '') {
  const mark = ok ? '✓' : '✗'
  console.log(`  ${mark} ${name}${hint ? ` — ${hint}` : ''}`)
  return ok
}

loadEnvLocal()

const apiKey = process.env.RESEND_API_KEY?.trim()
const sanji = process.env.SANJI_ORDER_EMAIL?.trim()
const from = process.env.RESEND_FROM_EMAIL?.trim()
const secret = process.env.ORDER_APPROVAL_SECRET?.trim()
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
const paypal =
  process.env.PAYPAL_BUSINESS_EMAIL?.trim() ||
  process.env.PAYPAL_ME_USERNAME?.trim()

console.log('\nSanji\'s Label — Resend handoff check\n')

let allOk = true
allOk = check('RESEND_API_KEY', Boolean(apiKey && apiKey.startsWith('re_'))) && allOk
allOk = check('SANJI_ORDER_EMAIL', Boolean(sanji), sanji || 'set to Sanji inbox') && allOk
allOk = check('RESEND_FROM_EMAIL', Boolean(from), from || 'verified domain or onboarding@resend.dev') && allOk
allOk =
  check(
    'ORDER_APPROVAL_SECRET',
    Boolean(secret && secret.length >= 16),
    secret ? 'approve links enabled' : 'required for Approve & pay email button',
  ) && allOk
allOk =
  check(
    'NEXT_PUBLIC_SITE_URL',
    Boolean(siteUrl && !siteUrl.includes('localhost')),
    siteUrl || 'set production URL on Vercel',
  ) && allOk
allOk =
  check(
    'PayPal (PAYPAL_BUSINESS_EMAIL or PAYPAL_ME_USERNAME)',
    Boolean(paypal),
    'needed after Sanji approves an order',
  ) && allOk

if (from?.includes('@resend.dev')) {
  console.log(
    '\n  ⚠ RESEND_FROM_EMAIL uses onboarding@resend.dev — Resend only delivers to your',
  )
  console.log('    signup email until you verify a domain. Use a verified sender in production.\n')
}

console.log('\nEmail flows covered by these vars:')
console.log('  • Checkout order inquiry → Sanji + customer confirmation')
console.log('  • Approve link in Sanji email → customer PayPal instructions')
console.log('')

if (allOk) {
  console.log('Ready for handoff (env looks complete).\n')
  process.exit(0)
}

console.log('Fix missing items in .env.local (local) or Vercel → Settings → Environment Variables.\n')
process.exit(1)
