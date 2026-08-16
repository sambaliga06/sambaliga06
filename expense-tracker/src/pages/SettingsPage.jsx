import CategoryManager from "../components/CategoryManager";
import useCategories from "../hooks/useCategories";

function SettingsPage() {
    const {
    categories,
    addCategory,
    deleteCategory,
    categoryError
  } = useCategories();

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Settings</h1>

        <p className="text-muted mb-0">
          Manage your application settings.
        </p>
      </div>

<CategoryManager  categories={categories}  onAddCategory={addCategory}  onDeleteCategory={deleteCategory}  error={categoryError}/>
    </div>
  );
}

export default SettingsPage;