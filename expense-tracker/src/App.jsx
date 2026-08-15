import { useEffect, useState } from "react";
import {  getFilteredExpenses,  getExpensesByDateRange} from "./utils/expenseUtils";
import ExpensePieChart from "./components/ExpensePieChart";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import ExpenseFilter from "./components/ExpenseFilter";
import ExpenseSummary from "./components/ExpenseSummary";

import DateRangeFilter from "./components/DateRangeFilter";
import useExpenses from "./hooks/useExpenses";
//import useCategories from "./hooks/useCategories";
//import CategoryManager from "./components/CategoryManager";

function App() {
const {
  expenses,
  categoryTotals,
  addExpense,
  deleteExpense,
  editExpense,
  fetchExpenseSummary
} = useExpenses();

//const {  categories,  addCategory,  deleteCategory,  categoryError} = useCategories();


  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");
  const [editingExpense, setEditingExpense] = useState(null);
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

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
const totalExpense = filteredExpenses.reduce(
  (total, expense) => total + expense.amount,
  0
);

async function handleEditExpense(id, expense) {
  await editExpense(id, expense);
  setEditingExpense(null);
}

useEffect(() => {
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

{/* <CategoryManager
  categories={categories}
  onAddCategory={addCategory}
  onDeleteCategory={deleteCategory}
  error={categoryError}
/> */}
      <ExpenseFilter
        month={month}
        year={year}
        onMonthChange={setMonth}
        onYearChange={setYear}
      />


        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />

        <ExpenseSummary expenses={filteredExpenses} />  


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