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
    <div className="card shadow-sm">
  <div className="card-body">
    <h5 className="card-title">
      Category Management
    </h5>

    <p className="text-muted">
      Add or remove expense categories.
    </p>
      {error && (
  <div className="alert alert-danger" role="alert">
    {error}
  </div>
    )}
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

    <ul className="list-group">
      {categories.map((category) => (
        <li
          key={category._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{category.name}</span>

          <button
            className="btn btn-sm btn-outline-danger"
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
    </div>
  );
}

export default CategoryManager;