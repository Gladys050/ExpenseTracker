import { useState } from "react";
import { categories } from "../constants/categories";

function ExpenseForm({ addExpense }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    if (!category || !amount || !date) return;

    const expenseDate = new Date(date);
    const newExpense = {
      id: Date.now(),
      category,
      amount: Number(amount),
      date,
      month: expenseDate.toLocaleString("default", { month: "long" }),
      year: expenseDate.getFullYear(),
    };

    addExpense(newExpense);
    setCategory("");
    setAmount("");
    setDate("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
      >
        Add Expense
      </button>
    </div>
  );
}

export default ExpenseForm;
