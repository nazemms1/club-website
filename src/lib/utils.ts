import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return amount === 0 ? "Included" : currency.format(amount);
}

/** Dates are stored as YYYY-MM-DD and formatted in UTC so server and client render identically. */
export function formatDate(isoDate: string, options: Intl.DateTimeFormatOptions = { weekday: "short", month: "short", day: "numeric" }) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "UTC", ...options }).format(new Date(`${isoDate}T12:00:00Z`));
}

/** Converts a 24h "HH:mm" string into "7:30 PM" without relying on the runtime locale. */
export function formatTime(time: string) {
  const [hourText, minute] = time.split(":");
  const hour = Number(hourText);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minute} ${suffix}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-CA").format(value);
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
