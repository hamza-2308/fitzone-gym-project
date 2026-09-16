import Image from "next/image";
import Link from "next/link";
import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Transformations | FitZone" };

export default function TransformationsPage() {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Member Stories"
          title="Progress you can actually see."
          description="Real members, real timelines. Every transformation here came out of a coached program, not a crash diet."
        />

        <div className="space-y-10 max-w-4xl mx-auto">
          {db.transformations.map((t) => (
            <div key={t.id} className="card p-6 md:p-8">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-64 md:h-80 rounded-sm overflow-hidden">
                  <Image src={t.before} alt={`${t.name} before`} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-ink/80 text-bone text-xs font-semibold px-3 py-1 rounded-sm">
                    Before
                  </span>
                </div>
                <div className="relative h-64 md:h-80 rounded-sm overflow-hidden">
                  <Image src={t.after} alt={`${t.name} after`} fill className="object-cover" />
                  <span className="absolute top-3 left-3 bg-ember text-ink text-xs font-semibold px-3 py-1 rounded-sm">
                    After
                  </span>
                </div>
              </div>
              <h3 className="font-display text-2xl text-bone mt-6">{t.name}</h3>
              <p className="text-haze mt-2 leading-relaxed">{t.story}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-haze mb-5">Ready to start your own story?</p>
          <Link href="/booking" className="btn-primary">
            Book Your First Session
          </Link>
        </div>
      </div>
    </section>
  );
}
