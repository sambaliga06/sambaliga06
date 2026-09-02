import { useState } from "react";
import "./ExpenseList.css";

function ExpenseList({ expenses, onDeleteExpense, onEditExpense }) {
const [searchTerm, setSearchTerm] = useState("");
const [sortOption, setSortOption] = useState("date-desc");

const searchedExpenses = expenses.filter((expense) => {
const search = searchTerm.toLowerCase();
const description = expense.description || "";
const category = expense.category || "";

return (
  description.toLowerCase().includes(search) ||
  category.toLowerCase().includes(search)
);


});

const sortedExpenses = [...searchedExpenses].sort((a, b) => {
switch (sortOption) {
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
}

});

return ( <div className="card shadow-sm"> <div className="card-body"> <div className="d-flex justify-content-between align-items-center mb-3"> <h5 className="card-title mb-0">
Expenses </h5>

      <span className="text-muted small">
        {expenses.length} expenses
      </span>
    </div>

    <div className="row g-3 mb-3">
      <div className="col-md-8">
        <input
          type="text"
          className="form-control"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="col-md-4">
        <select
          className="form-select"
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
      </div>
    </div>

    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedExpenses.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center text-muted py-4"
              >
                No expenses found.
              </td>
            </tr>
          ) : (
            sortedExpenses.map((expense) => (
              <tr
                key={expense._id}
                className="expense-row"
              >
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

                  {expense.description && (
                    <span className="expense-description">
                      {expense.description}
                    </span>
                  )}
                </td>

                <td className="fw-semibold">
                  ₹{expense.amount.toLocaleString("en-IN")}
                </td>

                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() =>
                        onEditExpense(expense)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        onDeleteExpense(expense._id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

);
}

export default ExpenseList;