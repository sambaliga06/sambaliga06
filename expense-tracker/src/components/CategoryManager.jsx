import { useState } from "react";

function CategoryManager({
  categories,
  onAddCategory,
  onDeleteCategory,
  error
}) {
  const [newCategory, setNewCategory] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const name = newCategory.trim();

    if (!name) {
      return;
    }

    await onAddCategory(name);

    setNewCategory("");
  }

  return (
    <div>
      <h2>Category Management</h2>
            {error && (  <p>  {error} </p> )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) =>
            setNewCategory(e.target.value)
          }
          placeholder="New category"
        />

        <button type="submit">
          Add Category
        </button>
      </form>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}

            <button
              onClick={() =>
                onDeleteCategory(category._id)
              }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;