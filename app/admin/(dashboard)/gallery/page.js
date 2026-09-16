import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminGalleryPage() {
  const db = readDB();

  const fields = [
    { key: "category", label: "Category (e.g. Gym, Equipment, Training Area, Facilities)", type: "text", required: true },
    { key: "image", label: "Image URL", type: "text", required: true },
  ];

  const columns = [
    { key: "image", label: "Preview", type: "image" },
    { key: "category", label: "Category" },
  ];

  return (
    <CrudManager
      collection="gallery"
      prefix="g"
      title="Gallery"
      singular="Image"
      fields={fields}
      items={db.gallery}
      columns={columns}
    />
  );
}
