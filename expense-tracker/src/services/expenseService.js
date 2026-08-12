const API_URL = "http://localhost:5000/api/expenses";

export async function getExpenses() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return response.json();
}

export async function createExpense(expense) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return response.json();
}

export async function deleteExpense(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete expense");
  }

  return response.json();
}

export async function updateExpense(id, expense) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || "Failed to update expense"
    );
  }

  return response.json();
}

export async function getExpenseSummary(month, year) {
  let url = `${API_URL}/summary`;

  const params = new URLSearchParams();

  if (year !== "all") {
    params.append("year", year);
  }

  if (month !== "all") {
    params.append("month", month);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch expense summary");
  }

  return response.json();
}