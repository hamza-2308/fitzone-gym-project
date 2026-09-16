import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminProgramsPage() {
  const db = readDB();

  const fields = [
    { key: "name", label: "Program Name", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <CrudManager
      collection="programs"
      prefix="pr"
      title="Fitness Programs"
      singular="Program"
      fields={fields}
      items={db.programs}
      columns={columns}
    />
  );
}
