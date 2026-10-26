export const siteConfig = {
  name: "Maison Commune",
  email: "hello@maisoncommune.example",
  phone: "+1 (416) 555-0148",
  address: "88 King Street West, Toronto, ON",
  hours: "Mon to Fri 8:00 AM to 11:00 PM, weekends 9:00 AM to midnight",
  cities: ["Toronto", "Montréal", "Vancouver"],
  // Fixed rather than new Date() so pages stay prerenderable.
  copyrightYear: 2026,
};

/** The mock "today" used by dashboards, so day counts and calendars stay deterministic. */
export const TODAY = "2026-10-26";

export const navLinks = [
  { href: "/clubs", label: "Clubs" },
  { href: "/events", label: "Events" },
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const manifesto = [
  "Nobody should have to arrive alone.",
  "Every club has a host, and every host has a table.",
  "Phones rest face-down. Conversations are allowed to run long.",
  "We grow by invitation, and we keep each room small enough to hear.",
  "Belonging is a practice, not a perk. Show up, then show up again.",
];

export const milestones = [
  { year: "2019", title: "A reading group in a borrowed back room", body: "Eight people, one novel and a kettle that never stopped working. The Literary Salon starts here." },
  { year: "2021", title: "The first members' house opens", body: "A converted printing works in Toronto becomes the first house. Clubs multiply on the floors above the shop." },
  { year: "2023", title: "Clubs go national", body: "Montréal and Vancouver open their doors, each with hosts drawn from the city's own neighbourhoods." },
  { year: "2026", title: "The commons platform goes live", body: "One membership, every club, every house. Booking, hosting and belonging in a single place." },
];

export const values = [
  { title: "Hospitality first", body: "Every guest is introduced to someone within the first half hour. That is a host's job, and it is taken seriously." },
  { title: "Small rooms, big talk", body: "Clubs are capped at a size where a conversation can still travel across the table." },
  { title: "Open doors, quiet rules", body: "Few rules, kept well. The house would rather have three good rules than thirty weak ones." },
  { title: "Local by design", body: "Each house is run with its own neighbourhood. Hosts are members first, staff second, if at all." },
];
