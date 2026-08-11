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