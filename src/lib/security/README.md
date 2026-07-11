# Security Module

**Purpose:** CSRF protection, rate limiting, input sanitization, and secure client fetch.

## Architecture

| File | Role |
|------|------|
| `csrf.ts` | Double-submit cookie token generation and validation |
| `rate-limit.ts` | In-memory per-IP rate limits (middleware + API) |
| `sanitize.ts` | HTML stripping, email normalization |
| `client.ts` | `secureFetch()` with CSRF header injection |

## Usage

```ts
import { validateCsrfToken, sanitizeEmail } from "@/lib/security";
import { requireCsrf } from "@/lib/api/route-helpers";

// API route
const csrfFailure = requireCsrf(request);
if (csrfFailure) return csrfFailure;
```

## Limitations

- Rate limiting is in-memory (single instance). Use Redis/Upstash for multi-instance production.
- CSRF exempt paths: `/api/health`, `/api/cms`, `/api/csrf`.

## Tests

`src/lib/security/__tests__/`
