import { useState } from 'react'
import { CATEGORIES } from './categories'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!description.trim()) errs.description = "Description is required.";
    const parsed = parseFloat(amount);
    if (!amount.trim()) errs.amount = "Amount is required.";
    else if (isNaN(parsed) || parsed <= 0) errs.amount = "Enter a valid amount greater than 0.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setErrors({});
    onAdd({
      id: crypto.randomUUID(),
      description: description.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0],
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field-group" style={{ flex: 2, minWidth: 140 }}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            className={errors.description ? 'field-error' : ''}
            aria-invalid={!!errors.description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
            }}
          />
          {errors.description && <span className="field-error-msg">{errors.description}</span>}
        </div>
        <div className="field-group" style={{ flex: 1, minWidth: 100 }}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            className={errors.amount ? 'field-error' : ''}
            aria-invalid={!!errors.amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errors.amount) setErrors(prev => ({ ...prev, amount: undefined }));
            }}
          />
          {errors.amount && <span className="field-error-msg">{errors.amount}</span>}
        </div>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm
