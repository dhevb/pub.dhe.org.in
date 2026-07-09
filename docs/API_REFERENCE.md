# API Reference

Two API surfaces exist: **Next.js API routes** (this repo) and the **Render backend** (external).

**Backend base URL:** `NEXT_PUBLIC_API_URL` or `https://vie-rase-backend.onrender.com`

---

## Next.js API Routes

Base: `https://pub.dhe.org.in/api` (or `http://localhost:3000/api` in dev)

### Authentication

#### `GET /api/csrf`

Issues a CSRF token for double-submit cookie pattern.

| | |
|---|---|
| Auth | None |
| CSRF | Exempt |
| Response | `{ "token": "<hex>" }` |
| Side effect | Sets `csrf-token` cookie (non-httpOnly, SameSite=strict, 8h) |

---

#### `POST /api/auth/login`

Proxies to backend `POST /api/login`. Sets auth cookies on success.

| | |
|---|---|
| Auth | None (establishes session) |
| CSRF | **Required** — `x-csrf-token` header must match `csrf-token` cookie |
| Body | `{ "email": string, "password": string }` |
| Success | `{ "user": {...}, "token": string, "csrfToken": string }` |
| Cookies set | `token`, `auth-token`, `userId` (httpOnly, 7 days) |
| Errors | `400` validation, `401` invalid credentials, `403` CSRF, `502` backend |

---

#### `POST /api/auth/signup`

Proxies to backend `POST /api/signup`.

| | |
|---|---|
| CSRF | **Required** |
| Body | `{ name, email, password, institution?, areaOfStudy?, role, confirmPassword? }` |
| Cookies | Does **not** set auth cookies |

---

#### `POST /api/auth/logout`

Clears auth cookies and rotates CSRF.

| | |
|---|---|
| CSRF | **Required** |
| Response | `{ "success": true, "csrfToken": string }` |

---

#### `GET /api/auth/session`

Reads auth state from cookies.

| | |
|---|---|
| CSRF | N/A (GET) |
| Response | `{ "authenticated": boolean, "user?": { hasToken: true } }` |

---

#### `POST /api/auth/forgot-password`

Proxies to backend `POST /api/reset-password`.

| | |
|---|---|
| CSRF | **Required** |
| Body | `{ "email": string }` |

---

### Content & Search

#### `GET /api/cms`

Returns CMS snapshot for admin preview.

| | |
|---|---|
| CSRF | Exempt |
| Response | `{ site, announcements, news, faqs }` |

---

#### `GET /api/search`

Full-text search over published paper index.

| | |
|---|---|
| Query | `q` (max 200 chars), `limit` (1–50, default 20) |
| Response | `{ "count": number, "results": SearchIndexItem[] }` |
| Cache | `public, s-maxage=300, stale-while-revalidate=600` |

---

#### `GET /api/manuscripts`

Fetches user manuscripts from backend.

| | |
|---|---|
| Auth | `userId` cookie or `?userId=` query param |
| Token | Optional Bearer from `token` cookie forwarded to backend |
| Response | `{ "manuscripts": ManuscriptRecord[] }` |
| Errors | `401` no userId, `502` backend failure |

---

#### `POST /api/contact`

Queues contact form email (in-memory architecture).

| | |
|---|---|
| CSRF | **Required** |
| Body | `{ name, email, subject, message }` (Zod validated) |
| Response | `{ "ok": true, "queued": true }` |

---

### Infrastructure

#### `GET /api/health`

| | |
|---|---|
| CSRF | Exempt |
| Response | `{ status, timestamp, version, site, papers, backend, maintenanceMode, security }` |
| Status code | `200` ok, `503` degraded |

Probes backend via `GET /api/vbe_getallarticles`.

---

## CSRF Rules

Defined in `src/lib/security/csrf.ts`:

- **Protected:** `POST`, `PUT`, `PATCH`, `DELETE` on `/api/*`
- **Exempt:** `/api/health`, `/api/cms`, `/api/csrf`
- **Validation:** `csrf-token` cookie === `x-csrf-token` header (exact match)

Client helper: `secureFetch()` in `src/lib/security/client.ts`

---

## Rate Limits (Middleware)

Per IP, per route (`src/lib/security/rate-limit.ts`):

| Route | Limit |
|-------|-------|
| `/api/auth/login` | 10/min |
| `/api/auth/signup` | 5/min |
| `/api/auth/forgot-password` | 5/min |
| `/api/manuscripts` | 60/min |
| `/api/search` | 120/min |
| `/api/contact` | 10/min |
| `/api/csrf` | 120/min |
| `/login`, `/signup`, `/ForgotPassword` | 30–60/min |
| Default | 120/min |

Exceeded → `429 Too Many Requests` with `Retry-After` header.

---

## Render Backend API

Path builders in `src/lib/api/client.ts`:

| Function | Backend path |
|----------|--------------|
| `AUTH_ENDPOINTS.login` | `POST /api/login` |
| `AUTH_ENDPOINTS.signup` | `POST /api/signup` |
| `AUTH_ENDPOINTS.resetPassword` | `POST /api/reset-password` |
| `journalArticlesPath(prefix)` | `GET /api/{prefix}_getallarticles` |
| `journalArticlePath(prefix, id)` | `GET /api/{prefix}_getarticle/{id}` |
| `journalAddArticlePath(prefix)` | `POST /api/{prefix}_add-article` |
| `journalSubmitArticleDetailsPath(prefix)` | `POST /api/{prefix}_submit-article-details` |
| `journalSubmitAuthorDetailsPath(prefix)` | `POST /api/{prefix}_submit-author-details` |
| `journalSubmitManuscriptFilePath(prefix)` | `POST /api/{prefix}_submit-manuscript-file` |
| `journalManuscriptsByUserPath(userId)` | `GET /api/vbe_manuscripts/user/{userId}` |

**Journal API prefixes:** `vbe`, `vbh`, `vie`, `vih`

Legacy manuscript submission flows call these directly from client components via `apiFetch` / `axios`.

---

## Client Usage Patterns

### Modern auth (recommended)

```typescript
import { loginViaAppRoute, logoutViaAppRoute } from "@/lib/api/auth";

await loginViaAppRoute(email, password);  // uses secureFetch + CSRF
await logoutViaAppRoute();
```

### Direct backend (legacy components)

```typescript
import { apiFetch, AUTH_ENDPOINTS } from "@/lib/api";

await apiFetch(AUTH_ENDPOINTS.login, { method: "POST", body: JSON.stringify({ email, password }) });
```

---

## Related Docs

- [SECURITY.md](./SECURITY.md) — CSRF, cookies, middleware
- [ARCHITECTURE.md](./ARCHITECTURE.md) — system overview
