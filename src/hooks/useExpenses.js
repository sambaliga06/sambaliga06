import { useState } from "react";

function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      expense
    ]);
  }

  function deleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id)
    );
  }

  return {
    expenses,
    addExpense,
    deleteExpense
  };
}

export default useExpenses;