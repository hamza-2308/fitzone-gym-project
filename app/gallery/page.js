import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Gallery | FitZone" };

export default function GalleryPage() {
  const db = readDB();

  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Take A Look Inside"
          title="The gym floor, the equipment, the energy."
          description="A look at the training areas, equipment and facilities you'll be working with every session."
        />
        <GalleryGrid images={db.gallery} />
      </div>
    </section>
  );
}
