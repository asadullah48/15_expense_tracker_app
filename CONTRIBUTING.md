# Contributing to Expense Tracker

Thanks for wanting to help! This is a small, client-only Next.js app —
contributions of any size are welcome.

## Getting set up

```bash
git clone https://github.com/asadullah48/15_expense_tracker_app.git
cd 15_expense_tracker_app
npm install
npm run dev
```

No API keys, no `.env` file — everything runs client-side against
`localStorage`.

## Before opening a PR

```bash
npm run lint
npm test
npm run build
```

All three run in CI on every push and pull request.

## Code style

- id generation, totals, draft validation, and localStorage parsing live
  in `lib/expense-utils.ts` — pure, framework-free, and unit tested in
  `lib/expense-utils.test.ts`. Keep new logic there rather than inline in
  the component so it stays testable.
- See `docs/ROADMAP.md` for where this project is headed.

## Reporting bugs / suggesting features

Open a GitHub issue with steps to reproduce (bugs) or the use case you have
in mind (features).
