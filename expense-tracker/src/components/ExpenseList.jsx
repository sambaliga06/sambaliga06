function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <div>
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id}>
            <p>Amount: ₹{expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Description: {expense.description}</p>
            <p>Date: {expense.date}</p>

            <button onClick={() => onDeleteExpense(expense.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;