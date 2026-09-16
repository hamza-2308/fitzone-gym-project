import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminEquipmentPage() {
  const db = readDB();
  const categoryOptions = db.equipmentCategories.map((c) => ({ value: c.id, label: c.name }));
  const categoryMap = Object.fromEntries(db.equipmentCategories.map((c) => [c.id, c.name]));

  const fields = [
    { key: "name", label: "Name", type: "text", required: true },
    { key: "category", label: "Category", type: "select", options: categoryOptions, required: true },
    { key: "image", label: "Image URL", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
    { key: "features", label: "Features (comma separated)", type: "tags" },
    { key: "benefits", label: "Benefits (comma separated)", type: "tags" },
    { key: "targetType", label: "Target Muscle / Training Type", type: "text" },
  ];

  const columns = [
    { key: "image", label: "Preview", type: "image" },
    { key: "name", label: "Name" },
    { key: "category", label: "Category", map: categoryMap },
    { key: "active", label: "Status", type: "active" },
  ];

  return (
    <CrudManager
      collection="equipment"
      prefix="eq"
      title="Equipment"
      singular="Equipment"
      fields={fields}
      items={db.equipment}
      columns={columns}
    />
  );
}
