import type { SessionUser } from "@/lib/types";

export const STAFF_EMAIL = "admin@admin.com";
const STAFF_PASSWORD = "password";

export type AuthResult = { ok: true; user: SessionUser } | { ok: false; error: string };

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  const name = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
  return name || "Member";
}

/**
 * Mock authentication for the prototype. The staff account is fixed (admin@admin.com / password);
 * any other valid email with an 8+ character password opens a member account.
 * Real sign-in must verify credentials on a server with hashed passwords.
 */
export function authenticate(email: string, password: string): AuthResult {
  const normalized = email.trim().toLowerCase();

  if (normalized === STAFF_EMAIL) {
    if (password !== STAFF_PASSWORD) {
      return { ok: false, error: "Those details do not match the staff account." };
    }
    return { ok: true, user: { name: "Maison Staff", email: STAFF_EMAIL, tierId: "patron", role: "admin" } };
  }

  if (password.length < 8) {
    return { ok: false, error: "Passwords have at least 8 characters." };
  }

  return { ok: true, user: { name: nameFromEmail(normalized), email: normalized, tierId: "member", role: "member" } };
}

/** Creates a member account from the sign-up form. The staff address is reserved. */
export function registerMember(name: string, email: string): AuthResult {
  const normalized = email.trim().toLowerCase();

  if (normalized === STAFF_EMAIL) {
    return { ok: false, error: "That address belongs to a staff account. Please sign in instead." };
  }

  return { ok: true, user: { name: name.trim(), email: normalized, tierId: "associate", role: "member" } };
}
