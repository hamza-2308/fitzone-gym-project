import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";
import { EquipmentCard } from "@/components/Cards";

export function generateMetadata({ params }) {
  const db = readDB();
  const item = db.equipment.find((e) => e.id === params.id);
  return { title: item ? `${item.name} | FitZone` : "Equipment | FitZone" };
}

export default function EquipmentDetailPage({ params }) {
  const db = readDB();
  const item = db.equipment.find((e) => e.id === params.id);
  if (!item) notFound();

  const category = db.equipmentCategories.find((c) => c.id === item.category);
  const related = db.equipment
    .filter((e) => e.category === item.category && e.id !== item.id && e.active)
    .slice(0, 3);

  return (
    <>
      <section className="section-y border-b border-white/5">
        <div className="container-px">
          <Link href="/equipment" className="text-haze text-sm hover:text-ember">
            ← Back to Equipment
          </Link>

          <div className="grid md:grid-cols-2 gap-14 mt-8 items-start">
            <div className="relative h-96 md:h-[30rem] rounded-sm overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" priority />
            </div>

            <div>
              <span className="label-tag">{category?.name}</span>
              <h1 className="font-display text-4xl md:text-5xl text-bone mt-3 leading-[1.05]">
                {item.name}
              </h1>
              <p className="text-haze mt-5 leading-relaxed">{item.description}</p>

              {item.targetType && (
                <p className="mt-5 text-sm">
                  <span className="text-haze">Target: </span>
                  <span className="text-bone">{item.targetType}</span>
                </p>
              )}

              <div className="grid sm:grid-cols-2 gap-8 mt-8">
                {item.features?.length > 0 && (
                  <div>
                    <h3 className="text-bone font-semibold text-sm mb-3">Features</h3>
                    <ul className="space-y-2">
                      {item.features.map((f) => (
                        <li key={f} className="text-haze text-sm flex gap-2">
                          <span className="text-ember">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.benefits?.length > 0 && (
                  <div>
                    <h3 className="text-bone font-semibold text-sm mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {item.benefits.map((b) => (
                        <li key={b} className="text-haze text-sm flex gap-2">
                          <span className="text-ember">✓</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link href="/booking" className="btn-primary mt-9 inline-flex">
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y">
          <div className="container-px">
            <h2 className="font-display text-2xl text-bone mb-8">More {category?.name}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <EquipmentCard key={r.id} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
