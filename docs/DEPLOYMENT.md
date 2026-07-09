# Deployment

**Production URL:** https://pub.dhe.org.in  
**Platform:** Vercel (region `bom1` — Mumbai)  
**Repository:** https://github.com/dhevb/pub.dhe.org.in

---

## Prerequisites

- Node.js ≥ 20
- Vercel account linked to `dhevb` GitHub org
- Environment variables configured in Vercel dashboard

---

## Vercel Configuration

`vercel.json` at repo root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "regions": ["bom1"]
}
```

### Host-based legacy redirects

`vercel.json` redirects old journal domains to the unified platform:

| Legacy host | Destination |
|-------------|-------------|
| `pub.rase.co.in` | `https://pub.dhe.org.in/:path*` |
| `vbe.rase.co.in` | `https://pub.dhe.org.in/vbe.rase/:path*` (root → `/vbe`) |
| `vie.rase.co.in` | `https://pub.dhe.org.in/vie.rase/:path*` (root → `/vie`) |
| `vbh.rase.co.in` | `https://pub.dhe.org.in/vbh.rase/:path*` (root → `/vbh`) |
| `vih.rase.co.in` | `https://pub.dhe.org.in/vih.rase/:path*` (root → `/vih`) |
| `vi.rase.co.in` | `https://pub.dhe.org.in/:path*` |

Additional path redirects are in `next.config.mjs` (e.g. `/AboutUs` → `/about`).

### Standalone redirect projects

`scripts/legacy-redirects/{pub,vbe,vie,vbh,vih}-rase-co-in/` contain minimal Vercel projects for domains that cannot use the main project's redirect rules.

---

## Environment Variables

Set in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://pub.dhe.org.in` | Canonical URL, metadata, sitemap |
| `NEXT_PUBLIC_API_URL` | Yes | `https://vie-rase-backend.onrender.com` | Backend API base |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | `G-XXXXXXXX` | Google Analytics 4 |
| `NEXT_PUBLIC_GSC_VERIFICATION` | No | `abc123...` | Google Search Console |
| `NEXT_PUBLIC_CLARITY_ID` | No | `xxxxxxxx` | Microsoft Clarity |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No | `pub.dhe.org.in` | Plausible analytics |
| `NEXT_PUBLIC_MATOMO_URL` | No | `https://analytics.example.com` | Matomo |
| `SENTRY_DSN` | No | `https://...@sentry.io/...` | Error monitoring |

Validated by `src/lib/env.ts` (Zod). Missing optional vars log warnings in production only.

**Note:** `.env.example` is referenced in README but may need to be created locally:

```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

---

## Deploy Workflow

### Standard (Vercel Git integration)

1. Push to `platform-upgrade` or `main`
2. Vercel auto-builds on push (GitHub integration enabled in `vercel.json`)
3. Preview deployments created for PRs

### Manual

```bash
npm ci
npm run lint
npm run qa:papers
npm run build
# Vercel CLI: vercel --prod
```

### CI pipeline

`.github/workflows/ci.yml` runs on push/PR to `main`, `master`, `platform-upgrade`:

```
npm ci → lint → qa:papers → build
```

---

## Production Checklist

After every production deploy:

```bash
# 1. Health check
curl https://pub.dhe.org.in/api/health

# 2. Paper integrity (local or CI)
npm run qa:papers

# 3. Smoke test (against production)
BASE_URL=https://pub.dhe.org.in node scripts/qa/smoke.mjs

# 4. Google Scholar meta (manual)
node scripts/qa/verify-scholar.mjs
```

### Verify manually

- [ ] Homepage loads at https://pub.dhe.org.in
- [ ] All 4 journal entry routes (`/vbe`, `/vbh`, `/vie`, `/vih`)
- [ ] Sample paper: `/vbe.rase/Paper1`
- [ ] Login → dashboard redirect works
- [ ] `/sitemap.xml` returns ~83 URLs
- [ ] `/robots.txt` disallows `/dashboard/`, `/api/`
- [ ] Legacy domain redirect (e.g. `vbe.rase.co.in` → unified URL)
- [ ] `/api/health` shows `security.csrf: double-submit-cookie`

See also: `docs/PRODUCTION_CHECKLIST.md`, `docs/LAUNCH_READINESS.md`

---

## Build Output

Expected: **123 static pages**, middleware ~28 kB, homepage First Load JS ~107 kB (post Phase 9).

```bash
npm run build
# ○ /    4.36 kB    107 kB First Load JS
# + First Load JS shared by all    87.3 kB
```

---

## Backend Dependency

The Render backend (`vie-rase-backend.onrender.com`) cold-starts on free tier. `/api/health` reports `backend.status: down` during cold start — this is expected and does not block static pages.

---

## Rollback

1. Vercel Dashboard → Deployments → select previous deployment → **Promote to Production**
2. Or revert git commit and push

**Never** force-push `main` without team approval.

---

## Related Docs

- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [SECURITY.md](./SECURITY.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
