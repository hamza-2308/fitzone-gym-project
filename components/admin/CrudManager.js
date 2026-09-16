"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createItem, updateItem, deleteItem, toggleActive } from "@/lib/actions";

function renderCell(item, column) {
  const value = item[column.key];
  if (column.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return value ? <img src={value} alt="" className="w-16 h-11 object-cover rounded-sm" /> : "—";
  }
  if (column.type === "price") {
    return typeof value === "number" ? `Rs ${value.toLocaleString()}` : "—";
  }
  if (column.type === "active") {
    return value ? "Active" : "Inactive";
  }
  if (column.map) {
    return column.map[value] || value || "—";
  }
  if (column.type === "truncate") {
    return typeof value === "string" && value.length > 60 ? `${value.slice(0, 60)}...` : value || "—";
  }
  return value === undefined || value === null || value === "" ? "—" : String(value);
}

export default function CrudManager({ collection, prefix, title, singular, fields, items, columns }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  function blankItem() {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = f.type === "tags" ? "" : f.type === "checkbox" ? true : "";
    });
    return blank;
  }

  function openNew() {
    setEditing(blankItem());
    setError("");
  }

  function openEdit(item) {
    const copy = { ...item };
    fields.forEach((f) => {
      if (f.type === "tags" && Array.isArray(copy[f.key])) {
        copy[f.key] = copy[f.key].join(", ");
      }
    });
    setEditing(copy);
    setError("");
  }

  function close() {
    setEditing(null);
    setError("");
  }

  function handleChange(key, value) {
    setEditing((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave(e) {
    e.preventDefault();
    const payload = { ...editing };
    fields.forEach((f) => {
      if (f.type === "number") payload[f.key] = Number(payload[f.key]) || 0;
      if (f.type === "tags") {
        payload[f.key] = String(payload[f.key] || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    });

    startTransition(async () => {
      try {
        if (payload.id) {
          const { id, ...data } = payload;
          await updateItem(collection, id, data);
        } else {
          await createItem(collection, prefix, payload);
        }
        setEditing(null);
        router.refresh();
      } catch (err) {
        setError(err.message || "Something went wrong.");
      }
    });
  }

  function handleDelete(id) {
    if (!confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`)) return;
    startTransition(async () => {
      await deleteItem(collection, id);
      router.refresh();
    });
  }

  function handleToggle(id) {
    startTransition(async () => {
      await toggleActive(collection, id);
      router.refresh();
    });
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-bone">{title}</h1>
          <p className="text-haze text-sm mt-1">{items.length} total</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm py-2.5 px-5 w-full sm:w-auto justify-center">
          + Add {singular}
        </button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-haze border-b border-white/5">
              {columns.map((c) => (
                <th key={c.key} className="px-5 py-3.5 font-medium whitespace-nowrap">
                  {c.label}
                </th>
              ))}
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5 last:border-0">
                {columns.map((c) => (
                  <td key={c.key} className="px-5 py-3.5 text-bone/90">
                    {renderCell(item, c)}
                  </td>
                ))}
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  {"active" in item && (
                    <button onClick={() => handleToggle(item.id)} className="text-xs text-haze hover:text-ember mr-4">
                      {item.active ? "Deactivate" : "Activate"}
                    </button>
                  )}
                  <button onClick={() => openEdit(item)} className="text-xs text-steel hover:underline mr-4">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-xs text-ember hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-10 text-center text-haze">
                  No records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-2 sm:p-4" onClick={close}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
            className="card p-5 sm:p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto"
          >
            <h2 className="font-display text-xl text-bone mb-5">
              {editing.id ? "Edit" : "Add"} {singular}
            </h2>
            {error && <p className="text-ember text-sm mb-4">{error}</p>}
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs text-haze block mb-1.5">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className="w-full"
                      value={editing[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      required={f.required}
                    />
                  ) : f.type === "select" ? (
                    <select
                      className="w-full"
                      value={editing[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      required={f.required}
                    >
                      <option value="">Select...</option>
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "tags" ? (
                    <input
                      className="w-full"
                      placeholder="Comma separated"
                      value={editing[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                    />
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!editing[f.key]}
                      onChange={(e) => handleChange(f.key, e.target.checked)}
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      className="w-full"
                      value={editing[f.key] ?? ""}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      required={f.required}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-7">
              <button type="submit" disabled={isPending} className="btn-primary flex-1 justify-center text-sm py-2.5">
                {isPending ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={close} className="btn-outline flex-1 justify-center text-sm py-2.5">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
