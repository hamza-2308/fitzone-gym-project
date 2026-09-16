import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import { TrainerCard } from "@/components/Cards";

export const metadata = { title: "Trainers | FitZone" };

export default function TrainersPage() {
  const db = readDB();
  const trainers = db.trainers.filter((t) => t.active);

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Meet The Team"
          title="Coaches who actually coach."
          description="Every trainer at FitZone is certified, specialized and available to book directly for your sessions."
        />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trainers.map((t) => (
            <TrainerCard key={t.id} item={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
