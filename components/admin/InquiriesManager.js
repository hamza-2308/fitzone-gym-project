"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { markInquiryRead, deleteInquiry } from "@/lib/actions";
import StatusBadge from "@/components/admin/StatusBadge";

export default function InquiriesManager({ inquiries }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [viewing, setViewing] = useState(null);

  const sorted = [...inquiries].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function handleToggleRead(id) {
    startTransition(async () => {
      await markInquiryRead(id);
      router.refresh();
    });
  }

  function handleDelete(id) {
    if (!confirm("Delete this inquiry?")) return;
    startTransition(async () => {
      await deleteInquiry(id);
      setViewing(null);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-bone">Inquiries</h1>
          <p className="text-haze text-sm mt-1">{inquiries.length} total</p>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-haze border-b border-white/5">
              <th className="px-5 py-3.5 font-medium">Name</th>
              <th className="px-5 py-3.5 font-medium">Email</th>
              <th className="px-5 py-3.5 font-medium">Phone</th>
              <th className="px-5 py-3.5 font-medium">Message</th>
              <th className="px-5 py-3.5 font-medium">Status</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((i) => (
              <tr key={i.id} className="border-b border-white/5 last:border-0">
                <td className="px-5 py-3.5 text-bone/90">{i.name}</td>
                <td className="px-5 py-3.5 text-bone/90">{i.email}</td>
                <td className="px-5 py-3.5 text-bone/90">{i.phone || "—"}</td>
                <td className="px-5 py-3.5 text-bone/90 max-w-xs truncate">{i.message}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={i.status} />
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <button onClick={() => setViewing(i)} className="text-xs text-steel hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-haze">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {viewing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div onClick={(e) => e.stopPropagation()} className="card p-8 w-full max-w-md">
            <h2 className="font-display text-xl text-bone mb-5">Message from {viewing.name}</h2>
            <div className="space-y-2.5 text-sm">
              <Row label="Email" value={viewing.email} />
              <Row label="Phone" value={viewing.phone || "—"} />
              <Row label="Received" value={new Date(viewing.createdAt).toLocaleString()} />
            </div>
            <p className="text-bone/90 text-sm leading-relaxed mt-5 bg-ink/50 border border-white/5 rounded-sm p-4">
              {viewing.message}
            </p>
            <div className="flex gap-3 mt-7">
              <button
                disabled={isPending}
                onClick={() => handleToggleRead(viewing.id)}
                className="btn-outline flex-1 justify-center text-sm py-2.5"
              >
                Mark as {viewing.status === "New" ? "Read" : "New"}
              </button>
              <button
                disabled={isPending}
                onClick={() => handleDelete(viewing.id)}
                className="btn-outline flex-1 justify-center text-sm py-2.5 text-ember border-ember/40"
              >
                Delete
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
