# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Production build (output: dist/)
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

No test framework is configured — there are no tests.

Use `npm` (not `yarn`) even though a `yarn.lock` exists in the repo.

## Architecture

Single-page React app (React 19, Vite 7) with no backend — all state is in-memory and resets on page refresh.

- `src/main.jsx` — React entry point, mounts `<App />` to `#root`
- `src/App.jsx` — root component; owns the `transactions` array state and passes data/callbacks down to children
- `src/Summary.jsx` — displays income, expense, and balance totals derived from the transactions prop
- `src/TransactionForm.jsx` — controlled form for adding a transaction; owns its own field state and calls `onAdd(transaction)` on submit
- `src/TransactionList.jsx` — renders the transactions table with type/category filters; owns filter state locally
- `src/App.css` / `src/index.css` — plain CSS, no CSS-in-JS

The app tracks financial transactions with fields: `id`, `description`, `amount`, `type` (income/expense), `category`, and `date`. State is a `useState` array in `App.jsx` seeded with hardcoded sample data.

The shared `categories` constant (`["food", "housing", "utilities", "transport", "entertainment", "salary", "other"]`) is currently duplicated in `TransactionForm.jsx` and `TransactionList.jsx`.

ESLint uses the flat config format (`eslint.config.js`) with `react-hooks` and `react-refresh` plugins. Unused variables are errors unless they match `^[A-Z_]`.

## Known bugs (intentional — this is a course starter project)

This repo is the starting point for a [Claude Code course](https://codewithmosh.com/p/claude-code). It ships with deliberate problems to be fixed during the course:

1. **Broken summary totals** — `amount` is stored as a string (from the `<input type="number">`), so the `reduce` calls in the summary cards do string concatenation instead of addition. Fix: parse `amount` to a number on input or at read time.
2. **Miscategorized seed transaction** — "Freelance Work" (id 4) has `type: "expense"` but `category: "salary"`, making it an expense that counts against totals. Likely meant to be `type: "income"`.
3. **Poor UI** — intentionally unstyled/rough; improvements are expected as part of the course exercises.
