import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div>
      <Header title="Expense Tracker" subtitle="Track your spending" />

      <h2>{count}</h2>

      <button onClick={() => setCount(count + 1)}>Increase</button>

      <button onClick={handleDecrease}>Decrease</button>
      <input type="text" />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p>Description: {description}</p>
      <p>Amount: {amount}</p>
    </div>
  );
}
export default App;
