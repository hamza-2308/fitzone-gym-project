"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { createBooking } from "@/lib/actions";

const STEPS = ["Choose", "Trainer", "Schedule", "Details", "Review"];

export default function BookingForm({ services, packages, trainers, timeSlots, bookings, initial }) {
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [selectionType, setSelectionType] = useState(
    initial.packageId ? "package" : "service"
  );
  const [serviceId, setServiceId] = useState(initial.serviceId || "");
  const [packageId, setPackageId] = useState(initial.packageId || "");
  const [trainerId, setTrainerId] = useState(initial.trainerId || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    whatsapp: "",
    fitnessGoal: "",
    notes: "",
  });

  const selectedService = services.find((s) => s.id === serviceId);
  const selectedPackage = packages.find((p) => p.id === packageId);
  const selectedTrainer = trainers.find((t) => t.id === trainerId);

  const bookedTimesForDate = useMemo(() => {
    if (!date || !trainerId) return [];
    return bookings
      .filter((b) => b.date === date && b.trainerId === trainerId && b.status !== "Cancelled")
      .map((b) => b.time);
  }, [bookings, date, trainerId]);

  function canProceed() {
    if (step === 0) return selectionType === "service" ? !!serviceId : !!packageId;
    if (step === 1) return true; // trainer optional
    if (step === 2) return !!date && !!time;
    if (step === 3) return form.fullName && form.phone && form.email;
    return true;
  }

  function handleConfirm() {
    setError("");
    startTransition(async () => {
      try {
        const res = await createBooking({
          ...form,
          serviceId: selectionType === "service" ? serviceId : null,
          packageId: selectionType === "package" ? packageId : null,
          trainerId: trainerId || null,
          date,
          time,
        });
        if (res?.error) {
          setError(res.error);
        } else if (res?.booking) {
          setResult(res.booking);
        } else {
          setError("Something went wrong. Please try again.");
        }
      } catch (err) {
        setError("Unable to submit your booking right now. Please try again.");
      }
    });
  }

  if (result) {
    return (
      <div className="card p-10 max-w-xl mx-auto text-center">
        <div className="w-14 h-14 rounded-full bg-ember/15 text-ember flex items-center justify-center mx-auto text-2xl">
          ✓
        </div>
        <h2 className="font-display text-3xl text-bone mt-6">Booking Submitted Successfully!</h2>
        <p className="text-haze mt-3">
          We&apos;ve received your request. Our team will confirm it shortly.
        </p>

        <div className="mt-8 text-left bg-ink/50 border border-white/5 rounded-sm p-6 space-y-2.5">
          <Row label="Booking ID" value={result.id} />
          <Row label="Customer Name" value={result.fullName} />
          <Row label="Service" value={selectedService?.name || selectedPackage?.name || "—"} />
          <Row label="Date" value={result.date} />
          <Row label="Time" value={result.time} />
          <Row label="Status" value={result.status} highlight />
        </div>

        <Link href="/" className="btn-primary mt-9 inline-flex">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-between mb-12">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1 flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                i <= step ? "bg-ember text-ink" : "bg-graphite text-haze border border-white/10"
              }`}
            >
              {i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 ${i < step ? "bg-ember" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>

      <div className="card p-8 md:p-10">
        {step === 0 && (
          <div>
            <h2 className="font-display text-2xl text-bone mb-6">What are you booking?</h2>
            <div className="flex gap-3 mb-7">
              <button
                onClick={() => setSelectionType("service")}
                className={`flex-1 py-3 rounded-sm border text-sm font-semibold ${
                  selectionType === "service" ? "border-ember text-ember" : "border-white/10 text-haze"
                }`}
              >
                A Service / Session
              </button>
              <button
                onClick={() => setSelectionType("package")}
                className={`flex-1 py-3 rounded-sm border text-sm font-semibold ${
                  selectionType === "package" ? "border-ember text-ember" : "border-white/10 text-haze"
                }`}
              >
                A Membership Package
              </button>
            </div>

            {selectionType === "service" ? (
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <OptionCard
                    key={s.id}
                    selected={serviceId === s.id}
                    onClick={() => setServiceId(s.id)}
                    title={s.name}
                    subtitle={`Rs ${s.price.toLocaleString()} / ${s.duration}`}
                  />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {packages.map((p) => (
                  <OptionCard
                    key={p.id}
                    selected={packageId === p.id}
                    onClick={() => setPackageId(p.id)}
                    title={p.name}
                    subtitle={`Rs ${p.price.toLocaleString()} / ${p.duration}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="font-display text-2xl text-bone mb-2">Choose a trainer</h2>
            <p className="text-haze text-sm mb-6">Optional — skip if you don&apos;t have a preference.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <OptionCard
                selected={trainerId === ""}
                onClick={() => setTrainerId("")}
                title="No Preference"
                subtitle="We'll assign an available coach"
              />
              {trainers.map((t) => (
                <OptionCard
                  key={t.id}
                  selected={trainerId === t.id}
                  onClick={() => setTrainerId(t.id)}
                  title={t.name}
                  subtitle={t.specialization}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="font-display text-2xl text-bone mb-6">Pick a date & time</h2>
            <label className="text-xs text-haze block mb-1.5">Preferred Date</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              className="w-full mb-6"
            />

            <label className="text-xs text-haze block mb-2">Available Time Slots</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
              {timeSlots.map((t) => {
                const isBooked = bookedTimesForDate.includes(t);
                return (
                  <button
                    key={t}
                    disabled={isBooked || !date}
                    onClick={() => setTime(t)}
                    className={`text-xs py-2.5 rounded-sm border transition-colors ${
                      isBooked
                        ? "border-white/5 text-haze/40 line-through cursor-not-allowed"
                        : time === t
                        ? "bg-ember text-ink border-ember font-semibold"
                        : "border-white/10 text-bone/80 hover:border-white/30"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            {!date && <p className="text-haze text-xs mt-3">Select a date to see available slots.</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-display text-2xl text-bone mb-6">Your details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full" />
              </Field>
              <Field label="Phone Number" required>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full" />
              </Field>
              <Field label="Email" required>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full" />
              </Field>
              <Field label="WhatsApp Number">
                <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full" />
              </Field>
              <Field label="Fitness Goal" full>
                <input value={form.fitnessGoal} onChange={(e) => setForm({ ...form, fitnessGoal: e.target.value })} className="w-full" placeholder="e.g. Lose weight, build strength" />
              </Field>
              <Field label="Additional Notes" full>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full" />
              </Field>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="font-display text-2xl text-bone mb-6">Review your booking</h2>
            <div className="space-y-2.5">
              <Row label="Selected" value={selectedService?.name || selectedPackage?.name} />
              <Row label="Trainer" value={selectedTrainer?.name || "No preference"} />
              <Row label="Date" value={date} />
              <Row label="Time" value={time} />
              <Row label="Name" value={form.fullName} />
              <Row label="Phone" value={form.phone} />
              <Row label="Email" value={form.email} />
              {form.fitnessGoal && <Row label="Goal" value={form.fitnessGoal} />}
            </div>
            {error && <p className="text-ember text-sm mt-5">{error}</p>}
          </div>
        )}

        <div className="flex gap-3 mt-9">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="btn-outline flex-1 justify-center">
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => canProceed() && setStep(step + 1)}
              disabled={!canProceed()}
              className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="btn-primary flex-1 justify-center disabled:opacity-60"
            >
              {isPending ? "Confirming..." : "Confirm Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OptionCard({ selected, onClick, title, subtitle }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-4 rounded-sm border transition-colors ${
        selected ? "border-ember bg-ember/5" : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="text-bone font-semibold text-sm">{title}</div>
      <div className="text-haze text-xs mt-1">{subtitle}</div>
    </button>
  );
}

function Field({ label, children, required, full }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="text-xs text-haze block mb-1.5">
        {label} {required && <span className="text-ember">*</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2.5">
      <span className="text-haze">{label}</span>
      <span className={highlight ? "text-ember font-semibold" : "text-bone"}>{value}</span>
    </div>
  );
}
