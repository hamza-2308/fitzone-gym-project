"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/equipment", label: "Equipment" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/trainers", label: "Trainers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink/90 backdrop-blur border-b border-white/5">
      <div className="container-px flex items-center justify-between h-20">
        <Link href="/" className="font-display text-2xl tracking-tightest text-bone">
          FIT<span className="text-ember">ZONE</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-bone/80 hover:text-ember transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/booking" className="hidden lg:inline-flex btn-primary">
          Book a Session
        </Link>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-bone"
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/5 bg-ink">
          <div className="container-px py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-bone/85 hover:text-ember transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 w-full"
            >
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
