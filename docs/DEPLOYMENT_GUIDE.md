# CalmDevLabs Website — Deployment Guide

Production domain: **`calmdevlabs.com`** (apex canonical; `www.calmdevlabs.com`
redirects to apex).

## 1. Target architecture

- **Hosting:** GitHub Pages (free, no recurring cost).
- **DNS:** Cloudflare (registrar + DNS provider).
- **Build:** GitHub Actions → Vite production build → `dist/` → Pages artifact.
- **Repo:** `NileshGodase/calmdevlabs-website`, default branch `main`.

## 2. Repository preparation

1. `CNAME` file at repo root (copied to `dist/` by the build) contains exactly:
   ```
   calmdevlabs.com
   ```
2. `.gitignore` covers `node_modules/`, `dist/`, OS/editor files.
3. `package-lock.json` committed; reproducible installs via `npm ci`.

## 3. GitHub Actions workflow (`.github/workflows/deploy.yml`)

Uses current official actions (`actions/checkout`, `actions/setup-node`,
`actions/upload-pages-artifact`, `actions/deploy-pages`) with Pages permissions:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

Steps: checkout → setup Node (pinned, npm cache) → `npm ci` →
`npm run typecheck` → `npm run build` → upload `./dist` → deploy to Pages.
Deploys on push to `main` (and on manual dispatch). Failures are visible in the
Actions tab.

## 4. GitHub Pages settings (manual, one-time)

1. Repo → **Settings → Pages** → Source: **GitHub Actions**.
2. **Custom domain:** enter `calmdevlabs.com` → Save. Pages issues a Let's Encrypt
   certificate (minutes to hours).
3. Tick **Enforce HTTPS** once the certificate is active.

Do not change these settings without the founder's explicit approval.

## 5. Cloudflare DNS configuration

> Verify record targets against current official GitHub Pages documentation before
> applying. Never change production DNS without explicit approval.

**During initial verification:** set DNS records to **DNS only** (grey cloud —
proxy OFF). Proxying can interfere with GitHub's domain verification and
certificate issuance. Re-enable proxying after HTTPS works, if desired.

**Apex** (`calmdevlabs.com`): A records → GitHub Pages' documented apex IPs
(currently `185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
`185.199.111.153` — confirm against current docs when applying).

**`www`** (`www.calmdevlabs.com`): CNAME → `nileshgodase.github.io`.

Remove any conflicting A/AAAA/CNAME records for the same hostnames first.
Note: Zoho Mail records (MX/TXT, see `docs/EMAIL_SETUP_ZOHO.md`) coexist fine —
they are different record types/hostnames.

## 6. www → apex redirect

Add a Cloudflare redirect rule: `www.calmdevlabs.com/*` → `https://calmdevlabs.com/$1`
(status 301). Canonical URLs, sitemap, and OG tags all use the apex.

## 7. Verify

```bash
dig +short calmdevlabs.com        # expect GitHub Pages IPs
dig +short www.calmdevlabs.com    # expect CNAME chain to nileshgodase.github.io
curl -sI https://calmdevlabs.com | head -5   # expect 200 + valid cert
```

In Pages settings: "DNS check successful" and HTTPS enforced.

## 8. Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| "Not secure" / cert pending | DNS still propagating or proxy was on during verification; turn proxy off, wait, re-save domain |
| Domain verification fails | Conflicting DNS records; wrong CNAME target; check with `dig` |
| 404 on subpages | `base` misconfigured or missing page in `dist/`; verify build output |
| Mixed content warnings | All asset URLs must be relative or `https://` |
| Changes not appearing | Actions run failed; or browser/CDN cache — check deployed commit in Pages settings |

## 9. Ongoing

- Every push to `main` redeploys automatically. Keep `main` deployable.
- Never force-push. Never commit secrets; rotate immediately if leaked.
- After any domain/DNS change, re-run the §7 checks.
