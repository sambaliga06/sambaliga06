import { useState } from "react";
import { getCategoryTotals } from "./utils/expenseUtils";
import ExpensePieChart from "./components/ExpensePieChart";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

import useExpenses from "./hooks/useExpenses";

function App() {
const {
  expenses,
  addExpense,
  deleteExpense,
  editExpense
} = useExpenses();

  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");
  const [editingExpense, setEditingExpense] = useState(null);

const filteredExpenses = expenses.filter((expense) => {
  const expenseDate = new Date(expense.date);

  const matchesYear =
    year === "all" ||
    expenseDate.getFullYear() === Number(year);

  const matchesMonth =
    month === "all" ||
    expenseDate.getMonth() === Number(month);

  return matchesYear && matchesMonth;
});

const totalExpense = filteredExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

const categoryTotals = getCategoryTotals(filteredExpenses);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onAddExpense={addExpense}
        expenseToEdit={editingExpense}
        onEditExpense={editExpense}
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