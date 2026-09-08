import { useState } from "react";

import {  exportExpenses,  importExpenses} from "../services/expenseService";
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
  loadExpenses
  } = useExpenses();

  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingExpense, setEditingExpense] =    useState(null);
  const [importMessage, setImportMessage] = useState("");
  const [importError, setImportError] = useState("");

  

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
  async function handleExportExpenses() {
  try {
    await exportExpenses();
  } catch (error) {
    console.error("Failed to export expenses:", error);
  }
}

async function handleImportExpenses(e) {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to import "${file.name}"?`
  );

  if (!confirmed) {
    e.target.value = "";
    return;
  }

  setImportMessage("");
  setImportError("");

  try {
    const csv = await file.text();

    const result = await importExpenses(csv);

    if (result.invalidRows.length > 0) {
      setImportMessage(
        `Imported ${result.count} expenses. Invalid rows skipped: ${result.invalidRows.join(", ")}`
      );
    } else {
      setImportMessage(
        `Successfully imported ${result.count} expenses.`
      );
    }
    await loadExpenses();

  } catch (error) {
    setImportError(
      error.message || "Failed to import expenses."
    );
  }

  e.target.value = "";
}
  return (
    <div>
          {importMessage && (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        {importMessage}

        <button   type="button"  className="btn-close"    aria-label="Close"    onClick={() => setImportMessage("")}  />
      </div>
    )}

    {importError && (  <div className="alert alert-danger alert-dismissible fade show" role="alert">
    {importError}

    <button      type="button"  className="btn-close" aria-label="Close"    onClick={() => setImportError("")} />
  </div>
)}
      <div className="d-flex justify-content-between align-items-center mb-4">
  <h1 className="mb-0">Expenses</h1>

  <div className="d-flex gap-2">
    <label className="btn btn-outline-success">
      Import CSV
      <input
        type="file"
        accept=".csv"
        className="d-none"
        onChange={handleImportExpenses}
      />
    </label>

    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={handleExportExpenses}
    >
      Export CSV
    </button>
  </div>
</div>

      <ExpenseSummary        expenses={filteredExpenses}      />

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
              <ExpenseFilter month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
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
