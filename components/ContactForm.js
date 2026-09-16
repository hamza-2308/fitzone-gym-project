"use client";

import { useState, useTransition } from "react";
import { createInquiry } from "@/lib/actions";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    startTransition(async () => {
      await createInquiry(form);
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    });
  }

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-ember/15 text-ember flex items-center justify-center mx-auto text-xl">
          ✓
        </div>
        <h3 className="font-display text-xl text-bone mt-4">Message sent.</h3>
        <p className="text-haze text-sm mt-2">We&apos;ll get back to you shortly.</p>
        <button onClick={() => setSent(false)} className="text-ember text-sm font-semibold mt-5">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-haze block mb-1.5">Full Name *</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full" />
        </div>
        <div>
          <label className="text-xs text-haze block mb-1.5">Phone</label>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full" />
        </div>
      </div>
      <div>
        <label className="text-xs text-haze block mb-1.5">Email *</label>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full" />
      </div>
      <div>
        <label className="text-xs text-haze block mb-1.5">Message *</label>
        <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full" />
      </div>
      <button type="submit" disabled={isPending} className="btn-primary w-full justify-center disabled:opacity-60">
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
