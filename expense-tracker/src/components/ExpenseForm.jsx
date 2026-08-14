import { useEffect, useState } from "react";

function ExpenseForm({  onAddExpense,  expenseToEdit,  onEditExpense,  categories}) {  
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
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>

  {categories.map((item) => (
    <option
      key={item._id}
      value={item.name}
    >
      {item.name}
    </option>
  ))}
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