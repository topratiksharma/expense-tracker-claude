---
name: Recurring anti-patterns
description: Code quality issues observed across multiple files in the expense tracker
type: project
---

1. **Amount stored as string at source** — TransactionForm.jsx line 17 passes amount directly from input state (a string) to onAdd(). Summary.jsx and SpendingChart.jsx both defensively call Number(t.amount) to compensate. Fix should be at the source: parse in handleSubmit before calling onAdd. Partially fixed in consumers, not at origin.

2. **categories constant duplicated** — Defined identically in TransactionForm.jsx:3 and TransactionList.jsx:3. Should be extracted to src/constants.js or src/categories.js.

3. **ECharts option object has hardcoded dark-theme hex colors** — SpendingChart.jsx tooltip backgroundColor (#181C28), borderColor (#2A3048), textStyle color (#E4E8F4), xAxis/yAxis label colors (#60708A), splitLine color (#212638), bar label color (#E4E8F4) are all hardcoded dark values. These do not respond to the CSS variable theme switch, so the chart looks broken in light mode.

4. **handleAdd uses spread instead of functional update** — App.jsx:53 uses setTransactions([...transactions, transaction]) which closes over stale state in concurrent renders. Should be setTransactions(prev => [...prev, transaction]).

5. **handleDelete closes over stale transactions** — App.jsx:57 same issue: uses transactions.filter() directly instead of functional update form.

6. **Date.now() ID generation collides under rapid submission** — TransactionForm.jsx:16 uses `id: Date.now()` which produces duplicate keys if two transactions are added within the same millisecond tick. Observed via node simulation (10,000 rapid calls produced only 2 unique IDs). Fix: use crypto.randomUUID() or a counter.

7. **Amount validation allows zero, negative, and non-finite inputs** — TransactionForm.jsx:13 checks `!amount` which passes "0", "-50", and any negative string. A zero-amount or negative-amount transaction silently corrupts totals. Fix: validate `parseFloat(amount) > 0`.

8. **Global bare element selectors in App.css** — `form`, `table`, `thead`, `tbody`, `th`, `td`, `tr` are styled as bare element selectors (App.css lines 119, 238–267). Any future `<form>` or `<table>` added to the app picks up these styles unintentionally. Fix: scope under component class selectors (.add-transaction form, .transactions table, etc.).

9. **Negative balance renders as $-500.00 instead of -$500.00** — Summary.jsx line 18 prepends a literal "$" before fmt(balance). When balance is negative, `Number.toLocaleString` returns "-500.00" and the result is "$-500.00" rather than the conventional "-$500.00". Fix: use Intl.NumberFormat with style: 'currency' or handle the sign separately.

10. **No form labels — accessibility gap** — TransactionForm.jsx inputs have no `<label>` elements and no aria-label attributes. Screen readers cannot identify the purpose of each field. Same applies to filter selects in TransactionList.jsx.

11. **window.confirm for delete confirmation** — TransactionList.jsx:68 uses `window.confirm()` which blocks the JS thread, cannot be styled, fails in some test environments, and is inaccessible. Should be replaced with a proper modal (e.g. DeleteModal component).

**Why:** Observed during second full review session (2026-05-05), extending the prior session's findings.
**How to apply:** Flag these in any future review; note if they have been fixed.
