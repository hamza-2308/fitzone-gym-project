# FitZone — Gym Website & Booking Management System

A complete gym website and booking management system built with **Next.js 14 (App Router)**, **Tailwind CSS**, and a lightweight JSON file database — including a full public site and a secure admin panel.

Built for Task #03 — Web Development Internship, New Tech Softs.

---

## ✨ Features

**Public Website**
- Home, About, Equipment (with category filter + search), Equipment Details, Services, Membership Packages, Trainers, Fitness Programs, Gallery (with category filter), Transformations, Testimonials, Contact
- Full **booking system**: select a service or package → choose a trainer → pick an available date/time → enter your details → review → confirm, with a generated Booking Reference (`BK-XXXXXX`)
- Real-time slot availability — a trainer can't be double-booked for the same date & time
- Fully responsive (mobile, tablet, desktop)

**Admin Panel** (`/admin`)
- Secure login (cookie session, protected by middleware)
- Dashboard with live stats (bookings, upcoming sessions, totals)
- Bookings management — search, filter by status, view full details, update status (Pending → Confirmed → Completed → Cancelled), delete
- Full CRUD for Equipment, Equipment Categories, Services, Membership Packages, Trainers, Fitness Programs, and Gallery
- Inquiries inbox for messages submitted through the Contact page
- Settings — change the admin password

---

## 🚀 Getting Started

**Requirements:** Node.js 18.18+ (Node 20 LTS recommended)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Username: `admin`
- Password: `admin123`

(Change this any time from **Admin → Settings**, or by editing `data/db.json` → `admin`.)

To build for production:

```bash
npm run build
npm start
```

> The first `npm run build` needs an internet connection once, to let `next/font` fetch the Anton and Inter typefaces from Google Fonts (they're then self-hosted automatically — no runtime calls to Google after that).

---

## 🗂 Project Structure

```
app/
  page.js                     Home
  about/                      About
  equipment/                  Equipment listing + [id] detail page
  services/  packages/  trainers/  programs/
  gallery/  transformations/  testimonials/
  booking/                    Multi-step booking flow
  contact/                    Contact form
  admin/
    login/                    Admin login (public)
    (dashboard)/              Protected route group — sidebar layout
      dashboard/  bookings/  equipment/  categories/
      services/  packages/  trainers/  programs/  gallery/
      inquiries/  settings/
components/                   Shared UI (Navbar, Footer, Cards, forms)
components/admin/             Admin-only UI (sidebar, CRUD table, bookings/inquiries managers)
lib/
  db.js                       Reads/writes data/db.json
  auth.js                     Admin session helpers
  actions.js                  All Server Actions (auth, bookings, CRUD, inquiries)
data/
  db.json                     The "database" — single JSON file
middleware.js                 Protects every /admin/* route except /admin/login
```

---

## 🗄 How data storage works

This project uses a single JSON file (`data/db.json`) as its database via `lib/db.js` (`readDB()` / `writeDB()`), read and written from **Next.js Server Actions** (`lib/actions.js`) — no separate REST API layer needed.

This keeps the project dependency-free and easy to run anywhere, but it's a **file-based store meant for development/demo use**:
- It works great with `npm run dev` / `npm start` on a normal server or your own machine.
- It will **not** persist writes on serverless/edge platforms with a read-only or ephemeral filesystem (e.g. Vercel's default deployment). If you deploy there, swap `lib/db.js` for a real database (Postgres, MongoDB, SQLite on a persistent volume, etc.) — the rest of the app (all the Server Actions) would only need their internals updated, not their call sites.

---

## 🔐 Admin access

- `middleware.js` redirects any unauthenticated request to `/admin/*` (except `/admin/login`) back to the login page.
- The `(dashboard)` route group layout also re-checks the session server-side before rendering.
- Sessions are a simple httpOnly cookie (`fitzone_admin_session`), valid for 8 hours.
- This is a **single hardcoded admin account**, suitable for an internship/demo project — not multi-user, role-based, or hashed-password auth. For production use, add password hashing (bcrypt) and a real user table.

---

## 📋 Notes for evaluation / submission

- All 7-day task requirements are implemented: public site sections, equipment categorization, services, packages, trainers, booking flow with availability, and a full admin panel with dashboard, booking management, and content management for equipment/categories/services/packages/trainers/programs/gallery/inquiries.
- Equipment, service, package, and trainer images use royalty-free Unsplash URLs as placeholders — swap the `image` field in `data/db.json` (or via the Admin panel) for your own photos.
- Booking IDs are generated sequentially as `BK-100001`, `BK-100002`, etc.
