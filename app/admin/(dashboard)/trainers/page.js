import { readDB } from "@/lib/db";
import CrudManager from "@/components/admin/CrudManager";

export default function AdminTrainersPage() {
  const db = readDB();

  const fields = [
    { key: "name", label: "Trainer Name", type: "text", required: true },
    { key: "image", label: "Image URL", type: "text", required: true },
    { key: "specialization", label: "Specialization", type: "text", required: true },
    { key: "experience", label: "Experience (e.g. 8 years)", type: "text", required: true },
    { key: "certifications", label: "Certifications (comma separated)", type: "tags" },
    { key: "availability", label: "Availability days (comma separated)", type: "tags" },
  ];

  const columns = [
    { key: "image", label: "Preview", type: "image" },
    { key: "name", label: "Name" },
    { key: "specialization", label: "Specialization" },
    { key: "experience", label: "Experience" },
    { key: "active", label: "Status", type: "active" },
  ];

  return (
    <CrudManager
      collection="trainers"
      prefix="tr"
      title="Trainers"
      singular="Trainer"
      fields={fields}
      items={db.trainers}
      columns={columns}
    />
  );
}
