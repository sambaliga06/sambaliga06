
export function getFilteredExpenses(expenses, month, year) {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    const matchesYear =
      year === "all" ||
      expenseDate.getFullYear() === Number(year);

    const matchesMonth =
      month === "all" ||
      expenseDate.getMonth() === Number(month);

    return matchesYear && matchesMonth;
  });
}