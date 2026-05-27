# Resend email handoff (Sanji's Label)

Use this checklist when handing the site to Sanji or deploying to production.

## What Resend powers

| Flow | Trigger | Emails sent |
|------|---------|-------------|
| **Order inquiry** | Customer submits checkout (no payment on site) | 1) Sanji — order details + **Approve & send payment** link · 2) Customer — inquiry confirmation |
| **Order approval** | Sanji clicks approve link in her email | Customer — PayPal link + QR (via Resend) |
| **Booking** | Customer submits `/booking` | 1) Sanji — appointment request · 2) Customer — request received |

Payment is **never** processed on the website. PayPal happens offline after approval.

## Environment variables

Copy `.env.example` → `.env.local` (local) and set the same keys in **Vercel → Project → Settings → Environment Variables** (Production).

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | API key from [resend.com/api-keys](https://resend.com/api-keys) (`re_…`) |
| `SANJI_ORDER_EMAIL` | Inbox for orders & bookings (`sanjimunoth@gmail.com`) |
| `RESEND_FROM_EMAIL` | Verified sender (e.g. `orders@sanjislabel.com`) |
| `ORDER_APPROVAL_SECRET` | Long random string (32+ chars) — signs approve links |
| `NEXT_PUBLIC_SITE_URL` | Production URL, no trailing slash (e.g. `https://sanjislabel.com`) |
| `PAYPAL_BUSINESS_EMAIL` | PayPal payment links after approval |
| `PAYPAL_ME_USERNAME` | Optional; overrides email if Sanji has PayPal.me |

### Resend domain (production)

1. In Resend: **Domains** → add Sanji's domain → add DNS records.
2. Set `RESEND_FROM_EMAIL` to an address on that domain (e.g. `orders@yourdomain.com`).
3. Do **not** rely on `onboarding@resend.dev` in production — it only sends to the Resend account owner's email until a domain is verified.

## Verify before go-live

```bash
npm run verify:resend
```

Fix any ✗ lines in `.env.local` or Vercel, then re-run.

## Manual smoke test

1. **Booking** — Submit `/booking` with your email → Sanji inbox + your confirmation.
2. **Order** — Add item to bag → checkout → submit inquiry → Sanji email with approve button + customer confirmation.
3. **Approve** — Click approve in Sanji's email → customer receives PayPal instructions; `/order-approved?sent=1` loads.

## Sanji's daily workflow

1. Customer places **order inquiry** on the site.
2. Sanji receives email → reviews items → clicks **Approve & send payment link**.
3. Customer gets PayPal email → pays outside the site.
4. **Bookings**: Sanji replies by email/phone to confirm time (site does not auto-schedule).

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Email is not configured" | Set all three Resend vars on Vercel; redeploy |
| Customer never gets mail; Sanji does | Check spam; verify `RESEND_FROM_EMAIL` domain |
| No approve button in Sanji's email | Set `ORDER_APPROVAL_SECRET` and redeploy |
| Approve link fails | Set `NEXT_PUBLIC_SITE_URL` to production URL |
| PayPal email fails after approve | Set `PAYPAL_BUSINESS_EMAIL` or `PAYPAL_ME_USERNAME` |

Resend dashboard **Logs** show delivery/bounce details for each send.
