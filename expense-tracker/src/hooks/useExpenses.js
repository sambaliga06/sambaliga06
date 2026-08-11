import { useEffect, useState } from "react";
import {  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseFromApi,
  updateExpense as updateExpenseFromApi} from "../services/expenseService";function useExpenses() {
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
async function editExpense(id, expense) {
  try {
    const updatedExpense = await updateExpenseFromApi(
      id,
      expense
    );

    setExpenses((currentExpenses) =>
      currentExpenses.map((currentExpense) =>
        currentExpense._id === id
          ? updatedExpense
          : currentExpense
      )
    );
  } catch (error) {
    console.error("Failed to update expense:", error);
  }
}

  return {
    expenses,
    addExpense,
    deleteExpense,
    editExpense
  };
}

export default useExpenses;