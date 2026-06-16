import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Header from "./components/Header";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
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
    <div>
      <Header title="Expense Tracker" subtitle="Track your spending" />

      <ExpenseForm addExpense={addExpense} />

      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />

      <h2>Total Spend:R {total}</h2>
    </div>
  );
}
export default App;
