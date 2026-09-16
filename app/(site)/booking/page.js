import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";

export const metadata = { title: "Book a Session | FitZone" };

export default function BookingPage({ searchParams }) {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Book Now"
          title="Lock in your session."
          description="Pick a service or package, choose a trainer, select a time — done in under two minutes."
          align="center"
        />
        <BookingForm
          services={db.services.filter((s) => s.active)}
          packages={db.packages.filter((p) => p.active)}
          trainers={db.trainers.filter((t) => t.active)}
          timeSlots={db.timeSlots}
          bookings={db.bookings}
          initial={{
            serviceId: searchParams?.service || "",
            packageId: searchParams?.package || "",
            trainerId: searchParams?.trainer || "",
          }}
        />
      </div>
    </section>
  );
}
