# Roadmap

This project sits at **Rung 1 (Prompt/Utility)** of the AI Agent Engineering
Ladder today — deterministic client-side CRUD over `localStorage`, no agent
loop. The stages below follow the author's Foundation → Integration →
Advanced → Validation pattern; each is only listed because it's a realistic
next step for *this* repo.

## Stage 1 — Foundation: harden this repo (in progress)

- [x] Extract id generation, totals, validation, and storage parsing into a
      typed, testable module (`lib/expense-utils.ts`)
- [x] Fix a real id-collision bug: `expenses.length + 1` produced duplicate
      ids after any delete (see `lib/expense-utils.test.ts`, "does not
      collide after a middle item is deleted")
- [x] Handle corrupt/tampered `localStorage` data without crashing on load
      (first Resilience primitive — was previously an unguarded `JSON.parse`)
- [x] Reject empty-name / zero-or-negative-amount submissions instead of
      silently accepting them
- [x] CI (lint, test, build) on every push/PR
- [ ] Replace numeric ids with a proper UUID (removes the whole class of
      collision bug rather than just the specific case above)
- [ ] Categories/tags for expenses; a monthly view

## Stage 2 — Integration: wrap the core logic as a callable tool

`lib/expense-utils.ts` is already pure and framework-free. Stage 2 is
packaging it as a `SKILL.md`/MCP tool exposing `addExpense`, `getTotal`,
and `getExpensesInRange` — so an agent could log or summarize spending
without going through the UI.

## Stage 3 — Advanced: an agent loop that uses the tool autonomously

A concrete use case for *this* app: a **budget-alert agent** that watches
running totals against a category budget and proactively flags overspend —
"you've spent 90% of your Dining Out budget with 10 days left in the
month" — without a human opening the app to check.

## Stage 4 — Validation: multi-agent + cloud-native

Not a near-term commitment for a single-user, localStorage-only app. This
becomes relevant only if the app grows a real backend (multi-device sync,
shared household budgets) — at that point, containerizing a sync service
and adding observability would be the actual next step, not before.
