export function getCategoryTotals(expenses) {
  const categoryTotals = {};

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  return Object.entries(categoryTotals).map(
    ([category, total]) => ({
      category,
      total
    })
  );
}
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