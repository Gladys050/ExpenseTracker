import { useState } from "react";
import { categories } from "../constants/categories";
import { getExpenseDateInfo } from "../utils/dateHelpers";

function ExpenseForm({ addExpense }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
    };
    addExpense(newExpense);

    setDescription("");
    setAmount("");
  };
  const expenseDate = new Date(date);

  const newExpense = {
    category,
    amount: Number(amount),

    date,

    month: expenseDate.toLocaleString("default", { month: "long" }),

    year: expenseDate.getFullYear(),
  };
  return (
    <div>
      <select
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.icon} {cat.label}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSubmit}>AddExpense</button>
    </div>
  );
}

export default ExpenseForm;
