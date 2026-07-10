# Observability Plan

**Version:** 2.0 (design)  
**Baseline:** v1.0.1  
**Status:** Partial — hooks exist; external services not configured

---

## Current State

| Capability | Implementation | Status |
|------------|----------------|--------|
| Health check | `GET /api/health` | **Live** |
| Structured logging | `logEvent()` ring buffer | In-memory |
| Audit logging | `auditLog()` | In-memory (500 entries) |
| Client error reporting | `reportClientError()` | dataLayer push |
| Sentry | `captureException()` stub | Ready for Activation |
| Feature flags | `isFeatureEnabled()` | **Live** |
| Analytics | GA4, Clarity, Plausible hooks | Env-gated |
| Uptime monitoring | None | **Gap** |

---

## Target Stack

```
┌─────────────────────────────────────────────────────────┐
│  Application (Next.js)                                   │
│  logEvent · auditLog · reportClientError                 │
└────────────┬────────────────────────────────────────────┘
             │
    ┌────────┼────────┬────────────┐
    ▼        ▼        ▼            ▼
┌────────┐ ┌────┐ ┌──────────┐ ┌─────────┐
│ Sentry │ │OTel│ │Prometheus│ │ Uptime  │
│ Errors │ │Traces│ │ Metrics │ │ Robot  │
└────────┘ └────┘ └──────────┘ └─────────┘
             │                    │
             ▼                    ▼
        ┌─────────┐         ┌──────────┐
        │ Grafana │         │ PagerDuty│
        └─────────┘         │ / Email  │
                            └──────────┘
```

---

## Sentry (Priority 1)

### Activation steps

1. Create Sentry project (Next.js)
2. Set `SENTRY_DSN` in Vercel
3. Install `@sentry/nextjs` (v1.1.x — separate release)
4. Replace stub in `monitoring/sentry.ts`
5. Verify test error in staging

### Configuration

```bash
SENTRY_DSN=https://...@sentry.io/...
SENTRY_ENVIRONMENT=production
SENTRY_TRACES_SAMPLE_RATE=0.1
```

### What to capture

- Unhandled exceptions (`error.tsx`, `global-error.tsx`)
- API route 500s via `handleRouteError()`
- Failed DOI deposits (V2)
- Email send failures

**Never capture:** passwords, tokens, CSRF values, full manuscript content.

---

## OpenTelemetry (Priority 2)

### Instrumentation targets

| Span | Location |
|------|----------|
| `http.request` | Middleware |
| `api.auth.login` | Login route |
| `api.search` | Search route |
| `backend.fetch` | `api/client.ts` |
| `doi.deposit` | Publishing adapter (V2) |

### Export

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://...
OTEL_SERVICE_NAME=viksit-bharat-journal
```

**Vercel note:** Use `@vercel/otel` or external collector (Honeycomb, Grafana Cloud).

---

## Prometheus Metrics (Priority 3)

### Proposed metrics

| Metric | Type | Labels |
|--------|------|--------|
| `http_requests_total` | counter | method, route, status |
| `http_request_duration_seconds` | histogram | route |
| `manuscripts_submitted_total` | counter | journal |
| `doi_deposits_total` | counter | status |
| `email_queue_depth` | gauge | — |
| `paper_qa_status` | gauge | — (1=ok) |

**Endpoint:** `GET /api/metrics` (protected, internal only) or Vercel Analytics integration.

---

## Grafana Dashboards (planned)

| Dashboard | Panels |
|-----------|--------|
| Platform Overview | RPS, error rate, p95 latency |
| Publishing | DOI deposits, OAI requests |
| Editorial | Submissions/day, review turnaround |
| Infrastructure | Backend health, cold starts |

---

## Health Check Enhancement

Current `/api/health` returns:

```json
{
  "status": "ok",
  "backend": { "status": "ok" },
  "papers": { "expected": 20 },
  "security": { "csrf": "double-submit-cookie" },
  "features": ["pwaOffline", "advancedSearch", ...]
}
```

**V2 additions (proposed):**

```json
{
  "integrations": {
    "crossref": "not_configured",
    "orcid": "not_configured",
    "sentry": "active",
    "storage": "r2"
  },
  "queues": {
    "email_pending": 0,
    "doi_pending": 0
  }
}
```

---

## Uptime Monitoring

| Service | Check | Interval |
|---------|-------|----------|
| Homepage | `GET /` 200 | 1 min |
| Health | `GET /api/health` | 5 min |
| Paper sample | `GET /vbe.rase/Paper1` | 15 min |
| Backend | health.backend.status | 5 min |
| Sitemap | `GET /sitemap.xml` | 1 hour |

**Tools:** UptimeRobot, Better Stack, or Grafana Cloud Synthetics.

---

## Log Retention

| Tier | Retention | Storage |
|------|-----------|---------|
| Hot (Sentry) | 90 days | Sentry |
| Warm (OTel) | 30 days | Grafana/Loki |
| Audit (compliance) | 7 years | PostgreSQL `audit_logs` (V2) |

---

## Alerting Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| Site down | 3 failed health checks | Critical |
| Error spike | >10 Sentry events/min | High |
| Backend down | health.backend down 5 min | High |
| DOI deposit fail | 3 consecutive failures | Medium |
| Paper integrity | qa:papers fail | Critical |

---

## Implementation Phases

| Phase | Deliverable | Version |
|-------|-------------|---------|
| 1 | Sentry live | v1.1.x |
| 2 | Uptime external monitor | v1.1.x |
| 3 | Health check extensions | v1.3.x |
| 4 | OTel traces | v1.4.x |
| 5 | Prometheus + Grafana | v2.0.x |
| 6 | Audit log persistence | v2.0.x |

---

## Related

- [monitoring/](../src/lib/monitoring/) module
- [SECURITY.md](./SECURITY.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [V2_ROADMAP.md](./V2_ROADMAP.md) Phase 6
