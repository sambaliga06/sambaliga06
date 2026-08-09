import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import useExpenses from "./hooks/useExpenses";

function App() {
  const {
    expenses,
    addExpense,
    deleteExpense
  } = useExpenses();

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm onAddExpense={addExpense} />

      <ExpenseList
        expenses={expenses}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
}

export default App;