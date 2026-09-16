import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";

export default function AdminIndexPage() {
  redirect(isAdminAuthenticated() ? "/admin/dashboard" : "/admin/login");
}
