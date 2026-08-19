import { useEffect, useState } from "react";
import useCategories from "../hooks/useCategories";

function ExpenseForm({  onAddExpense,  expenseToEdit,  onEditExpense}) {  
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const { categories } = useCategories();
  const [error, setError] = useState("");


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

  if (Number(amount) <= 0) {
    setError("Amount must be greater than 0.");
    return;
  }

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
    <div className="card shadow-sm mb-4">
  <div className="card-body">
    <h5 className="card-title mb-3">
      {expenseToEdit ? "Edit Expense" : "Add Expense"}
    </h5>

    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-3">
          <label className="form-label">
            Amount
          </label>

          <input type="number"  className="form-control"  value={amount}  onChange={(e) => setAmount(e.target.value)}  min="0" required/>
        </div>

        <div className="col-md-3">
          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label className="form-label">
            Date
          </label>

          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">
            Description
          </label>

          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Optional"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
          >
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
  );
}

export default ExpenseForm;