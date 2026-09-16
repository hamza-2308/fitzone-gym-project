"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
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

  return (
    <aside className="w-64 shrink-0 bg-graphite border-r border-white/5 min-h-screen flex flex-col">
      <div className="h-20 flex items-center px-7 border-b border-white/5">
        <Link href="/admin/dashboard" className="font-display text-xl text-bone">
          FIT<span className="text-ember">ZONE</span>
        </Link>
      </div>
      <div className="px-7 py-3 text-xs text-haze uppercase tracking-wide">Admin Panel</div>
      <nav className="flex-1 px-4 space-y-1">
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
        <Link href="/" className="block px-3.5 py-2 text-sm text-haze hover:text-bone">
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
  );
}
