import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import { ServiceCard } from "@/components/Cards";

export const metadata = { title: "Services | FitZone" };

export default function ServicesPage() {
  const db = readDB();
  const services = db.services.filter((s) => s.active);

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="What We Offer"
          title="Coaching built around your goal."
          description="Every service is led by a certified trainer and booked directly to a date and time that works for you."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} item={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
