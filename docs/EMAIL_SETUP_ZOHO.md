# Company Email Setup — Zoho Mail on calmdevlabs.com

**Status (2026-10-10):** not yet provisioned. The website is configured for the
planned address **`contact@calmdevlabs.com`** and shows a visible "company email
being set up" notice until this is done. After provisioning, flip
`emailProvisioned: true` in `src/config.ts`, rebuild, and redeploy.

> Record values below are Zoho's documented defaults — confirm against Zoho's
> current setup wizard when applying. Do not change production DNS without the
> founder's explicit approval.

## 1. Create the Zoho Mail organization

1. Go to Zoho Mail's site and sign up for a Mail organization (free tier covers a
   small team; paid tiers add storage/users — choose only what you need).
2. Add domain `calmdevlabs.com` when prompted.

## 2. Verify domain ownership (Cloudflare DNS)

Zoho gives you a unique TXT record, e.g.:

- Type: `TXT`, Host: `@`, Value: `zoho-verification=zbxxxxxxxx.dmn` (value comes
  from the Zoho wizard — copy it exactly).

Add it in Cloudflare (DNS only is fine for TXT), then click Verify in Zoho.

## 3. Add MX records (Cloudflare DNS)

Delete any existing MX records for `calmdevlabs.com`, then add Zoho's:

| Host | Value | Priority |
|---|---|---|
| `@` | `mx.zoho.com` | 10 |
| `@` | `mx2.zoho.com` | 20 |
| `@` | `mx3.zoho.com` | 50 |

## 4. SPF, DKIM, DMARC (deliverability — do not skip)

- **SPF** — TXT at `@`: `v=spf1 include:zoho.com ~all`
  (if you already have an SPF record, merge: only one SPF record per domain).
- **DKIM** — in Zoho Mail admin panel: generate the DKIM key for the domain, then
  add the TXT record Zoho shows (host looks like `zmail._domainkey`).
- **DMARC** — TXT at `_dmarc`: `v=DMARC1; p=none; rua=mailto:contact@calmdevlabs.com`
  (start at `p=none`, tighten later once mail flow is confirmed).

## 5. Create the mailbox

In Zoho admin: add user `contact@calmdevlabs.com` (and any aliases, e.g.
`hello@`, `support@` → same mailbox if desired).

## 6. Test

Send an email from the new address to an external inbox (e.g. Gmail) and reply
to it. Check SPF/DKIM/DMARC pass in the received headers.

## 7. Flip the website switch

1. In `src/config.ts`: set `emailProvisioned: true`.
2. `npm run build`, commit, push — the "being set up" notice disappears and the
   contact page treats the address as live.
3. Update `docs/CONTENT_CHECKLIST.md` (contact email row → ✅).

## Notes

- DNS propagation can take minutes to 48h; MX changes affect **receiving** mail.
- Keep the Cloudflare proxy (orange cloud) OFF for MX/TXT records — use DNS only.
- Free Zoho tier limits: check current plan limits before promising SLAs to clients.
