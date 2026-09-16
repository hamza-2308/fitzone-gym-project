import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminPackagesPage() {
  const db = readDB();

  const fields = [
    { key: "name", label: "Package Name", type: "text", required: true },
    { key: "price", label: "Price (Rs)", type: "number", required: true },
    { key: "duration", label: "Duration (e.g. Monthly)", type: "text", required: true },
    { key: "benefits", label: "Benefits (comma separated)", type: "tags" },
  ];

  const columns = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price", type: "price" },
    { key: "duration", label: "Duration" },
    { key: "active", label: "Status", type: "active" },
  ];

  return (
    <CrudManager
      collection="packages"
      prefix="pkg"
      title="Membership Packages"
      singular="Package"
      fields={fields}
      items={db.packages}
      columns={columns}
    />
  );
}
