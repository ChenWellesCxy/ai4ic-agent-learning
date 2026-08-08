# AI Sync Inbox

This is the **only file watched by the scheduled ChatGPT sync worker**.

At work, append new learning progress, ideas, decisions, questions or blockers below. The worker never edits this file; it detects changes by Git blob SHA and routes new/changed content into canonical repository files.

## Entry template

```markdown
## YYYY-MM-DD-NNN — Short title
- type: progress | idea | decision | research | question | blocker
- source: work | home | company-ai | chatgpt
- status: new

What changed / what I learned:
- ...

Evidence / links (public or personal only):
- ...

Next thought / question:
- ...
```

## Safety before you paste

Do not put company PDK/spec/netlist/schematic/waveform/log/source code/internal URLs/credentials or other proprietary material here. Convert work-derived learning into a public/synthetic abstraction first.

---

<!-- Append new entries below this line. Do not delete old entries; stable IDs make sync deduplication reliable. -->

