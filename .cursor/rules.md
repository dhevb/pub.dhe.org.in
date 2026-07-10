# Cursor Rules — Viksit Bharat Journal

This folder configures how Cursor AI behaves on this project.

## Auto-applied rule

| File | Scope |
|------|--------|
| [rules/project-constitution.mdc](./rules/project-constitution.mdc) | **Always applies** — core invariants, workflow, verification |

## Full constitution

For new Cursor chats, also attach or reference:

**[docs/PROJECT_CHARTER.md](../docs/PROJECT_CHARTER.md)** — Master Engineering Constitution (vision, standards, release strategy, never/always rules)

## Architecture decisions

**[docs/ARCHITECTURE_DECISIONS.md](../docs/ARCHITECTURE_DECISIONS.md)** — ADR log for major design choices

## Developer docs index

See [README.md](../README.md) → Developer Documentation section.

## Adding rules

Follow Cursor convention: create `.mdc` files in `.cursor/rules/` with YAML frontmatter (`description`, `alwaysApply`, optional `globs`). Keep rules focused and under ~50 lines when possible; link to `docs/` for detail.
