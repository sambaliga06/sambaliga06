function ExpenseSummary({ expenses }) {
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const transactionCount = expenses.length;

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="card-title text-muted">
              Total Expenses
            </h6>

            <h2 className="mb-0">
              ₹{totalExpense.toLocaleString("en-IN")}
            </h2>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm h-100">
          <div className="card-body">
            <h6 className="card-title text-muted">
              Transactions
            </h6>

            <h2 className="mb-0">
              {transactionCount}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseSummary;