# 💰 Expense Tracker

![CI](https://github.com/asadullah48/15_expense_tracker_app/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Agentic AI Ladder](https://img.shields.io/badge/Agentic_AI_Ladder-Rung_1_—_Prompt%2FUtility-orange)

## Overview

A local-first expense tracker: add, edit, and delete expenses, see a running
total, all persisted to `localStorage` with no backend and no signup. Built
for anyone who wants a fast personal-spending log without handing data to a
third-party service.

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 18
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + shadcn/ui components on Radix primitives
- **Persistence:** `localStorage` — no backend, no account
- **Dates:** `date-fns`
- **Testing:** Vitest, unit tests for id generation, totals, validation,
  and storage parsing
- **CI:** GitHub Actions (lint, test, build on every push/PR)

## Features

- ➕ Add, ✏️ edit, and 🗑️ delete expenses (name, amount, date)
- 💵 Running total, recalculated live
- 💾 Persists to `localStorage` — reload the page, your data's still there
- ⚠️ Rejects an empty name or a zero/negative amount instead of silently
  accepting bad input
- 🛡️ Corrupt or tampered `localStorage` data degrades to the starter list
  instead of crashing the app on load

## Agentic AI Alignment

This is a CRUD utility, not an agent — no LLM, no planning, no autonomous
multi-step behavior. It's rung 1 (Prompt/Utility) of the ladder. What
follows is what's really here now vs. what climbing higher concretely
requires.

### Autonomy
**Now:** the app makes small unsupervised decisions today — it auto-assigns
each new expense a unique id (`lib/expense-utils.ts:nextExpenseId`) and
auto-persists every change to `localStorage` with no explicit "save" step.
Notably, the id logic used to be buggy: `expenses.length + 1` produced
duplicate ids after any delete, which this audit fixed (see the "original
bug" test case in `lib/expense-utils.test.ts`) — autonomous behavior is
only worth something if it's *correct* autonomous behavior.
**Planned (Stage 3):** a budget-alert agent that watches spending against a
threshold and proactively flags overspend, without a human checking
manually — see `docs/ROADMAP.md`.

### Resilience
**Now:** loading stored data used to call `JSON.parse` directly on
whatever was in `localStorage`, with no error handling — a corrupted or
manually-edited value would throw and break the app on load. This audit
added `parseStoredExpenses`, which returns `null` for anything that isn't
valid JSON or isn't shaped like an expense list, so the app falls back to
the starter data instead of crashing (`lib/expense-utils.test.ts`,
`"returns null for corrupt JSON instead of throwing"`). That's this app's
first concrete Resilience primitive.
**Planned:** a deterministic guardrail on the amount field itself (reject
absurd values like a 9-digit expense) before it's ever written to storage,
in the spirit of GuardrailAI-style deterministic checks.

### Adaptivity
**Now:** nothing adapts to the user — the same starter data and behavior
for everyone on first load.
**Planned:** remembering the user's preferred sort order and default
category, and (once categories exist) surfacing spending patterns back to
the user rather than just a flat list.

## Roadmap

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) for the full staged plan. Summary:

1. **Stage 1 (Foundation, in progress):** tests, typed logic module, id-collision fix, corrupt-storage handling, input validation — done; UUID ids, categories — planned
2. **Stage 2 (Integration):** wrap `lib/expense-utils.ts` as a callable tool/SKILL.md asset (`addExpense`, `getTotal`, `getExpensesInRange`)
3. **Stage 3 (Advanced):** a budget-alert agent that proactively flags overspend
4. **Stage 4 (Validation):** only relevant if the app grows a real multi-device backend — not a near-term commitment for a localStorage-only tracker

## Use Cases

- **Daily spend logging** — jot down a purchase in a few seconds, no
  account creation
- **Quick monthly gut-check** — see the running total without exporting to
  a spreadsheet
- **Offline-friendly tracking** — works with no backend, so it works with
  no internet after the first load

## Getting Started

```bash
git clone https://github.com/asadullah48/15_expense_tracker_app.git
cd 15_expense_tracker_app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No API key or `.env`
file needed.

```bash
npm run lint   # ESLint
npm test       # Vitest
npm run build  # production build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and the checks that run
in CI. Small, focused PRs welcome.

## Author

---
Built by **Asadullah Shafique**
🔗 Explore my portfolio — Agentic AI projects and real-world applications:
[asadullahshafique-devunity.vercel.app](https://asadullahshafique-devunity.vercel.app)
---
