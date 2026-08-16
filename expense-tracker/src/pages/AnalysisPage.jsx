import { useEffect, useState } from "react";

import ExpenseFilter from "../components/ExpenseFilter";
import ExpensePieChart from "../components/ExpensePieChart";

import useExpenses from "../hooks/useExpenses";

function AnalysisPage() {
  const {
    categoryTotals,
    fetchExpenseSummary
  } = useExpenses();

  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  useEffect(() => {
    console.log("Fetching analysis for:", {
      month,
      year
    });

    fetchExpenseSummary(month, year);
  }, [month, year]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Expense Analysis</h1>

        <p className="text-muted mb-0">
          Understand where your money is going.
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            Filters
          </h5>

          <ExpenseFilter month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">
            Category Breakdown
          </h5>

          <ExpensePieChart data={categoryTotals} />
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;