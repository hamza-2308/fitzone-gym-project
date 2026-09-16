import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

export const metadata = { title: "About | FitZone" };

const whyChooseUs = [
  { title: "Certified Coaches", text: "Every trainer holds an active certification and a real specialization." },
  { title: "Real Booking System", text: "See live availability and lock in your slot in under two minutes." },
  { title: "Serious Equipment", text: "Cardio, free weights, machines and recovery tools, all in one floor." },
  { title: "Transparent Pricing", text: "No hidden fees — packages list exactly what you get." },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-y border-b border-white/5">
        <div className="container-px grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="label-tag mb-3">Our Story</p>
            <h1 className="font-display text-5xl md:text-6xl text-bone leading-[1.02]">
              We started FitZone because gyms kept overpromising.
            </h1>
            <p className="text-haze mt-6 leading-relaxed">
              FitZone opened in Islamabad with a simple frustration behind
              it: too many gyms sell memberships and leave people to figure
              out the rest alone. We built a floor plan, a coaching model
              and a booking system around actually getting members results
              — not just card swipes at the door.
            </p>
            <p className="text-haze mt-4 leading-relaxed">
              Today FitZone runs on three things: equipment that doesn't
              bottleneck your session, coaches who track your numbers, and
              a booking flow that respects your time.
            </p>
          </div>
          <div className="relative h-[28rem] rounded-sm overflow-hidden">
            <Image
              src="/images/leg-press.jpg"
              alt="FitZone training floor"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-y border-b border-white/5 bg-graphite/40">
        <div className="container-px grid md:grid-cols-2 gap-8">
          <div className="card p-10">
            <h3 className="font-display text-2xl text-bone mb-3">Mission</h3>
            <p className="text-haze leading-relaxed">
              Give every member the equipment, coaching and structure to
              hit a goal they'd otherwise give up on.
            </p>
          </div>
          <div className="card p-10">
            <h3 className="font-display text-2xl text-bone mb-3">Vision</h3>
            <p className="text-haze leading-relaxed">
              To be the training ground people point to when they talk
              about the transformation that actually stuck.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y border-b border-white/5">
        <div className="container-px">
          <SectionHeading eyebrow="Why Choose Us" title="What makes training here different." />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {whyChooseUs.map((w) => (
              <div key={w.title} className="card p-7">
                <h4 className="font-display text-lg text-bone">{w.title}</h4>
                <p className="text-haze text-sm mt-2.5 leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["6+", "Years running"],
            ["1,200+", "Active members"],
            ["10", "Certified trainers"],
            ["98%", "Member retention"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-4xl text-bone">{v}</div>
              <div className="text-haze text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
