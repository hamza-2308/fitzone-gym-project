import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import EquipmentBrowser from "@/components/EquipmentBrowser";

export const metadata = { title: "Equipment | FitZone" };

export default function EquipmentPage() {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Inside The Gym"
          title="Every category, fully equipped."
          description="Cardio, free weights, machines, functional rigs, CrossFit and recovery tools — browse by category or search directly."
        />
        <EquipmentBrowser equipment={db.equipment} categories={db.equipmentCategories} />
      </div>
    </section>
  );
}
