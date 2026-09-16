import Link from "next/link";
import Image from "next/image";
import { readDB } from "@/lib/db";
import SectionHeading from "@/components/SectionHeading";
import { EquipmentCard, ServiceCard, PackageCard, TrainerCard } from "@/components/Cards";

export default function HomePage() {
  const db = readDB();
  const featuredServices = db.services.filter((s) => s.active).slice(0, 3);
  const featuredEquipment = db.equipment.filter((e) => e.active).slice(0, 3);
  const trainers = db.trainers.filter((t) => t.active).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cable-crossover.jpg"
            alt="FitZone gym floor"
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        </div>

        <div className="container-px relative py-28 md:py-40 max-w-3xl">
          <p className="label-tag mb-5">Islamabad's Training Ground</p>
          <h1 className="font-display text-6xl md:text-8xl leading-[0.92] text-bone">
            SHOW UP.
            <br />
            OUTWORK
            <br />
            <span className="text-ember">YESTERDAY.</span>
          </h1>
          <p className="text-haze text-lg mt-7 max-w-lg leading-relaxed">
            FitZone brings serious equipment, certified coaches and a real
            booking system together — so the only thing left to do is train.
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link href="/booking" className="btn-primary">
              Book Your Session
            </Link>
            <Link href="/packages" className="btn-outline">
              View Membership Plans
            </Link>
          </div>
        </div>
      </section>

      {/* GYM INTRO */}
      <section className="section-y border-b border-white/5">
        <div className="container-px grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="label-tag mb-3">About FitZone</p>
            <h2 className="font-display text-4xl md:text-5xl text-bone leading-[1.05]">
              Built for people who take training seriously.
            </h2>
            <p className="text-haze mt-5 leading-relaxed">
              From free weights to full recovery equipment, FitZone is
              designed around one idea: give people the tools, coaching and
              structure to actually hit their goals — not just a place to
              check in.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              <Stat value="6+" label="Years running" />
              <Stat value="1,200+" label="Active members" />
              <Stat value="40+" label="Weekly classes" />
            </div>
          </div>
          <div className="relative h-96 rounded-sm overflow-hidden">
            <Image
              src="/images/treadmill.jpg"
              alt="Training floor"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="section-y border-b border-white/5">
        <div className="container-px">
          <SectionHeading
            eyebrow="What We Offer"
            title="Coaching built around your goal."
            description="From fat loss to raw strength, every service comes with a coach who tracks your progress week to week."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((s) => (
              <ServiceCard key={s.id} item={s} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/services" className="text-ember font-semibold text-sm">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED EQUIPMENT */}
      <section className="section-y border-b border-white/5 bg-graphite/40">
        <div className="container-px">
          <SectionHeading
            eyebrow="Inside The Gym"
            title="Equipment that doesn't hold you back."
            description="Cardio machines, free weights, strength rigs and recovery tools — organized by category so you find what you need fast."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredEquipment.map((e) => (
              <EquipmentCard key={e.id} item={e} />
            ))}
          </div>
          <div className="mt-10">
            <Link href="/equipment" className="text-ember font-semibold text-sm">
              Browse all equipment →
            </Link>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP PACKAGES */}
      <section className="section-y border-b border-white/5">
        <div className="container-px">
          <SectionHeading
            eyebrow="Membership"
            title="Pick a plan, not a compromise."
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {db.packages
              .filter((p) => p.active)
              .map((p) => (
                <PackageCard key={p.id} item={p} featured={p.id === "pkg-premium"} />
              ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="section-y border-b border-white/5 bg-graphite/40">
        <div className="container-px">
          <SectionHeading
            eyebrow="Meet The Team"
            title="Coaches who actually coach."
            description="Every trainer at FitZone is certified, specialized and available to book directly."
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {trainers.map((t) => (
              <TrainerCard key={t.id} item={t} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y border-b border-white/5">
        <div className="container-px">
          <SectionHeading eyebrow="Member Stories" title="Real progress, real people." align="center" />
          <div className="grid md:grid-cols-3 gap-6">
            {db.testimonials.map((t) => (
              <div key={t.id} className="card p-8">
                <div className="text-ember mb-3">{"★".repeat(t.rating)}</div>
                <p className="text-bone/90 leading-relaxed">"{t.feedback}"</p>
                <p className="text-haze text-sm mt-5">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-px text-center max-w-2xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl text-bone leading-[1.05]">
            Your first session is one booking away.
          </h2>
          <p className="text-haze mt-5">
            Pick a service, choose a trainer, select a time — done in under two minutes.
          </p>
          <Link href="/booking" className="btn-primary mt-8 inline-flex">
            Book a Session
          </Link>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-3xl text-bone">{value}</div>
      <div className="text-haze text-xs mt-1">{label}</div>
    </div>
  );
}
