import fs from "fs";
import path from "path";
import os from "os";

// The bundled seed database that ships with the deployment.
const BUNDLED_DB_PATH = path.join(process.cwd(), "data", "db.json");

// A writable fallback location. On serverless hosts (e.g. Vercel) the project
// directory is read-only, but the OS temp directory is writable. This lets the
// app keep working instead of crashing with a server-side exception.
const TMP_DB_PATH = path.join(os.tmpdir(), "fitzone-db.json");

// Tracks whether we have successfully written to the OS temp file. Once we
// have, reads prefer it so the latest changes are visible.
let usingTmp = fs.existsSync(TMP_DB_PATH);

function readFrom(file) {
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function readDB() {
  // Prefer the temp copy when it exists (serverless runtime with prior writes).
  if (usingTmp) {
    try {
      return readFrom(TMP_DB_PATH);
    } catch {
      usingTmp = false;
    }
  }

  try {
    return readFrom(BUNDLED_DB_PATH);
  } catch {
    // Last resort: if the bundled file is somehow missing but a temp copy
    // exists, use it.
    if (fs.existsSync(TMP_DB_PATH)) {
      usingTmp = true;
      return readFrom(TMP_DB_PATH);
    }
    throw new Error("Database file not found.");
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