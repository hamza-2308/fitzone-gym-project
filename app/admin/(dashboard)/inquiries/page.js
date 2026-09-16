import { readDB } from "@/lib/db";
import InquiriesManager from "@/components/admin/InquiriesManager";

export default function AdminInquiriesPage() {
  const db = readDB();
  return <InquiriesManager inquiries={db.inquiries} />;
}
