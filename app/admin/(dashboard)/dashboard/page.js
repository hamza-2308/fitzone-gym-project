import Link from "next/link";
import { readDB } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";

export default function AdminDashboardPage() {
  const db = readDB();
  const today = new Date().toISOString().slice(0, 10);

  const stats = [
    { label: "Total Bookings", value: db.bookings.length },
    { label: "Pending Bookings", value: db.bookings.filter((b) => b.status === "Pending").length },
    { label: "Confirmed Bookings", value: db.bookings.filter((b) => b.status === "Confirmed").length },
    { label: "Upcoming Sessions", value: db.bookings.filter((b) => b.date >= today && b.status !== "Cancelled").length },
    { label: "Total Services", value: db.services.length },
    { label: "Total Packages", value: db.packages.length },
    { label: "Total Equipment", value: db.equipment.length },
    { label: "Total Trainers", value: db.trainers.length },
  ];

  const recent = [...db.bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  function nameFor(b) {
    if (b.serviceId) return db.services.find((s) => s.id === b.serviceId)?.name || "—";
    if (b.packageId) return db.packages.find((p) => p.id === b.packageId)?.name || "—";
    return "—";
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-1">Dashboard</h1>
      <p className="text-haze text-sm mb-8">Overview of FitZone bookings and content.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card p-6">
            <div className="font-display text-3xl text-bone">{s.value}</div>
            <div className="text-haze text-xs mt-1.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <h2 className="text-bone font-semibold">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-ember text-sm font-semibold">
            View all →
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-haze border-b border-white/5">
              <th className="px-6 py-3 font-medium">ID</th>
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Date / Time</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((b) => (
              <tr key={b.id} className="border-b border-white/5 last:border-0">
                <td className="px-6 py-3.5 text-bone/90">{b.id}</td>
                <td className="px-6 py-3.5 text-bone/90">{b.fullName}</td>
                <td className="px-6 py-3.5 text-bone/90">{nameFor(b)}</td>
                <td className="px-6 py-3.5 text-bone/90">{b.date} · {b.time}</td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
            {recent.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-haze">
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

