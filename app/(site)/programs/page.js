import Link from "next/link";
import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Fitness Programs | FitZone" };

export default function ProgramsPage() {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Structured Programs"
          title="Multi-week programs with a clear finish line."
          description="For members who want more structure than a single session — each program is a coached block with a defined start, middle and end."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {db.programs.map((p) => (
            <div key={p.id} className="card p-8">
              <h3 className="font-display text-2xl text-bone">{p.name}</h3>
              <p className="text-haze text-sm mt-3 leading-relaxed">{p.description}</p>
              <Link href="/booking" className="text-ember text-sm font-semibold mt-6 inline-block">
                Enquire & Book →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
