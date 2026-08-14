const API_URL = "http://localhost:5000/api/categories";

export async function getCategories() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function createCategory(name) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name
    })
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || "Failed to create category"
    );
  }

  return response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(
      errorData.message || "Failed to delete category"
    );
  }

  return response.json();
}