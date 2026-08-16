import { useEffect, useState } from "react";

import {
  getFilteredExpenses,
  getExpensesByDateRange
} from "../utils/expenseUtils";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseFilter from "../components/ExpenseFilter";
import DateRangeFilter from "../components/DateRangeFilter";
import ExpenseSummary from "../components/ExpenseSummary";

import useExpenses from "../hooks/useExpenses";

function ExpensesPage() {
  const {
    expenses,
    addExpense,
    deleteExpense,
    editExpense,
    fetchExpenseSummary
  } = useExpenses();

  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [editingExpense, setEditingExpense] =
    useState(null);

  const monthYearExpenses = getFilteredExpenses(
    expenses,
    month,
    year
  );

  const filteredExpenses = getExpensesByDateRange(
    monthYearExpenses,
    startDate,
    endDate
  );

  async function handleEditExpense(id, expense) {
    await editExpense(id, expense);
    setEditingExpense(null);
  }

  useEffect(() => {
    console.log("Fetching summary for:", {
      month,
      year
    });

    fetchExpenseSummary(month, year);
  }, [month, year, expenses]);

  return (
    <div>
      <h1>Expenses</h1>

      <ExpenseSummary
        expenses={filteredExpenses}
      />

      <ExpenseForm
        onAddExpense={addExpense}
        expenseToEdit={editingExpense}
        onEditExpense={handleEditExpense}
      />

      <div className="card shadow-sm mb-4">
  <div className="card-body">
    <h5 className="card-title mb-3">
      Filters
    </h5>

    <div className="row g-3">
      <div className="col-md-6">
        <ExpenseFilter
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>

      <div className="col-md-6">
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </div>
    </div>
  </div>
</div>

      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={setEditingExpense}
      />
    </div>
  );
}

export default ExpensesPage;