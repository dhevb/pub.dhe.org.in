# Editorial Workflow

**Version:** 2.0 (design)  
**Baseline:** v1.0.1  
**Module:** `src/lib/editorial/workflow.ts`

---

## Lifecycle Diagram

```
                    ┌─────────────┐
                    │  Submission │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Screening  │◄── Managing Editor
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │Editor Assign│
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │  Reviewer   │
                    │  Assignment │
                    └──────┬──────┘
                           ▼
                    ┌─────────────┐
                    │Double-Blind │
                    │   Review    │
                    └──────┬──────┘
                           ▼
              ┌────────────┴────────────┐
              ▼                         ▼
       ┌─────────────┐          ┌─────────────┐
       │  Revision   │          │  Decision   │
       │  Requested  │          │ Accept/Reject│
       └──────┬──────┘          └──────┬──────┘
              │                        ▼
              └──────────►      ┌─────────────┐
                                │Copy Editing │
                                └──────┬──────┘
                                       ▼
                                ┌─────────────┐
                                │ Proofreading│
                                └──────┬──────┘
                                       ▼
                                ┌─────────────┐
                                │ Publication │
                                └──────┬──────┘
                                       ▼
                                ┌─────────────┐
                                │  Archival   │
                                └─────────────┘
```

---

## Status Machine (Implemented Types)

`ManuscriptStatus` values in code:

| Status | Meaning |
|--------|---------|
| `submitted` | Author submitted |
| `screening` | Initial editorial screening |
| `under_review` | Active peer review |
| `revision_requested` | Author must revise |
| `accepted` | Accepted for publication |
| `rejected` | Rejected |
| `scheduled` | Assigned to volume/issue |
| `published` | Live on platform |
| `withdrawn` | Author withdrawn |

**Transition guard:** `canTransition(from, to)` via `EDITORIAL_TRANSITIONS`.

### Gap: stages not in status enum

These workflow stages from V2 spec map to future sub-states or parallel flags:

| Stage | V2 Mapping |
|-------|------------|
| Editor Assignment | `screening` + `assignments[]` editor role |
| Copy Editing | New status or `accepted` + `copyEditComplete` flag |
| Proofreading | New status or `scheduled` + `proofApproved` flag |
| Archival | `published` + repository deposit flag |

**Recommendation:** Extend enum in v1.4.x after operational feedback — do not break existing API contracts.

---

## Roles

| Role | Dashboard | Permissions (target) |
|------|-----------|---------------------|
| **Author** | `/dashboard/author` | Submit, revise, view decisions |
| **Reviewer** | `/dashboard/reviewer` | Accept/decline invites, submit review |
| **Editor** | `/dashboard/editor` | Assign reviewers, recommend decision |
| **Managing Editor** | Editor + screening | Desk reject, assign editor |
| **Administrator** | `/dashboard/admin` | Users, config, analytics |
| **Publisher** | Admin subset | DOI deposit, issue publish |

**Today:** Role display in dashboards; backend enforces permissions on Render API.

---

## Data Model (TypeScript — in code)

```typescript
interface EditorialManuscript {
  id: string;
  title: string;
  status: ManuscriptStatus;
  submittedAt: string;
  assignments: ReviewAssignment[];
  notes: EditorialNote[];
  history: StatusHistoryEntry[];
  schedule?: PublicationSchedule;
}
```

**Persistence today:** Render backend (`/api/manuscripts` BFF); editorial types not wired to live API.

---

## Double-Blind Review

| Requirement | V2 Implementation |
|-------------|-------------------|
| Hide author from reviewer | Backend field masking + UI |
| Hide reviewer from author | Anonymous review IDs |
| Editor sees identities | Editor role bypass |
| Conflict of interest check | Reviewer decline reason + editor flag |

**Not implemented** — architecture supports via `ReviewAssignment.visibility` extension.

---

## Audit Logs

Every transition must record:

```typescript
interface StatusHistoryEntry {
  status: ManuscriptStatus;
  at: string;
  by: string;
  note?: string;
}
```

**V2:** Persist to PostgreSQL `manuscript_status_history` + `auditLog()` for security events.

**Today:** `auditLog()` in-memory buffer (`monitoring/sentry.ts`).

---

## UI Components (Existing)

| Component | Path | Status |
|-----------|------|--------|
| `EditorialWorkflowPanel` | `components/dashboard/` | Placeholder UI |
| `EditorDashboard` | `components/dashboard/` | Shell |
| `ReviewerDashboard` | `components/dashboard/` | Shell |
| `ManuscriptList` | `components/dashboard/` | Fetches via BFF |
| `SubmissionTimeline` | `components/dashboard/` | Visual timeline |
| `SubmissionWizard` | `components/submission/` | Modern 4-step submit |

---

## Email Triggers (see INTEGRATIONS.md)

| Event | Template ID |
|-------|-------------|
| Submission received | `submission_acknowledgement` |
| Reviewer invited | `reviewer_invitation` |
| Revision requested | `revision_request` |
| Accepted | `acceptance` |
| Rejected | `rejection` |
| Published | `publication_notice` |

Templates exist in `email/queue.ts` — not connected to workflow transitions.

---

## Implementation Phases

| Step | Effort | Depends on |
|------|--------|------------|
| Wire transitions to backend API | 2–3 weeks | Render API contract |
| Reviewer invite flow | 2 weeks | Email queue |
| Blind review masking | 1–2 weeks | Backend |
| Copy edit / proof flags | 1 week | Editorial enum extension |
| Issue scheduling UI | 2 weeks | Volume/issue CMS |
| Full audit persistence | 1 week | PostgreSQL (Phase 7) |

---

## Related

- [V2_ROADMAP.md](./V2_ROADMAP.md) Phase 2
- [INTEGRATIONS.md](./INTEGRATIONS.md)
- [PUBLISHING_ARCHITECTURE.md](./PUBLISHING_ARCHITECTURE.md)
- [DASHBOARDS.md](./DASHBOARDS.md)
