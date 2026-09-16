"use client";

import { useMemo, useState } from "react";
import { EquipmentCard } from "@/components/Cards";

export default function EquipmentBrowser({ equipment, categories }) {
  const [activeCat, setActiveCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return equipment.filter((item) => {
      const matchesCat = activeCat === "all" || item.category === activeCat;
      const matchesQuery =
        query.trim() === "" ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery && item.active;
    });
  }, [equipment, activeCat, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCat("all")}
            className={`text-sm px-4 py-2 rounded-sm border transition-colors ${
              activeCat === "all"
                ? "bg-ember text-ink border-ember font-semibold"
                : "border-white/10 text-haze hover:border-white/30"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={`text-sm px-4 py-2 rounded-sm border transition-colors ${
                activeCat === c.id
                  ? "bg-ember text-ink border-ember font-semibold"
                  : "border-white/10 text-haze hover:border-white/30"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search equipment..."
          className="w-full md:w-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-haze text-center py-16">No equipment matches your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
