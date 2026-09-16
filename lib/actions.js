"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { readDB, writeDB, genId, nextBookingId } from "@/lib/db";
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE, isAdminAuthenticated } from "@/lib/auth";

function requireAdmin() {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized. Please log in again.");
  }
}

/* ---------------- Admin auth ---------------- */

export async function loginAdmin(prevState, formData) {
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const db = readDB();

  if (username === db.admin.username && password === db.admin.password) {
    cookies().set(ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    redirect("/admin/dashboard");
  }

  return { error: "Invalid username or password." };
}

export async function logoutAdmin() {
  cookies().set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  redirect("/admin/login");
}

export async function changeAdminPassword(prevState, formData) {
  requireAdmin();
  const current = String(formData.get("current") || "");
  const next = String(formData.get("next") || "");
  const db = readDB();

  if (current !== db.admin.password) {
    return { error: "Current password is incorrect." };
  }
  if (next.length < 4) {
    return { error: "New password must be at least 4 characters." };
  }
  db.admin.password = next;
  writeDB(db);
  return { success: "Password updated successfully." };
}

/* ---------------- Generic collection CRUD (equipment, services, packages, trainers, gallery, categories, programs) ---------------- */

export async function createItem(collection, prefix, data) {
  requireAdmin();
  const db = readDB();
  const item = { id: genId(prefix), active: true, ...data };
  db[collection].push(item);
  writeDB(db);
  revalidatePath(`/admin/${collection}`, "page");
  revalidatePath("/", "layout");
  return item;
}

export async function updateItem(collection, id, data) {
  requireAdmin();
  const db = readDB();
  const idx = db[collection].findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Item not found.");
  db[collection][idx] = { ...db[collection][idx], ...data };
  writeDB(db);
  revalidatePath(`/admin/${collection}`, "page");
  revalidatePath("/", "layout");
  return db[collection][idx];
}

export async function deleteItem(collection, id) {
  requireAdmin();
  const db = readDB();
  db[collection] = db[collection].filter((i) => i.id !== id);
  writeDB(db);
  revalidatePath(`/admin/${collection}`, "page");
  revalidatePath("/", "layout");
  return { success: true };
}

export async function toggleActive(collection, id) {
  requireAdmin();
  const db = readDB();
  const idx = db[collection].findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Item not found.");
  db[collection][idx].active = !db[collection][idx].active;
  writeDB(db);
  revalidatePath(`/admin/${collection}`, "page");
  revalidatePath("/", "layout");
  return db[collection][idx];
}

/* ---------------- Bookings ---------------- */

export async function createBooking(data) {
  const db = readDB();

  const conflict = db.bookings.find(
    (b) =>
      b.date === data.date &&
      b.time === data.time &&
      b.status !== "Cancelled" &&
      data.trainerId &&
      b.trainerId === data.trainerId
  );

  if (conflict) {
    return { error: "That trainer is already booked for this date and time. Please pick another slot." };
  }

  const booking = {
    id: nextBookingId(db),
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    whatsapp: data.whatsapp,
    serviceId: data.serviceId || null,
    packageId: data.packageId || null,
    trainerId: data.trainerId || null,
    date: data.date,
    time: data.time,
    fitnessGoal: data.fitnessGoal || "",
    notes: data.notes || "",
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  db.bookings.push(booking);
  writeDB(db);
  revalidatePath("/admin/bookings", "page");
  revalidatePath("/admin/dashboard", "page");
  return { booking };
}

export async function updateBookingStatus(id, status) {
  requireAdmin();
  const db = readDB();
  const idx = db.bookings.findIndex((b) => b.id === id);
  if (idx === -1) throw new Error("Booking not found.");
  db.bookings[idx].status = status;
  writeDB(db);
  revalidatePath("/admin/bookings", "page");
  revalidatePath("/admin/dashboard", "page");
  return db.bookings[idx];
}

export async function deleteBooking(id) {
  requireAdmin();
  const db = readDB();
  db.bookings = db.bookings.filter((b) => b.id !== id);
  writeDB(db);
  revalidatePath("/admin/bookings", "page");
  revalidatePath("/admin/dashboard", "page");
  return { success: true };
}

/* ---------------- Contact / Inquiries ---------------- */

export async function createInquiry(data) {
  const db = readDB();
  const inquiry = {
    id: genId("inq"),
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    message: data.message,
    status: "New",
    createdAt: new Date().toISOString(),
  };
  db.inquiries.push(inquiry);
  writeDB(db);
  revalidatePath("/admin/inquiries", "page");
  return { success: true };
}

export async function markInquiryRead(id) {
  requireAdmin();
  const db = readDB();
  const idx = db.inquiries.findIndex((i) => i.id === id);
  if (idx === -1) throw new Error("Inquiry not found.");
  db.inquiries[idx].status = db.inquiries[idx].status === "New" ? "Read" : "New";
  writeDB(db);
  revalidatePath("/admin/inquiries", "page");
  return db.inquiries[idx];
}

export async function deleteInquiry(id) {
  requireAdmin();
  const db = readDB();
  db.inquiries = db.inquiries.filter((i) => i.id !== id);
  writeDB(db);
  revalidatePath("/admin/inquiries", "page");
  return { success: true };
}
