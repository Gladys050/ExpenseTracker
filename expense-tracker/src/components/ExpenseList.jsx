import { useState } from "react";

function ExpenseList({ expenses = [], deleteExpense }) {
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id}>
          <p>
            {" "}
            {expense.description} - R{expense.amount}
          </p>
          <button onClick={() => deleteExpense(expense.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
