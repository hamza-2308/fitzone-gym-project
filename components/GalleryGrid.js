"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export default function GalleryGrid({ images }) {
  const categories = useMemo(() => {
    const set = new Set(images.map((i) => i.category));
    return ["All", ...Array.from(set)];
  }, [images]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? images : images.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`text-sm px-4 py-2 rounded-sm border transition-colors ${
              active === c
                ? "bg-ember text-ink border-ember font-semibold"
                : "border-white/10 text-haze hover:border-white/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {filtered.map((img) => (
          <div key={img.id} className="relative rounded-sm overflow-hidden break-inside-avoid group">
            <Image
              src={img.image}
              alt={img.category}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4">
              <span className="text-bone text-xs font-semibold">{img.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
