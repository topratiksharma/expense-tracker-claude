---
name: Project architecture snapshot
description: Component map, state ownership, known tech debt, and intentional bugs for the expense tracker
type: project
---

React 19 + Vite 7 single-page app, no backend. State resets on page refresh.

Components (verified 2026-05-06):
- App.jsx — owns transactions[]; renders Summary, SpendingChart, TransactionForm, TransactionList
- Summary.jsx — derives income/expense/balance using Number() coercion defensively
- TransactionForm.jsx — controlled form; calls onAdd(transaction); amount passed as raw string (not fixed at source)
- TransactionList.jsx — filter state local; uses window.confirm for delete (no modal component exists)
- SpendingChart.jsx — echarts-for-react bar chart, hardcoded dark-theme hex colors in option object
- DeleteModal.jsx — DOES NOT EXIST in src/; window.confirm used instead in TransactionList

Known tech debt:
- categories constant duplicated in TransactionForm.jsx:3 and TransactionList.jsx:3 (not extracted)
- "Freelance Work" seed transaction still has type: "expense" / category: "salary" (intentional course bug, not yet fixed)
- TransactionForm still passes amount as string to onAdd — consumers call Number() defensively
- handleAdd and handleDelete in App.jsx use stale-closure update form (not functional update)
- No form labels or aria-label on any input/select — full accessibility gap
- Global bare element selectors (form, table, td, th, tr) in App.css affect all future elements

**Why:** This is a course starter project at codewithmosh.com — many bugs are intentional for student exercises.
**How to apply:** Flag remaining known bugs but note they may be intentional. Don't suggest removing them without confirming with user.
