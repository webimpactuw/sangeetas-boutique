# Deployment checklist — Sanji's Label

## 1. Pull latest & env vars (Vercel)

Set in **Vercel → Project → Settings → Environment Variables** (Production):

| Variable | Required |
|----------|----------|
| `RESEND_API_KEY` | Yes |
| `SANJI_ORDER_EMAIL` | Yes |
| `RESEND_FROM_EMAIL` | Yes (verified domain) |
| `ORDER_APPROVAL_SECRET` | Yes (32+ random chars) |
| `NEXT_PUBLIC_SITE_URL` | Yes (production URL, no trailing slash) |
| `PAYPAL_BUSINESS_EMAIL` | Yes (for post-approval payment emails) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (if using accounts/favorites) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes (`production`) |

See also [`RESEND-HANDOFF.md`](./RESEND-HANDOFF.md).

## 2. Sanity Studio (content for Sanji)

1. Deploy schemas: `npm run sanity:schemas:deploy`
2. Open Studio: `npx sanity dev` (local) or host at sanity.io
3. Sanji uses numbered sections in the sidebar:
   - **Site settings** — promo bar, footer, phone
   - **Home page** — hero, categories, reviews
   - **Products** — add each piece (photo, price, category)
   - **Gallery photos** — reorder portfolio images

Guide for Sanji: [`SANITY-FOR-SANJI.md`](./SANITY-FOR-SANJI.md)

Optional seed (images + starter docs): `npm run sanity:seed` with `SANITY_API_WRITE_TOKEN` in `.env.local`.

## 3. Supabase (favorites)

Run SQL in `supabase/migrations/20260519000000_favorites.sql` once in the Supabase SQL editor.

## 4. Verify before launch

```bash
npm run verify:resend
npm run build
npm test
```

**Smoke tests**

- Home, apparel filters (Lehengas, Sarees, Indo-Western, Readymade Sarees)
- Add to bag → checkout inquiry (no PayPal QR on cart)
- Sanji approve link → customer PayPal email (QR only after approval)
- Gallery & product pages from Sanity when products exist

## 5. Payment flow (important)

- **Cart / checkout:** inquiry only — no PayPal or Venmo QR before Sanji approves.
- **After approval:** customer receives PayPal link + QR by email.
