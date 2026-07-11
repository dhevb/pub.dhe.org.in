# Release Management

**Version:** Semantic Versioning (SemVer)  
**Current:** `1.1.0` (package.json)

---

## Versioning Strategy

| Bump | When |
|------|------|
| **MAJOR** | Breaking API/URL changes (rare — avoided per platform policy) |
| **MINOR** | New features, engineering improvements, non-breaking enhancements |
| **PATCH** | Bug fixes, security patches, dependency updates |

Production deploy version is `VERCEL_GIT_COMMIT_SHA` (first 7 chars) via `/api/health`.

---

## Release Notes Template

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Security
- ...

### Performance
- ...

### Test plan
- [ ] npm run test
- [ ] npm run qa:papers
- [ ] npm run qa:smoke (production)
- [ ] /api/health version matches commit
```

---

## Hotfix Workflow

1. Branch from `main`: `hotfix/description`
2. Fix + tests + `npm run qa:all`
3. PR → `main` (fast-track review)
4. Vercel auto-deploys
5. Verify `/api/health` and smoke test
6. Cherry-pick to `platform-upgrade` if active

---

## Rollback Procedure

1. **Vercel:** Deployments → previous build → Promote to Production
2. **Git:** `git revert <commit>` on `main` and push
3. Verify health + smoke test

**Never** force-push `main`.

---

## Deployment Checklist

```bash
npm run test
npm run lint
npm run qa:papers
npm run build
git push origin main
curl https://pub.dhe.org.in/api/health
BASE_URL=https://pub.dhe.org.in node scripts/qa/smoke.mjs
node scripts/qa/verify-scholar.mjs
```

See [DEPLOYMENT.md](./DEPLOYMENT.md), [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md).

---

## Related

- [CHANGELOG.md](./CHANGELOG.md)
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
