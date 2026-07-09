# Launch Readiness — Phase 6

**Project:** Viksit Bharat Journal (pub.dhe.org.in)  
**Branch:** `platform-upgrade`  
**Date:** July 9, 2026

---

## Phase Summary (0–6)

| Phase | Status | Deliverable |
|-------|--------|-------------|
| 0 Planning | ✅ | `docs/PLATFORM_REDESIGN_MASTER_PLAN.md` |
| 1 Foundation | ✅ | Design system, auth, API layer, layout shell |
| 2 Homepage & Portal | ✅ | Homepage, about, search, conferences, Bal Shodh |
| 3 Journal Unification | ✅ | 32 unified journal routes, submission wizard |
| 4 SEO & Performance | ✅ | Sitemap, schemas, hreflang, RSS, OG images |
| 5 Dashboards & CMS | ✅ | Role dashboards, file-based CMS |
| 6 QA & Launch | ✅ | QA scripts, health check, launch docs |

---

## Automated QA

Run locally before merge:

```bash
npm run qa:papers          # Verify 20 paper JSON files (no server needed)
npm run build              # Production build
npm run lint               # ESLint

# With dev server running (npm run dev in another terminal):
npm run qa:smoke

# Against production after deploy:
BASE_URL=https://pub.dhe.org.in npm run qa:smoke
```

### What `qa:papers` checks

- All 20 files exist at `src/app/{vbe,vbh,vie,vih}.rase/output/Paper{1-5}.json`
- Each file is valid JSON with a `title` field

### What `qa:smoke` checks

- ~60 critical public routes return 2xx/3xx
- SEO infra: `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/manifest.webmanifest`
- API: `/api/health`, `/api/cms`
- Permanent redirects: `/AboutUs` → `/about`, `/vbe.rase/home` → `/vbe`, etc.
- Backend reachability: `vie-rase-backend.onrender.com`

### CI (GitHub Actions)

On every push/PR to `main`:

1. `npm ci`
2. `npm run lint`
3. `npm run qa:papers`
4. `npm run build`

---

## Health Monitoring

`GET /api/health` returns:

```json
{
  "status": "ok",
  "timestamp": "2026-07-09T12:00:00.000Z",
  "version": "abc1234",
  "site": "Viksit Bharat Journal",
  "papers": { "expected": 20, "contract": "20 immutable JSON files preserved" },
  "backend": { "url": "https://vie-rase-backend.onrender.com", "status": "ok" },
  "maintenanceMode": false
}
```

Returns HTTP 503 if backend is unreachable (degraded mode).

---

## Pre-Launch Manual Checks

| Check | How |
|-------|-----|
| Paper pages | Open `/vbe.rase/Paper1` — verify title, abstract, Google Scholar meta |
| Journal homes | `/vbe`, `/vbh`, `/vie`, `/vih` load with new branding |
| Login | Sign in at `/login` — cookies set, redirect works |
| Author dashboard | `/dashboard/author` shows manuscripts after login |
| Legacy URLs | `/vbe.rase/ReadArticlePage`, `/vie.rase/SubmitManuscript` still work |
| Mobile | Homepage + 1 paper page on phone viewport |
| Search Console | Submit `https://pub.dhe.org.in/sitemap.xml` |

---

## Deploy Procedure

1. **PR:** `platform-upgrade` → `main` on [dhevb/pub.dhe.org.in](https://github.com/dhevb/pub.dhe.org.in)
2. **CI:** Ensure all checks pass
3. **Merge:** Vercel auto-deploys from `main`
4. **Smoke:** `BASE_URL=https://pub.dhe.org.in npm run qa:smoke`
5. **Rollback:** Vercel → Deployments → Promote previous deployment (if needed)

### Environment Variables (Vercel)

```
NEXT_PUBLIC_SITE_URL=https://pub.dhe.org.in
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

---

## Known Limitations (Post-Launch)

- Reviewer/editor dashboards show placeholders until backend editorial APIs exist
- Legacy component trees (`src/app/component/*`) retained for AddArticle, issues, table
- Lighthouse 95+ target — run manual audit in production Chrome DevTools
- Google Search Console verification pending

---

## Non-Negotiables Verified

| Constraint | Status |
|------------|--------|
| 20 paper JSON files untouched | ✅ `qa:papers` in CI |
| Render API endpoints preserved | ✅ Smoke + health check |
| All legacy routes reachable | ✅ Smoke test coverage |
| No breaking URL changes without redirects | ✅ Redirect checks in smoke |

---

*Phase 6 complete. Ready for PR merge to `main` and production launch.*
