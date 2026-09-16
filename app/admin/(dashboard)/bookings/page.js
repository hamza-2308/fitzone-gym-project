import { readDB } from "@/lib/db";
import BookingsManager from "@/components/admin/BookingsManager";

export default function AdminBookingsPage() {
  const db = readDB();
  return (
    <BookingsManager
      bookings={db.bookings}
      services={db.services}
      packages={db.packages}
      trainers={db.trainers}
    />
  );
}
