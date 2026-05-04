function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpenses;

  const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="summary">
      <div className="summary-card income">
        <h3>Income</h3>
        <p className="amount">${fmt(totalIncome)}</p>
      </div>
      <div className="summary-card expense">
        <h3>Expenses</h3>
        <p className="amount">${fmt(totalExpenses)}</p>
      </div>
      <div className="summary-card balance">
        <h3>Balance</h3>
        <p className="amount">${fmt(balance)}</p>
      </div>
    </div>
  );
}

export default Summary;
