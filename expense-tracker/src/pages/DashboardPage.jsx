import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Header from "../components/Header";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function DashboardPage() {
  const [expenses, setExpenses] = useState([]);
  const addExpense = async (newExpense) => {
    const { data, error } = await supabase
      .from("expenses")
      .insert([newExpense])
      .select();

    if (!error) {
      setExpenses([data[0], ...expenses]);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.log(error);
    else setExpenses(data);
  };
  const deleteExpense = async (id) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);

    if (!error) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const total = expenses.reduce((sum, expenses) => {
    return sum + expenses.amount;
  }, 0);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Expense Tracker" subtitle="Track your spending" />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ExpenseForm addExpense={addExpense} />
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        {expenses.length > 0 && (
          <div className="mt-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Spending:</p>
            <p className="text-4xl font-bold text-purple-600">
              R {total.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
