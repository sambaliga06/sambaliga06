
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

export function getExpensesByDateRange(
  expenses,
  startDate,
  endDate
) {
  if (!startDate && !endDate) {
    return expenses;
  }

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);

      if (expenseDate < start) {
        return false;
      }
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      if (expenseDate > end) {
        return false;
      }
    }

    return true;
  });
}