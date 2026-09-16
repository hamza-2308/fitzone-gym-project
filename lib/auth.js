import { cookies } from "next/headers";

const COOKIE_NAME = "fitzone_admin_session";
const SESSION_VALUE = "authenticated";

export function isAdminAuthenticated() {
  const store = cookies();
  return store.get(COOKIE_NAME)?.value === SESSION_VALUE;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_SESSION_VALUE = SESSION_VALUE;

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized. Please log in again.");
  }
}
