const COLORS = {
  Pending: "bg-amber-500/15 text-amber-400",
  Confirmed: "bg-emerald-500/15 text-emerald-400",
  Completed: "bg-steel/20 text-steel",
  Cancelled: "bg-ember/15 text-ember",
  New: "bg-steel/20 text-steel",
  Read: "bg-white/10 text-haze",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm ${COLORS[status] || "bg-white/10 text-haze"}`}>
      {status}
    </span>
  );
}
