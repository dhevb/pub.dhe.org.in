# Monitoring Module

**Purpose:** Structured logging, audit trail, feature flags, and Sentry integration hooks.

## Architecture

| File | Role |
|------|------|
| `logger.ts` | In-memory ring buffer + `logEvent()` |
| `sentry.ts` | `captureException`, `auditLog` |
| `feature-flags.ts` | Runtime feature toggles |

## Usage

```ts
import { logEvent, auditLog, isFeatureEnabled } from "@/lib/monitoring";

auditLog("auth.login", userId);
if (isFeatureEnabled("semanticSearch")) { /* ... */ }
```

## Health Check

`GET /api/health` returns `features: string[]` of enabled flags.

## Limitations

- Logs and audit buffer are in-memory (not persisted).
- Set `SENTRY_DSN` and add `@sentry/nextjs` for production error tracking.

## Tests

`src/lib/monitoring/__tests__/`
