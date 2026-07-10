# Cursor Rules — Viksit Bharat Journal

This folder configures how Cursor AI behaves on this project.

## Auto-applied rule

| File | Scope |
|------|--------|
| [rules/project-constitution.mdc](./rules/project-constitution.mdc) | **Always applies** — production steward mode (maintenance / pilot) |

## Full constitution

For new Cursor chats, also attach or reference:

**[docs/PROJECT_CHARTER.md](../docs/PROJECT_CHARTER.md)** — Master Engineering Constitution (vision, standards, release strategy, never/always rules)

**[docs/PILOT_MODE_CURSOR_PROMPT.md](../docs/PILOT_MODE_CURSOR_PROMPT.md)** — **Active during pilot** — feature freeze, allowed work, evidence-driven changes only

**[docs/PROJECT_STEWARD_CURSOR_PROMPT.md](../docs/PROJECT_STEWARD_CURSOR_PROMPT.md)** — **Permanent steward prompt** — preserve production quality; do not write code without justification

Post-pilot V2 work: **[docs/V2_EXECUTION_PROMPT.md](../docs/V2_EXECUTION_PROMPT.md)**

## Architecture decisions

**[docs/ARCHITECTURE_DECISIONS.md](../docs/ARCHITECTURE_DECISIONS.md)** — ADR log for major design choices

## Developer docs index

See [README.md](../README.md) → Developer Documentation section.

## Adding rules

Follow Cursor convention: create `.mdc` files in `.cursor/rules/` with YAML frontmatter (`description`, `alwaysApply`, optional `globs`). Keep rules focused and under ~50 lines when possible; link to `docs/` for detail.
