import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  deleteCategory as deleteCategoryFromApi
} from "../services/categoryService";

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );
      }
    }

    loadCategories();
  }, []);

  async function addCategory(name) {
    try {
      setCategoryError("");

      const savedCategory = await createCategory(name);

      setCategories((currentCategories) => [
        ...currentCategories,
        savedCategory
      ]);
    } catch (error) {
      console.error(
        "Failed to add category:",
        error
      );

      setCategoryError(error.message);
    }
  }

  async function deleteCategory(id) {
    try {
      setCategoryError("");

      await deleteCategoryFromApi(id);

      setCategories((currentCategories) =>
        currentCategories.filter(
          (category) => category._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete category:",
        error
      );

      setCategoryError(error.message);
    }
  }

  return {
    categories,
    addCategory,
    deleteCategory,
    categoryError
  };
}

export default useCategories;