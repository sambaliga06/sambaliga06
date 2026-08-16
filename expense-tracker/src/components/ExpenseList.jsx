import { useState } from "react";
import "./ExpenseList.css";



function ExpenseList({  expenses,  onDeleteExpense,  onEditExpense}) { 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");
  const searchedExpenses = expenses.filter((expense) => {
  const search = searchTerm.toLowerCase();

  const description = expense.description || "";
  const category = expense.category || "";

  return (
    description.toLowerCase().includes(search) ||
    category.toLowerCase().includes(search)
  ); });

  const sortedExpenses = [...searchedExpenses].sort((a, b) =>
  {    switch (sortOption) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);

      case "date-desc":
        return new Date(b.date) - new Date(a.date);

      case "amount-asc":
        return a.amount - b.amount;

      case "amount-desc":
        return b.amount - a.amount;

      default:
        return 0;
    }  }
);
 return (
  
<div>
  <h2>Expenses</h2>

  <input
    type="text"
    placeholder="Search expenses..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="date-desc">
      Date: Newest → Oldest
    </option>

    <option value="date-asc">
      Date: Oldest → Newest
    </option>

    <option value="amount-desc">
      Amount: Highest → Lowest
    </option>

    <option value="amount-asc">
      Amount: Lowest → Highest
    </option>
  </select>

  <div className="expense-list card shadow-sm">

  {sortedExpenses.length === 0 ? (
    <tr>
    <td colSpan="4" className="text-center text-muted py-4">
      No expenses found.
    </td>
  </tr>
  ) : (
    <table className="table table-hover align-middle">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {sortedExpenses.map((expense) => (
          <tr key={expense._id} className="expense-row">
            <td>
              {new Date(expense.date).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                }
              )}
            </td>

            <td className="expense-category">
                {expense.category}

            <span className="expense-description">
              {expense.description}
            </span>
            </td>

            <td>₹{expense.amount}</td>

            <td>
              <button className="btn btn-sm btn-outline-primary"
                onClick={() =>
                  onEditExpense(expense)
                }
              >
                Edit
              </button>

              <button className="btn btn-sm btn-outline-danger"
                onClick={() =>
                  onDeleteExpense(expense._id)
                }
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  </div>
</div>
 )}
export default ExpenseList;