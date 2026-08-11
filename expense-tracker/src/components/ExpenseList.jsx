function ExpenseList({  expenses,  onDeleteExpense,  onEditExpense}) {  return (
    <div>
      <h2>Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense._id}>
            <p>Amount: ₹{expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Description: {expense.description}</p>
            <p>Date: {expense.date}</p>

            <button onClick={() => onEditExpense(expense)}>
              Edit
            </button>

            <button onClick={() => onDeleteExpense(expense._id)}>
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