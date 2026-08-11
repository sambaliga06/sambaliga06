import { useEffect, useState } from "react";

function ExpenseForm({  onAddExpense,  expenseToEdit,  onEditExpense}) {  
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
  if (expenseToEdit) {
    setAmount(expenseToEdit.amount);
    setCategory(expenseToEdit.category);
    setDescription(expenseToEdit.description);
    setDate(expenseToEdit.date.split("T")[0]);
  }
}, [expenseToEdit]);

  async function handleSubmit(e) {
  e.preventDefault();

  const expense = {
    amount: Number(amount),
    category,
    description,
    date
  };

  if (expenseToEdit) {
    await onEditExpense(
      expenseToEdit._id,
      expense
    );
  } else {
    await onAddExpense(expense);
  }

  setAmount("");
  setCategory("");
  setDescription("");
  setDate("");
}

  return (
    <div>
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <button type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;