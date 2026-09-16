import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact | FitZone" };

export default function ContactPage() {
  return (
    <section className="section-y">
      <div className="container-px">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Questions before you book?"
          description="Reach out directly or send a message — our team replies within one business day."
        />

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="card p-7">
              <h3 className="text-bone font-semibold mb-1">Location</h3>
              <p className="text-haze text-sm">Blue Area, Islamabad, Pakistan</p>
            </div>
            <div className="card p-7">
              <h3 className="text-bone font-semibold mb-1">Phone</h3>
              <p className="text-haze text-sm">+92 300 1234567</p>
            </div>
            <div className="card p-7">
              <h3 className="text-bone font-semibold mb-1">Email</h3>
              <p className="text-haze text-sm">hello@fitzone.pk</p>
            </div>
            <div className="rounded-sm overflow-hidden border border-white/5 h-56">
              <iframe
                title="FitZone location map"
                className="w-full h-full grayscale invert-[0.9]"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.045%2C33.700%2C73.095%2C33.730&layer=mapnik&marker=33.715%2C73.070"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
