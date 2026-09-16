"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { logoutAdmin } from "@/lib/actions";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/admin/bookings", label: "Bookings", icon: "☰" },
  { href: "/admin/equipment", label: "Equipment", icon: "◆" },
  { href: "/admin/categories", label: "Categories", icon: "▤" },
  { href: "/admin/services", label: "Services", icon: "✚" },
  { href: "/admin/packages", label: "Packages", icon: "◈" },
  { href: "/admin/trainers", label: "Trainers", icon: "☺" },
  { href: "/admin/programs", label: "Programs", icon: "▶" },
  { href: "/admin/gallery", label: "Gallery", icon: "▧" },
  { href: "/admin/inquiries", label: "Inquiries", icon: "✉" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-graphite border-b border-white/5 flex items-center justify-between px-4">
        <Link href="/admin/dashboard" className="font-display text-lg text-bone">
          FIT<span className="text-ember">ZONE</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xs text-haze hover:text-bone px-2 py-1.5">
            View Site
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-haze hover:text-bone transition-colors"
            aria-label="Toggle navigation"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />}

      <aside
        className={`fixed lg:static z-50 w-64 shrink-0 bg-graphite border-r border-white/5 min-h-screen flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 lg:h-20 flex items-center px-7 border-b border-white/5">
          <Link href="/admin/dashboard" className="font-display text-xl text-bone">
            FIT<span className="text-ember">ZONE</span>
          </Link>
        </div>
        <div className="hidden lg:block px-7 py-3 text-xs text-haze uppercase tracking-wide">Admin Panel</div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm transition-colors ${
                  active ? "bg-ember/10 text-ember font-semibold" : "text-bone/75 hover:bg-white/5"
                }`}
              >
                <span className="w-4 text-center">{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/" className="lg:hidden block px-3.5 py-2 text-sm text-haze hover:text-bone">
            ← View Website
          </Link>
          <button
            onClick={() => startTransition(() => logoutAdmin())}
            disabled={isPending}
            className="w-full text-left px-3.5 py-2 text-sm text-ember hover:bg-ember/10 rounded-sm"
          >
            {isPending ? "Logging out..." : "Log Out"}
          </button>
        </div>
      </aside>
    </>
  );
}