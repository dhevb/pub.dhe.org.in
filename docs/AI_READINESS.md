# AI Readiness

**Version:** 2.0 (design)  
**Baseline:** v1.0.1  
**Policy:** **No external AI API calls.** Provider-agnostic interfaces only.

---

## Philosophy

Viksit Bharat Journal AI is **research infrastructure**, not chatbot integration:

- Reviewer recommendation (expertise matching)
- Similar papers (embedding similarity)
- Citation suggestions (bibliographic graph)
- Duplicate detection (corpus overlap)
- Keyword extraction (controlled vocabulary)
- Research summaries (structured abstracts)
- Trend analysis (corpus analytics)

**Never:** Tightly couple to OpenAI, Anthropic, or proprietary APIs in core paths.

---

## Current Module Registry

`src/lib/ai/registry.ts` — 9 modules, all `status: "placeholder"`:

| ID | Name | V2 Priority |
|----|------|-------------|
| `reviewer-suggestion` | Reviewer Suggestion | P1 |
| `semantic-search` | Semantic Search | P1 |
| `related-papers` | Related Papers | P1 |
| `citation-suggestions` | Citation Suggestions | P2 |
| `duplicate-detection` | Duplicate Detection | P2 |
| `paper-recommendation` | Paper Recommendation | P2 |
| `research-summaries` | Research Summaries | P3 |
| `research-assistant` | Research Assistant | P3 |
| `plagiarism-adapter` | Plagiarism Adapter | P2 |

Displayed in `AdminDashboard` as roadmap cards — no runtime execution.

---

## Provider-Agnostic Interface

```typescript
// Future: src/lib/ai/provider.ts
interface AiProvider {
  id: string;
  name: string;
  capabilities: AiModuleId[];
  embed(text: string): Promise<number[]>;
  complete(prompt: string, options?: CompletionOptions): Promise<string>;
}

interface AiModuleRunner {
  moduleId: AiModuleId;
  run(input: unknown, provider: AiProvider): Promise<unknown>;
}
```

### Deployment models (choose per module)

| Model | Use case | Data residency |
|-------|----------|----------------|
| Self-hosted (Ollama, vLLM) | Summaries, keywords | India/on-prem ✅ |
| Embedding service (local) | Semantic search | On-prem ✅ |
| Graph algorithms (no LLM) | Related papers, citations | In-process ✅ |
| External API (optional) | Only with explicit flag | Requires approval ❌ default |

---

## Module Specifications

### Reviewer Suggestion

**Input:** Manuscript title, abstract, keywords, author affiliations  
**Output:** Ranked list of reviewer user IDs with confidence scores  
**Method:** Expertise graph + keyword overlap (Phase 1); embeddings (Phase 2)  
**Human in loop:** Editor always confirms assignment

### Semantic Search

**Input:** Natural language query  
**Output:** Ranked `SearchDocument[]`  
**Hook exists:** `semanticSearchRegistry[]` in `search/engine.ts`  
**Index:** Vector store (pgvector or Qdrant self-hosted)

### Related Papers

**Input:** Paper ID  
**Output:** Top-N similar papers with explanation  
**Method:** Citation graph + embedding cosine similarity

### Citation Suggestions

**Input:** Manuscript draft text  
**Output:** Suggested references from corpus + OpenAlex (local cache)  
**Integration:** Extends `research/citations.ts`

### Duplicate Detection

**Input:** New submission PDF/text  
**Output:** Similarity score vs corpus + external adapter  
**Threshold:** Configurable; never auto-reject — flag for editor

### Plagiarism Adapter

```typescript
interface PlagiarismAdapter {
  id: "ithenticate" | "turnitin" | "copyleaks" | "local";
  check(document: Buffer): Promise<{ similarity: number; reportUrl?: string }>;
}
```

**Default:** No adapter configured — module disabled.

### Research Summaries

**Input:** Full manuscript  
**Output:** Structured summary (background, methods, findings, limitations)  
**Constraint:** Label as "AI-assisted" in UI; editor review required

---

## Feature Flags

```typescript
// Proposed additions to feature-flags.ts
semanticSearch: false,
reviewerSuggestion: false,
aiSummaries: false,
externalAiProviders: false,  // master kill switch
```

Env override: `NEXT_PUBLIC_FF_SEMANTIC_SEARCH=true`

---

## Data & Privacy

| Rule | Detail |
|------|--------|
| No training on user data | Without explicit consent |
| Manuscript text | Process on-prem or encrypted transit |
| PII masking | Strip emails before embedding |
| Audit | Log AI module invocations via `auditLog()` |
| Opt-out | Journal policy page required |

---

## Infrastructure Requirements (self-hosted)

| Component | Spec (minimum) |
|-----------|----------------|
| Embedding model | e.g. `bge-m3` via Ollama |
| Vector DB | pgvector or Qdrant |
| GPU (optional) | For local LLM summaries |
| API gateway | Internal only — not public |

**Not in Vercel scope** — separate compute (Railway, on-prem, or DHE infrastructure).

---

## Implementation Roadmap

| Phase | Deliverable | Depends on |
|-------|-------------|------------|
| 1 | Provider interface + mock runner | None |
| 2 | Related papers (graph-only, no LLM) | Paper index |
| 3 | Semantic search (pgvector) | PostgreSQL Phase 7 |
| 4 | Reviewer suggestion (keyword) | User profiles in DB |
| 5 | Duplicate detection (local similarity) | Submission storage |
| 6 | LLM summaries (self-hosted) | GPU infra approval |

---

## Testing Strategy

| Test | Method |
|------|--------|
| Module registry | Unit test — all IDs defined |
| Mock provider | Returns deterministic embeddings |
| No external calls | CI grep ban on `api.openai.com` |
| Golden set | 10 papers — related papers precision/recall |

---

## Related

- [src/lib/ai/registry.ts](../src/lib/ai/registry.ts)
- [search/engine.ts](../src/lib/search/engine.ts) — `semanticSearchRegistry`
- [V2_ROADMAP.md](./V2_ROADMAP.md) Phase 10
- [PROJECT_CHARTER.md](./PROJECT_CHARTER.md)
