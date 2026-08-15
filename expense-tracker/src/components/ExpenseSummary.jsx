function ExpenseSummary({ expenses }) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const transactionCount = expenses.length;

  return (
    <div>
      <div>
        <h3>Total Expenses</h3>
        <p>₹{totalExpense}</p>
      </div>

      <div>
        <h3>Transactions</h3>
        <p>{transactionCount}</p>
      </div>
    </div>
  );
}

export default ExpenseSummary;