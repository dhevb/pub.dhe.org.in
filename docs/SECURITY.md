# Security

Security architecture for Viksit Bharat Journal — implemented in Phases 7–8.

---

## Threat Model Scope

| Protected | Out of scope (this repo) |
|-----------|--------------------------|
| CSRF on state-changing API routes | Backend database security |
| Auth cookie hardening | Render infrastructure |
| Rate limiting (per IP) | DDoS at CDN edge |
| Input sanitization on BFF routes | Legacy direct backend calls from old components |
| Security headers (CSP, HSTS, etc.) | User device security |

---

## CSRF Protection

**Pattern:** Double Submit Cookie (`src/lib/security/csrf.ts`)

1. Client fetches `GET /api/csrf` → receives token in JSON + `csrf-token` cookie
2. Mutating requests include `x-csrf-token` header matching cookie value
3. Middleware validates before route handler runs
4. Token rotates on login and logout

| Setting | Value |
|---------|-------|
| Cookie name | `csrf-token` |
| Header name | `x-csrf-token` |
| httpOnly | `false` (client must read cookie) |
| SameSite | `strict` |
| Max age | 8 hours |

**Protected methods:** `POST`, `PUT`, `PATCH`, `DELETE` on `/api/*`  
**Exempt:** `/api/health`, `/api/cms`, `/api/csrf`

**Client bootstrap:** `CsrfBootstrap` in `Providers` — deferred via `requestIdleCallback`

---

## Authentication

### Cookies (`src/lib/auth/constants.ts`)

| Cookie | httpOnly | SameSite | Max age | Purpose |
|--------|----------|----------|---------|---------|
| `token` | yes | lax | 7 days | JWT from backend |
| `auth-token` | yes | lax | 7 days | Legacy alias |
| `userId` | yes | lax | 7 days | User identifier |

`SameSite=lax` on auth cookies is intentional — required for post-login redirects.

### Login flow

```
Browser → GET /api/csrf
Browser → POST /api/auth/login (CSRF header)
Next.js → POST Render /api/login
Next.js → Set httpOnly cookies
Browser → persistLegacyAuth() → localStorage (legacy flows)
```

### Session check

- **Pages:** `middleware.ts` reads `token` or `auth-token` cookie
- **API:** `GET /api/auth/session` returns `{ authenticated: boolean }`
- **Server:** `isAuthenticated()` in `src/lib/auth/session.ts`

### Refresh tokens

Documented in `src/lib/auth/tokens.ts` as **placeholder** — not implemented. Current strategy uses 7-day access token cookie only.

---

## Middleware (`src/middleware.ts`)

Execution order:

1. **Rate limiting** — per IP, per route
2. **CSRF validation** — mutating `/api/*`
3. **Auth redirects:**
   - Authenticated + auth page (`/login`, `/signup`, `/ForgotPassword`) → `/`
   - Unauthenticated + protected (`/dashboard`, `/profile`) → `/login?redirect=`
4. **Security headers** on all responses

### Security headers

| Header | Value |
|--------|-------|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | See below |
| `Strict-Transport-Security` | `max-age=63072000` (via `next.config.mjs`) |

### Content Security Policy

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
font-src 'self' data:;
connect-src 'self' https://vie-rase-backend.onrender.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

---

## Rate Limiting

`src/lib/security/rate-limit.ts` — in-memory store (resets on serverless cold start).

| Route | Limit/min |
|-------|-----------|
| `/api/auth/login` | 10 |
| `/api/auth/signup` | 5 |
| `/api/auth/forgot-password` | 5 |
| `/api/contact` | 10 |
| `/api/manuscripts` | 60 |
| `/api/search` | 120 |
| Default | 120 |

Response: `429` with `Retry-After` and `X-RateLimit-Remaining: 0`.

**Production recommendation:** Migrate to Redis/Upstash for multi-instance consistency.

---

## Input Sanitization

`src/lib/security/sanitize.ts`:

| Function | Purpose |
|----------|---------|
| `sanitizeString(input, maxLength)` | Strip HTML tags, control chars, trim |
| `sanitizeEmail(email)` | Lowercase, max 320 chars |
| `escapeHtml(text)` | HTML entity encoding for output |

Applied on: `/api/auth/login`, `/api/auth/signup`, `/api/auth/forgot-password`, `/api/contact`, `/api/search`

---

## Environment Validation

`src/lib/env.ts` — Zod schema validates env at runtime. Invalid production config logs errors without crashing.

---

## PWA / Service Worker

`public/sw.js` — caches `/`, `/offline`, `/manifest.webmanifest`. Registered only in production via `ServiceWorkerRegister`.

---

## Security Contact

`public/security.txt`:

```
Contact: mailto:pub.dhe4@gmail.com
```

---

## Known Gaps

1. **Legacy components** — some manuscript flows call Render API directly without CSRF proxy
2. **localStorage auth** — legacy `persistLegacyAuth()` duplicates token client-side
3. **In-memory rate limits** — not shared across Vercel instances
4. **CSP `unsafe-inline`/`unsafe-eval`** — required by Next.js; tighten when possible
5. **No refresh token rotation** — 7-day cookie expiry only

---

## Health Check Security Flags

`GET /api/health` returns:

```json
{
  "security": {
    "csrf": "double-submit-cookie",
    "rateLimit": "middleware",
    "authCookies": "httpOnly"
  }
}
```

---

## Related Docs

- [API_REFERENCE.md](./API_REFERENCE.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [docs/PHASE8_FINAL_REPORT.md](./PHASE8_FINAL_REPORT.md)
