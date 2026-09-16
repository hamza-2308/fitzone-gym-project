import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import { PackageCard } from "@/components/Cards";

export const metadata = { title: "Membership Packages | FitZone" };

export default function PackagesPage() {
  const db = readDB();
  const packages = db.packages.filter((p) => p.active);

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Membership"
          title="Pick a plan, not a compromise."
          description="Every plan includes full access to the equipment floor. Higher tiers add coaching, assessments and priority booking."
          align="center"
        />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((p) => (
            <PackageCard key={p.id} item={p} featured={p.id === "pkg-premium"} />
          ))}
        </div>
      </div>
    </section>
  );
}
