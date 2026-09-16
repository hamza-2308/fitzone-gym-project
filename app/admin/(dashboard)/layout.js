import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin | FitZone" };

export default function AdminDashboardLayout({ children }) {
  if (!isAdminAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-ink">
      <AdminSidebar />
      <main className="flex-1 pt-16 lg:pt-8 px-4 sm:px-6 md:px-8 lg:p-10 max-w-[1400px]">{children}</main>
    </div>
  );
}
