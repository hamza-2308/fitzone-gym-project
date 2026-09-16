"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus, deleteBooking } from "@/lib/actions";
import StatusBadge from "@/components/admin/StatusBadge";

const STATUSES = ["Pending", "Confirmed", "Completed", "Cancelled"];

export default function BookingsManager({ bookings, services, packages, trainers }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [viewing, setViewing] = useState(null);

  function nameFor(b) {
    if (b.serviceId) return services.find((s) => s.id === b.serviceId)?.name || "—";
    if (b.packageId) return packages.find((p) => p.id === b.packageId)?.name || "—";
    return "—";
  }
  function trainerFor(b) {
    return trainers.find((t) => t.id === b.trainerId)?.name || "No preference";
  }

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => statusFilter === "All" || b.status === statusFilter)
      .filter(
        (b) =>
          query.trim() === "" ||
          b.fullName.toLowerCase().includes(query.toLowerCase()) ||
          b.phone.includes(query) ||
          b.id.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bookings, statusFilter, query]);

  function handleStatus(id, status) {
    startTransition(async () => {
      await updateBookingStatus(id, status);
      router.refresh();
    });
  }

  function handleDelete(id) {
    if (!confirm("Delete this booking? This cannot be undone.")) return;
    startTransition(async () => {
      await deleteBooking(id);
      setViewing(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-bone">Bookings</h1>
          <p className="text-haze text-sm mt-1">{bookings.length} total</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {["All", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3.5 py-2 rounded-sm border ${
                statusFilter === s ? "bg-ember text-ink border-ember font-semibold" : "border-white/10 text-haze"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, phone, or booking ID..."
          className="w-full sm:w-72 sm:ml-auto"
        />
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-haze border-b border-white/5">
              <th className="px-5 py-3.5 font-medium">Booking ID</th>
              <th className="px-5 py-3.5 font-medium">Customer</th>
              <th className="px-5 py-3.5 font-medium">Service / Package</th>
              <th className="px-5 py-3.5 font-medium">Trainer</th>
              <th className="px-5 py-3.5 font-medium">Date / Time</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3.5 text-bone/90">{b.id}</td>
                <td className="px-5 py-3.5 text-bone/90">{b.fullName}</td>
                <td className="px-5 py-3.5 text-bone/90">{nameFor(b)}</td>
                <td className="px-5 py-3.5 text-bone/90">{trainerFor(b)}</td>
                <td className="px-5 py-3.5 text-bone/90 whitespace-nowrap">{b.date} · {b.time}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <button onClick={() => setViewing(b)} className="text-xs text-steel hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-haze">
                  No bookings match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="card p-8 w-full max-w-md">
            <h2 className="font-display text-xl text-bone mb-5">Booking {viewing.id}</h2>
            <div className="space-y-2.5 text-sm">
              <Row label="Customer" value={viewing.fullName} />
              <Row label="Phone" value={viewing.phone} />
              <Row label="Email" value={viewing.email} />
              <Row label="WhatsApp" value={viewing.whatsapp || "—"} />
              <Row label="Service / Package" value={nameFor(viewing)} />
              <Row label="Trainer" value={trainerFor(viewing)} />
              <Row label="Date" value={viewing.date} />
              <Row label="Time" value={viewing.time} />
              <Row label="Fitness Goal" value={viewing.fitnessGoal || "—"} />
              {viewing.notes && <Row label="Notes" value={viewing.notes} />}
            </div>

            <div className="mt-6">
              <label className="text-xs text-haze block mb-2">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    disabled={isPending}
                    onClick={() => {
                      handleStatus(viewing.id, s);
                      setViewing({ ...viewing, status: s });
                    }}
                    className={`text-xs px-3 py-1.5 rounded-sm border ${
                      viewing.status === s ? "bg-ember text-ink border-ember font-semibold" : "border-white/10 text-haze"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mt-7">
              <button onClick={() => handleDelete(viewing.id)} className="btn-outline flex-1 justify-center text-sm py-2.5 text-ember border-ember/40">
                Delete Booking
              </button>
              <button onClick={() => setViewing(null)} className="btn-outline flex-1 justify-center text-sm py-2.5">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-2.5">
      <span className="text-haze shrink-0">{label}</span>
      <span className="text-bone text-right">{value}</span>
    </div>
  );
}
