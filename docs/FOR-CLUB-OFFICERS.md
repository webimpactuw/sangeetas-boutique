# Club officers — what we need to go live

**For:** Whoever manages Vercel, Resend, Supabase, and the live domain  
**From:** Web team (dev setup is done; we need production accounts configured)

The website code is ready. Customers can browse, add to bag, and submit **order inquiries**. Sanji approves by email, then the customer gets **PayPal instructions** — nothing is charged on the website.

---

## Part A — Resend (email) — ~30–60 minutes

**Who:** Officer with access to [resend.com](https://resend.com) (or create a club Resend account)

### A1. Create / open the Resend account

- Use a shared club email if possible (not a personal student email that graduates).
- Invite Sanji or officers who need to see delivery logs.

### A2. Verify a sending domain (required for real customers)

Without this, emails only work for testing and often **do not reach customers**.

1. In Resend: **Domains** → **Add domain**
2. Use the boutique’s real domain (e.g. the same domain as the live website), **or** a subdomain like `mail.sanjislabel.com`
3. Resend will show **DNS records** (TXT, DKIM, etc.)
4. Add those records wherever the domain is managed (GoDaddy, Cloudflare, Google Domains, etc.)
5. Wait until Resend shows the domain as **Verified** (can take a few minutes to 48 hours)

### A3. Create an API key

1. Resend → **API Keys** → **Create API Key**
2. Name it e.g. `sangeetas-boutique-production`
3. Copy the key once (starts with `re_`) — **send it to the web team securely** (1Password, not public Slack)

### A4. Choose the “from” address

After the domain is verified, pick something like:

- `orders@sanjislabel.com`  
  (must use the **verified** domain)

**Do not use** `onboarding@resend.dev` in production — it is for dev only.

### A5. Send these values to the web team (secure channel)

| What | Example / notes |
|------|------------------|
| Resend API key | `re_xxxxxxxx` |
| From email | `orders@yourdomain.com` |
| Sanji’s inbox for orders | `sanjimunoth@gmail.com` (confirm with Sanji) |

---

## Part B — Vercel (hosting) — ~20 minutes

**Who:** Officer with access to the club’s [Vercel](https://vercel.com) project

Repo: **webimpactuw/sangeetas-boutique** (branch: `main`)

### B1. Confirm the site deploys

1. Open the Vercel project for this site
2. Ensure latest `main` is deployed (or click **Redeploy**)
3. Note the live URL (e.g. `https://sangeetas-boutique.vercel.app` or custom domain)

### B2. Add environment variables

**Vercel → Project → Settings → Environment Variables**

Add each row for **Production** (and Preview if you want staging to work the same).

| Variable name | Who provides the value | Notes |
|---------------|------------------------|--------|
| `RESEND_API_KEY` | Resend officer (Part A) | `re_…` |
| `SANJI_ORDER_EMAIL` | Sanji | Where order & booking notifications go |
| `RESEND_FROM_EMAIL` | Resend officer | Verified address, e.g. `orders@domain.com` |
| `ORDER_APPROVAL_SECRET` | **Generate new** | Random 32+ characters (password generator). **Do not share publicly.** |
| `NEXT_PUBLIC_SITE_URL` | Officers | Final public URL, **no** trailing `/` — e.g. `https://www.sanjislabel.com` |
| `PAYPAL_BUSINESS_EMAIL` | Sanji | PayPal for payment links after approval |
| `NEXT_PUBLIC_PAYPAL_BUSINESS_EMAIL` | Sanji | Same as above (can duplicate) |
| `PAYPAL_ME_USERNAME` | Sanji | Optional — only if she has PayPal.me |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase officer | See Part C |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase officer | See Part C |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Web team or Sanity | Usually `ybn5breb` unless changed |
| `NEXT_PUBLIC_SANITY_DATASET` | Web team or Sanity | Usually `production` |

**Generate `ORDER_APPROVAL_SECRET` example:**  
Use a password manager or https://1password.com/password-generator/ — 32+ random letters/numbers. Paste into Vercel only.

### B3. Redeploy after saving env vars

**Deployments → … → Redeploy** (production).  
Env vars do not apply to old deployments until you redeploy.

### B4. Custom domain (if you have one)

1. Vercel → **Domains** → add the boutique domain
2. Point DNS as Vercel instructs
3. Set `NEXT_PUBLIC_SITE_URL` to that exact URL (with `https://`)
4. Redeploy again

---

## Part C — Supabase (login & favorites) — ~15 minutes

**Who:** Officer with access to the Supabase project

1. **Project Settings → API** — copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Paste both into Vercel (Part B table)
3. **Authentication → URL configuration** — add:
   - Site URL: your production URL
   - Redirect URLs:  
     `https://YOUR-DOMAIN/auth/callback`  
     `https://YOUR-DOMAIN/**` (wildcard if Supabase allows)
4. **SQL Editor** — run the script from the repo file:  
   `supabase/migrations/20260519000000_favorites.sql`  
   (creates the favorites table)

---

## Part D — Sanity (Sanji edits content) — web team or one technical officer

Sanji updates products and gallery at **`https://YOUR-DOMAIN/studio`**

**One-time (needs someone with repo access):**

```bash
npm run sanity:schemas:deploy
```

Officers without coding access can ask the web team to run this once before launch.

---

## Part E — Launch day test (officers + Sanji)

Do this on the **live** URL after Vercel redeploy:

- [ ] Home page and shop categories load
- [ ] Add item to bag → **Confirm your request** → submit checkout with a **test email**
- [ ] Sanji receives order email with **Approve** button
- [ ] Customer test email receives confirmation
- [ ] Sanji clicks Approve → customer gets PayPal email (QR is OK **only** in this email, not on cart)
- [ ] `/booking` shows the correct Calendly (confirm link with Sanji)
- [ ] Sign up / log in / favorite a product (if Supabase done)

---

## What the web team already did (no officer action)

- Removed PayPal/Venmo QR from cart until Sanji approves
- Product categories: Lehengas, Sarees, Indo-Western, Readymade Sarees
- Gallery photos on the site
- Sanity product + gallery content types in code

---

## Who to contact

| Issue | Who |
|-------|-----|
| Vercel deploy / domain / env vars | Vercel officer |
| Emails not sending / domain DNS | Resend officer |
| Login / favorites broken | Supabase officer |
| Website bugs / content structure | Web dev team |

---

## Quick message you can paste to officers

See bottom of this file — also in the web team’s handoff email.
