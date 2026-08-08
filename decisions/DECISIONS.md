# Repository Decisions

Stable decisions are append-only. If a decision is superseded, keep the old record and point to the replacement.

## D-001 — GitHub is the single source of truth

- Date: 2026-08-08
- Status: active
- Decision: `ChenWellesCxy/ai4ic-agent-learning` on `main` is the durable source of truth for learning state shared between home and work.
- Consequence: scratch workspaces, Excel exports and browser `localStorage` are not authoritative.

## D-002 — Markdown/JSON/YAML are live state; Excel is derived

- Date: 2026-08-08
- Status: active
- Decision: editable learning state lives in text formats that GitHub Web and AI assistants can read/merge. Excel may remain as an export.

## D-003 — One append-only Inbox drives AI synchronization

- Date: 2026-08-08
- Status: active
- Decision: scheduled ChatGPT checks only `sync/INBOX.md`. It detects change using the Git blob SHA and never writes back to Inbox.
- Consequence: bot-written derived files do not retrigger the watcher.

## D-004 — State advances only after successful semantic sync

- Date: 2026-08-08
- Status: active
- Decision: `sync/AI_SYNC_STATE.json` is the transaction marker and is updated last.
- Consequence: partial failures remain retryable and do not silently lose Inbox changes.

## D-005 — Company IP never enters the personal repository

- Date: 2026-08-08
- Status: active
- Decision: only public, personal or synthetic material is allowed. Company-derived learning must be abstracted/redacted before it reaches GitHub.

