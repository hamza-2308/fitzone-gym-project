import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "Testimonials | FitZone" };

export default function TestimonialsPage() {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Member Feedback"
          title="What members say after training here."
          align="center"
        />
        <div className="grid md:grid-cols-3 gap-6">
          {db.testimonials.map((t) => (
            <div key={t.id} className="card p-8">
              <div className="text-ember mb-3">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
              <p className="text-bone/90 leading-relaxed">&quot;{t.feedback}&quot;</p>
              <p className="text-haze text-sm mt-5">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
