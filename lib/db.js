import fs from "fs";
import path from "path";
import os from "os";

// Import the seed database so it is bundled by the build (webpack) and is
// always available at runtime — including on serverless hosts like Vercel,
// where reading files from process.cwd() is unreliable.
import seedData from "@/data/db.json";

// The bundled seed database that ships with the deployment. Kept for local
// development where the project directory is writable and we can persist
// changes back to disk.
const BUNDLED_DB_PATH = path.join(process.cwd(), "data", "db.json");

// A writable fallback location. On serverless hosts (e.g. Vercel) the project
// directory is read-only, but the OS temp directory is writable. This lets the
// app keep working instead of crashing with a server-side exception.
const TMP_DB_PATH = path.join(os.tmpdir(), "fitzone-db.json");

// Tracks whether we have successfully written to the OS temp file. Once we
// have, reads prefer it so the latest changes are visible.
let usingTmp = fs.existsSync(TMP_DB_PATH);

function cloneSeed() {
  // Return a fresh copy so in-memory mutations never leak between requests.
  return JSON.parse(JSON.stringify(seedData));
}

export function readDB() {
  // Prefer the temp copy when it exists (serverless runtime with prior writes).
  if (usingTmp) {
    try {
      return JSON.parse(fs.readFileSync(TMP_DB_PATH, "utf-8"));
    } catch {
      usingTmp = false;
    }
  }

  // Try the on-disk file first (local development / writable FS).
  try {
    return JSON.parse(fs.readFileSync(BUNDLED_DB_PATH, "utf-8"));
  } catch {
    // Fall back to the bundled seed data. This guarantees the app never throws
    // "Database file not found" on read-only serverless filesystems.
    return cloneSeed();
  }
}

export function writeDB(data) {
  const json = JSON.stringify(data, null, 2);

  if (!usingTmp) {
    try {
      fs.writeFileSync(BUNDLED_DB_PATH, json, "utf-8");
      return;
    } catch {
      // Read-only filesystem (e.g. Vercel) — fall back to the temp directory.
      usingTmp = true;
    }
  }

  fs.writeFileSync(TMP_DB_PATH, json, "utf-8");
}

export function nextBookingId(db) {
  const num = 100000 + db.bookings.length + 1;
  return `BK-${num}`;
}

export function genId(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}