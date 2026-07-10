# Support Matrix — Viksit Bharat Journal

**Version:** 1.0  
**Effective:** 2026-07-10  
**Owner:** Technical Lead  
**Related:** [GOVERNANCE.md](./GOVERNANCE.md) · [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md)

Official support policy for platform versions, runtimes, and browsers.

---

## Release Support

| Version | Status | Support level | Notes |
|---------|--------|---------------|-------|
| **v1.0.0** | Archived | **None** | Pre-certification baseline |
| **v1.0.1** | Maintenance | **Security only** | Safe dependency patches on maintenance branch |
| **v1.0.2** | **Current production** | **Full** | LEVEL 3 certification; merge to `main` 2026-07-10 |
| **v1.0.3** | Documentation release | **Full** (docs) | Operations + governance; no runtime changes |
| **v1.1.x** | Planned | **Planned** | Post-pilot evidence-driven improvements |
| **v2.x** | Future | **Not started** | Enterprise publishing — after pilot + credentials |

### Support definitions

| Level | Includes |
|-------|----------|
| **Full** | Bug fixes (P0–P2), security patches, documentation, operational guidance |
| **Security only** | Critical/high security patches; no features |
| **Docs only** | Documentation corrections; no application deploy required |
| **None** | No patches; use current supported version |

---

## Runtime Support

| Component | Supported version | Source |
|-----------|-------------------|--------|
| **Node.js** | ≥ 20.x (LTS recommended) | `package.json` `engines` |
| **npm** | ≥ 10.x (bundled with Node 20+) | CI uses `npm ci` |
| **Next.js** | 14.2.x | `package.json` — upgrade planned v1.2.x |
| **React** | 18.3.x | `package.json` |
| **TypeScript** | 5.x | `package.json` |
| **Vercel region** | `bom1` (Mumbai) | `vercel.json` |

### Unsupported

- Node.js 18 and below
- Next.js 13 and below
- `npm audit fix --force` (policy: ADR-015)

---

## Browser Support

Modern evergreen browsers (last 2 major versions):

| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome / Edge (Chromium) | ✅ Supported | ✅ Supported |
| Firefox | ✅ Supported | ✅ Supported |
| Safari | ✅ Supported | ✅ iOS Safari supported |
| Samsung Internet | — | ✅ Supported |

### Legacy journal UI (`*_Component/`)

Legacy routes may have reduced accessibility and performance. Supported for **compatibility**; new development uses modern `src/components/`.

### JavaScript requirement

Site requires JavaScript for auth, submission wizard, and search. Static paper pages are readable without JS.

---

## Mobile Support

| Capability | Status |
|------------|--------|
| Responsive layout (modern pages) | ✅ Supported |
| PWA manifest (`/manifest.webmanifest`) | ✅ Present |
| Offline page (`/offline`) | ✅ Present |
| Touch targets (modern UI) | ✅ Target WCAG 2.2 AA |
| Legacy journal mobile views | ⚠️ Functional; not primary UX |

---

## Platform Dependencies

| Service | Role | Support contact |
|---------|------|-----------------|
| Vercel | Hosting, CDN, SSL | DevOps / platform admin |
| Render | Manuscript backend API | Backend admin |
| GitHub | Source, CI, releases | Technical Lead |
| Google Search Console | SEO monitoring | Operations |
| Crossref | DOI *(future)* | Editorial board |

---

## Deprecation Schedule

| Item | Status | EOL / action |
|------|--------|--------------|
| Legacy domains (`*.rase.co.in`) | Redirecting | Permanent redirects — no EOL |
| Legacy `*_Component/` routes | Maintained | No removal without ADR + 12-month notice |
| `localStorage` auth (legacy) | Dual path with cookies | Migrate post-pilot if evidence supports |
| axios in legacy components | Maintained | Migrate incrementally in v1.1.x+ |
| Next.js 14 | Active | Upgrade target v1.2.x per [NEXTJS_UPGRADE_PLAN.md](./NEXTJS_UPGRADE_PLAN.md) |

---

## End-of-Life Policy

1. **Announcement:** Minimum **6 months** notice in CHANGELOG and GitHub Release for any supported version entering EOL.
2. **Security:** Critical CVEs patched on **current production** and **previous patch** version when feasible.
3. **URLs:** Never EOL a public paper URL without permanent redirect.
4. **Tags:** Git tags retained indefinitely for audit trail.

---

## Reporting Issues

| Severity | Channel | Target response |
|----------|---------|-----------------|
| P0 (site down) | Email + incident process | 4 hours |
| P1 (major broken flow) | Email / GitHub issue | Same day |
| P2/P3 | GitHub issue | Next maintenance window |

See [GOVERNANCE.md](./GOVERNANCE.md) §5 Security Disclosure and [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) §15 Incident Response.

---

## Review Schedule

| Review | Frequency |
|--------|-----------|
| Support matrix accuracy | Quarterly |
| Node.js LTS alignment | Annually (Q1) |
| Browser support | Annually |
| Version EOL dates | On each major/minor release |

---

## Related

- [RELEASE_NOTES_v1.0.2.md](./RELEASE_NOTES_v1.0.2.md)
- [RELEASE_NOTES_v1.0.3.md](./RELEASE_NOTES_v1.0.3.md)
- [DEPENDENCY_AUDIT.md](./DEPENDENCY_AUDIT.md)
- [CHANGELOG.md](./CHANGELOG.md)
