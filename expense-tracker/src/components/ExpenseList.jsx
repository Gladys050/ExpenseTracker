function ExpenseList({ expenses = [], deleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No expenses yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {expense.category || expense.description}
            </p>
            <p className="text-sm text-gray-500">
              {expense.date || expense.month}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold text-purple-600">
              R{expense.amount}
            </p>
            <button
              onClick={() => deleteExpense(expense.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
