import { useState } from "react";

import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";

import useExpenses from "./hooks/useExpenses";

function App() {
  const {
    expenses,
    addExpense,
    deleteExpense
  } = useExpenses();

  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

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

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm onAddExpense={addExpense} />

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
      />
    </div>
  );
}

export default App;