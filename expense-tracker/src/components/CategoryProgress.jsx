function CategoryProgress({ data }) {
  if (data.length === 0) {
    return <p>No expenses for this period.</p>;
  }

  const totalExpense = data.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div>
      <div className="mb-4">
        <div className="text-muted small">
          Total Expenses
        </div>

        <div className="fs-4 fw-semibold">
          ₹{totalExpense}
        </div>
      </div>

      {[...data].sort((a, b) => b.total - a.total).map((item) => {
        const percentage = (item.total / totalExpense) * 100;

        return (
          <div className="mb-4" key={item.category}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-semibold">
                {item.category}
              </span>

              <div className="d-flex gap-3">
                <span className="fw-semibold">
                  ₹{item.total}
                </span>

                <span className="text-muted">
                  {percentage.toFixed(1)}%
                </span>
              </div>
            </div>

            <div  className="progress"  style={{    height: "12px", borderRadius: "6px"  }}>
                <div  className="progress-bar bg-primary"  role="progressbar"    style={{ width: `${percentage}%`, borderRadius: "6px" }}  >

                </div>
            </div>
        </div>
        );
      })}
    </div>
  );
}

export default CategoryProgress;