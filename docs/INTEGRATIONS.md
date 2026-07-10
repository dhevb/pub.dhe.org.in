# Integrations

**Version:** 2.0 (design)  
**Baseline:** v1.0.1  
**Policy:** No live integration claimed without verified credentials and test deposit.

Status key: **Live** · **Ready for Activation** · **Planned** · **Manual Process**

---

## Integration Matrix

| Service | Purpose | Code Location | Status |
|---------|---------|---------------|--------|
| Render API | Auth, manuscripts, articles | `src/lib/api/` | **Live** |
| Vercel | Hosting, CDN, redirects | `vercel.json` | **Live** |
| Google Scholar | Citation meta | `seo/google-scholar.ts` | **Live** |
| Google Analytics 4 | Analytics | `analytics/providers.ts` | Ready for Activation |
| Microsoft Clarity | Session replay | `analytics/providers.ts` | Ready for Activation |
| Crossref | DOI registration | `publishing/metadata.ts` | **Planned** |
| DataCite | Dataset DOIs | `identifiers/registry.ts` | **Planned** |
| ORCID | Author OAuth | `identifiers/registry.ts` | **Planned** |
| OpenAlex | Bibliographic graph | `identifiers/registry.ts` | **Planned** |
| Sentry | Error tracking | `monitoring/sentry.ts` | Ready for Activation |
| Email (SMTP/API) | Transactional mail | `email/queue.ts` | **Planned** |
| Redis/Upstash | Queues, rate limits | — | **Planned** |
| Cloudflare R2 | Object storage | — | **Planned** |
| AWS S3 | Object storage | — | **Planned** |

---

## Crossref

### Configuration (when ready)

```bash
# .env.local / Vercel
CROSSREF_API_URL=https://api.crossref.org
CROSSREF_DEPOSIT_URL=https://api.crossref.org/v2/deposits
CROSSREF_USERNAME=your-deposit-username
CROSSREF_PASSWORD=your-deposit-password
# site.json
"doiPrefix": "10.12345"
```

### Adapter contract

```typescript
interface CrossrefAdapter {
  deposit(xml: string): Promise<{ submissionId: string }>;
  getDoiStatus(doi: string): Promise<CrossrefStatus>;
}
```

**Existing:** `registerDoi()` placeholder returns `{ status: "queued" }`.

**Verification:** Successful test deposit in Crossref sandbox → mark **Live**.

---

## ORCID OAuth

### Flow (planned)

```
1. Author clicks "Connect ORCID"
2. Redirect to orcid.org/oauth/authorize
3. Callback → /api/auth/orcid/callback
4. Store ORCID iD on user profile (backend)
5. Display badge on author dashboard + paper pages
```

### Configuration

```bash
ORCID_CLIENT_ID=
ORCID_CLIENT_SECRET=
ORCID_REDIRECT_URI=https://pub.dhe.org.in/api/auth/orcid/callback
```

**Today:** `orcidEnabled: true` in `site.json` — UI flag only.

---

## Email Providers

### Adapter interface (planned)

```typescript
interface EmailTransportAdapter {
  send(message: EmailMessage): Promise<{ messageId: string }>;
}
```

| Provider | SDK | Notes |
|----------|-----|-------|
| Resend | `@resend/node` | Simple, Vercel-friendly |
| SendGrid | `@sendgrid/mail` | Enterprise volume |
| AWS SES | `@aws-sdk/client-ses` | If already on AWS |
| SMTP | `nodemailer` | Self-hosted |

### Queue (planned)

Replace in-memory `email/queue.ts` with BullMQ:

```
enqueueEmail() → Redis → worker → transport.send()
```

**Templates live:** 9 template IDs in `renderTemplate()`.

**Contact form today:** `/api/contact` enqueues to in-memory queue (not sent externally).

---

## Object Storage

See [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md).

| Provider | Status |
|----------|--------|
| Local filesystem | Planned (dev) |
| Cloudflare R2 | Planned (prod recommended) |
| AWS S3 | Planned |
| Backblaze B2 | Planned |

---

## Background Job Queue (planned)

| Job type | Trigger |
|----------|---------|
| `email.send` | Editorial events, auth |
| `doi.deposit` | Acceptance → publish |
| `pdf.generate` | Proof approval |
| `pdf.metadata` | Pre-publish |
| `metadata.export` | OAI/Crossref batch |
| `search.reindex` | New publication |
| `rss.update` | Issue publish |
| `notification.push` | Dashboard alerts |

**Infrastructure:** Redis + BullMQ (or Upstash QStash for serverless).

---

## Rate Limiting Upgrade

**Today:** In-memory (`security/rate-limit.ts`)  
**V2:** Upstash Redis for distributed limits across Vercel instances

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## Environment Variable Reference

See `.env.example` + proposed additions:

```bash
# Publishing
CROSSREF_USERNAME=
CROSSREF_PASSWORD=
DOI_PREFIX=

# ORCID
ORCID_CLIENT_ID=
ORCID_CLIENT_SECRET=

# Storage
STORAGE_DRIVER=local|r2|s3|b2
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=

# Queue
REDIS_URL=

# Email
EMAIL_PROVIDER=resend|sendgrid|ses|smtp
RESEND_API_KEY=

# Monitoring
SENTRY_DSN=
OTEL_EXPORTER_OTLP_ENDPOINT=
```

Validated via `src/lib/env.ts` (extend Zod schema per integration).

---

## Mock / Sandbox Mode

When credentials absent:

```bash
INTEGRATION_MODE=mock   # default in development
INTEGRATION_MODE=sandbox  # Crossref/ORCID sandboxes
INTEGRATION_MODE=live     # production only with verified keys
```

Adapters return structured mock responses; admin dashboard shows **Ready for Activation** badge.

---

## Related

- [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md)
- [OBSERVABILITY_PLAN.md](./OBSERVABILITY_PLAN.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [SECURITY.md](./SECURITY.md)
