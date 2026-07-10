# Production Readiness Certificate

**Platform:** Viksit Bharat Journal  
**URL:** https://pub.dhe.org.in  
**Audit date:** 2026-07-10  
**Certificate ID:** VBJ-CERT-2026-07-10-001

---

## Certification Decision

| Field | Value |
|-------|-------|
| **Classification** | **LEVEL 3 — Production Ready** |
| **Overall score** | **76 / 100** |
| **Valid for** | Public journal website, article hosting, Scholar metadata, author portal (with backend) |
| **Not certified for** | International indexing deposit, enterprise editorial workflow, DOI registration, OAI harvesting |

---

## Statement

Based on independent verification performed on **2026-07-10**, the Viksit Bharat Journal platform **meets production readiness criteria** for operating as a **live academic journal website** with:

- HTTPS production deployment on Vercel (region `bom1`)
- Functional health checks and backend connectivity
- Security controls (CSRF, rate limiting, security headers, httpOnly auth cookies)
- SEO infrastructure (sitemap, robots, JSON-LD, RSS, OpenGraph)
- Google Scholar required citation meta tags on paper pages
- ISSN `2278-1757` configured in CMS
- 20 immutable research articles verified intact
- Automated quality gates passing locally (lint, tsc, 58 tests, build, paper QA)

The platform **does not** meet certification for **LEVEL 4 — International Publishing Ready** due to absent live DOI/Crossref integration, OAI-PMH, operational editorial workflow engine, transactional email, and formal indexing applications.

---

## Verified Evidence Summary

```
npm run lint          → PASS (3 legacy warnings)
npx tsc --noEmit      → PASS
npm run test          → PASS (58/58)
npm run qa            → PASS (20/20 papers)
npm run build         → PASS
GET /api/health       → {"status":"ok","backend":{"status":"ok"}}
verify-scholar.mjs    → PASS (7 required tags); WARN citation_doi (no prefix)
Lighthouse (prod)     → Performance 92, Accessibility 96, Best Practices 100, SEO 100
```

---

## Conditions & Limitations

1. **Deploy drift:** Production reports git commit `0c7f48d`; repository tag `v1.0.1` and maintenance branch commits are ahead. Certificate assumes production behavior matches audited live site, not necessarily latest repo HEAD.

2. **Smoke tests:** Full HTTP smoke suite (67 routes) was **not re-executed** against production in this audit session. Prior project reports cite 67/67 pass — treat as historical, not re-certified here.

3. **Publishing integrations:** No Crossref, ORCID, OAI-PMH, or email integrations are certified as live.

4. **Editorial workflow:** Dashboard and submission UI exist; end-to-end peer review lifecycle is **not** certified operational.

5. **Expiry:** Re-certification recommended after: (a) production deploy of v1.0.1+, (b) operational pilot completion, or (c) any V2 integration activation.

---

## Signatory (Independent Audit)

| Role | Finding |
|------|---------|
| Principal Software Architect | Architecture sound; legacy debt accepted by policy |
| Senior QA Engineer | Automated gates pass; E2E gap noted |
| Cyber Security Auditor | Hardened with known CSP and dependency caveats |
| DevOps Engineer | Deploy live; monitoring incomplete |
| Performance Engineer | Meets targets; LCP 2.8s borderline |
| Accessibility Auditor | Strong automated score; contrast failures on homepage |
| SEO Specialist | Production-ready |
| Google Scholar Consultant | Required meta PASS; DOI gap documented |
| Crossref / DOAJ / OAI Consultants | NOT READY — documented only |
| Academic Publishing Consultant | Website ready; publishing infrastructure not ready |
| Product Manager | Recommend pilot before V2 build |

---

## Upgrade Path

| Target level | Primary blockers |
|--------------|------------------|
| LEVEL 4 | DOI prefix, OAI-PMH, editorial engine, email, policies, pilot |
| LEVEL 5 | Full V2 execution (see `V2_EXECUTION_PROMPT.md`) |

---

## Related Documents

- [CERTIFICATION_SCORECARD.md](./CERTIFICATION_SCORECARD.md)
- [FINAL_CERTIFICATION_AUDIT.md](./FINAL_CERTIFICATION_AUDIT.md)
- [OPEN_ITEMS.md](./OPEN_ITEMS.md)

**This certificate is an engineering audit artifact. It does not constitute Crossref, DOAJ, UGC CARE, Scopus, or Web of Science accreditation.**
