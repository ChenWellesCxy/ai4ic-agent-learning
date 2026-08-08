# AI4IC Ideas & Experiment Backlog

> Canonical curated backlog. New raw ideas enter through `sync/INBOX.md`; merge and deduplicate them here with provenance IDs.

## Core tracks

### A. Verification / RCA Agent

Target loop: `spec → vPlan → SVA/TB → simulation/formal → evidence → RCA`.

### B. Memory / Full-Custom Waveform Debug Agent

Target loop: `fail → structured waveform query → compare/measure → hypothesis → targeted rerun/sweep → evidence → RCA`.

## Backlog

| ID | Idea | Why it matters | Smallest next experiment | Evidence of value | Status |
|---|---|---|---|---|---|
| seed-001 | Build EDA tools as typed/MCP-style interfaces rather than prompt-only actions | Makes the Agent loop auditable and transferable to real EDA tools | Wrap one public simulator action with typed inputs/outputs | Deterministic tool call + replayable result | seed |
| seed-002 | Use structured waveform queries instead of sending whole waveform dumps to an LLM | Matches full-custom verification scale and reduces context/noise | Extract 3–5 measurements from a synthetic VCD/SPICE run | RCA can cite measurements and timestamps | seed |

## Open questions

- Which public/synthetic circuit is the best Week 7 proxy for DRAM sense/margin debugging without carrying company IP?
- What mutation set best measures RCA quality rather than only compile/simulation pass rate?

