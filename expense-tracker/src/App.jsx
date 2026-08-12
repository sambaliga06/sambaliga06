import { useEffect, useState } from "react";
import {  getFilteredExpenses,  getCategoryTotals} from "./utils/expenseUtils";
import ExpensePieChart from "./components/ExpensePieChart";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

import useExpenses from "./hooks/useExpenses";

function App() {
const {
  expenses,
  categoryTotals,
  addExpense,
  deleteExpense,
  editExpense,
  fetchExpenseSummary
} = useExpenses();


  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");
  const [editingExpense, setEditingExpense] = useState(null);

const filteredExpenses = getFilteredExpenses(
  expenses,
  month,
  year
);

const totalExpense = filteredExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
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
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onAddExpense={addExpense}
        expenseToEdit={editingExpense}
        onEditExpense={handleEditExpense}
      />
      <ExpenseFilter
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />

      <h2>Total: ₹{totalExpense}</h2>



      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={deleteExpense}
        onEditExpense={setEditingExpense}
      />
      <h3>Category Breakdown</h3>


      <ExpensePieChart data={categoryTotals} />
    </div>

  );
}

export default App;