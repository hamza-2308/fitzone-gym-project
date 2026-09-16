import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminServicesPage() {
  const db = readDB();

  const fields = [
    { key: "name", label: "Service Name", type: "text", required: true },
    { key: "image", label: "Image URL", type: "text", required: true },
    { key: "description", label: "Description", type: "textarea", required: true },
    { key: "benefits", label: "Benefits (comma separated)", type: "tags" },
    { key: "duration", label: "Duration (e.g. 60 min)", type: "text", required: true },
    { key: "price", label: "Price (Rs)", type: "number", required: true },
  ];

  const columns = [
    { key: "image", label: "Preview", type: "image" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price", type: "price" },
    { key: "duration", label: "Duration" },
    { key: "active", label: "Status", type: "active" },
  ];

  return (
    <CrudManager
      collection="services"
      prefix="srv"
      title="Services"
      singular="Service"
      fields={fields}
      items={db.services}
      columns={columns}
    />
  );
}
