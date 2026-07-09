# Troubleshooting

Common issues and fixes for local development and production.

---

## Development Setup

### `npm install` fails

```bash
# Ensure Node 20+
node -v   # should be >= 20

# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### `npm run dev` — port in use

```powershell
# Windows
Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
npm run dev
```

### `.env.local` missing

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://vie-rase-backend.onrender.com
```

README references `.env.example` — create `.env.local` manually if example file absent.

---

## Build Errors

### `EPERM` on `.next/trace` (Windows)

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build
```

Or verify types without full build:

```bash
npm run build   # generate .next/types first
npx tsc --noEmit
```

### `tsc` errors about `.next/types` not found

Run `npm run build` before `npx tsc --noEmit`.

### ESLint warnings (non-blocking)

| File | Warning | Fix |
|------|---------|-----|
| `Notification.tsx` | `<img>` instead of `next/image` | Legacy — low priority |
| `Filter.tsx` | useMemo deps | Wrap `allArticles` in useMemo |

---

## Authentication

### Login returns 403 "Invalid CSRF token"

1. Ensure `CsrfBootstrap` runs (in `Providers`)
2. Hard refresh to get new CSRF cookie
3. Check browser allows cookies (not blocked)
4. Verify `GET /api/csrf` returns 200

### Login succeeds but dashboard redirects to login

- Check `token` or `auth-token` cookie is set (DevTools → Application → Cookies)
- Cookies require HTTPS in production (`secure: true`)
- On localhost, `secure: false` in development

### Manuscript list empty on author dashboard

- `GET /api/manuscripts` requires `userId` cookie
- Verify login via `/api/auth/login` (not direct backend call)
- Backend may be cold-starting — wait 30s and retry

### Legacy manuscript flow auth issues

Legacy components use `localStorage`. After login via modern flow, `persistLegacyAuth()` should populate localStorage. If not:

```javascript
// Browser console — check
localStorage.getItem('userId')
localStorage.getItem('token')
```

---

## API / Backend

### `/api/health` shows `backend.status: down`

Render free tier cold start. Wait 30–60 seconds and retry. Static pages still work.

### API errors `502 Bad Gateway`

Backend unreachable. Check:
- `NEXT_PUBLIC_API_URL` in Vercel env
- https://vie-rase-backend.onrender.com/api/vbe_getallarticles

### CORS errors on legacy pages

Legacy components call backend directly. Backend must allow origin. Modern flows use Next.js BFF routes (same-origin).

### Rate limit 429

Wait for `Retry-After` seconds. Limits reset per minute per IP. Do not brute-force login in tests.

---

## QA Scripts

### `npm run qa:papers` fails

```
Paper missing: src/app/vbe.rase/output/Paper1.json
```

Restore paper JSON from git. **Never delete paper files.**

### `npm run qa:smoke` timeout

Dev server slow to compile first request:

```bash
# Terminal 1
npm run dev
# Wait for "Ready", then Terminal 2:
npm run qa:smoke

# Or test production:
BASE_URL=https://pub.dhe.org.in node scripts/qa/smoke.mjs
```

### Smoke test single route failure

```bash
QA_TIMEOUT_MS=30000 BASE_URL=http://localhost:3000 node scripts/qa/smoke.mjs
```

---

## SEO / Scholar

### `citation_issn` missing on production

Verify deploy includes commit `688e383` or later. Check:

```bash
curl -s https://pub.dhe.org.in/vbe.rase/Paper1 | grep citation_issn
```

### Sitemap missing URLs

Add route to `src/lib/seo/sitemap-urls.ts` → `getAllPublicPaths()`.

---

## Deployment

### Vercel build fails

1. Check build logs in Vercel dashboard
2. Reproduce locally: `npm run build`
3. Verify env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`

### Legacy domain not redirecting

- Verify domain DNS points to Vercel
- Check `vercel.json` host rules
- For standalone domains, deploy `scripts/legacy-redirects/{domain}/`

### Wrong version on production

```bash
curl -s https://pub.dhe.org.in/api/health | jq .version
git log -1 --oneline
```

Promote correct deployment in Vercel if mismatch.

---

## Performance

### High LCP on Lighthouse

- Run against production URL (not cold localhost)
- Verify Phase 9 deployed (homepage ~107 kB First Load JS)
- See `docs/PERFORMANCE_AUDIT.md`

### Service worker caching stale content

```javascript
// Browser DevTools → Application → Service Workers → Unregister
// Or hard refresh with cache disabled
```

---

## Security

### CSP blocks resource

Check `src/middleware.ts` CSP directives. Add allowed origin to `connect-src` or `img-src` if legitimate.

### Cookies not sent on API request

Use `credentials: "same-origin"` or `secureFetch()` from `src/lib/security/client.ts`.

---

## Getting Help

| Channel | Contact |
|---------|---------|
| Email | pub.dhe4@gmail.com |
| Security | `public/security.txt` |
| Repository | https://github.com/dhevb/pub.dhe.org.in/issues |

Include: URL, browser, steps to reproduce, `/api/health` output, and relevant console errors.

---

## Related Docs

- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)
- [API_REFERENCE.md](./API_REFERENCE.md)
