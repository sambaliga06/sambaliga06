import { useEffect, useState } from "react";
import {  getExpenses,  createExpense,  deleteExpense as deleteExpenseFromApi} from "../services/expenseService";
function useExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const data = await getExpenses();

        console.log("Expenses received from API:", data);

        setExpenses(data);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      }
    }

    loadExpenses();
  }, []);

  async function addExpense(expense) {
    try {
      const savedExpense = await createExpense(expense);

      setExpenses((currentExpenses) => [
        ...currentExpenses,
        savedExpense
      ]);
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  }

  async function deleteExpense(id) {
  try {
    await deleteExpenseFromApi(id);

    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense._id !== id
      )
    );
  } catch (error) {
    console.error("Failed to delete expense:", error);
  }
}

  return {
    expenses,
    addExpense,
    deleteExpense
  };
}

export default useExpenses;