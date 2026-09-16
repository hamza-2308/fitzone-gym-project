import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminCategoriesPage() {
  const db = readDB();

  const fields = [{ key: "name", label: "Category Name", type: "text", required: true }];
  const columns = [{ key: "name", label: "Name" }, { key: "id", label: "ID" }];

  return (
    <CrudManager
      collection="equipmentCategories"
      prefix="cat"
      title="Equipment Categories"
      singular="Category"
      fields={fields}
      items={db.equipmentCategories}
      columns={columns}
    />
  );
}
