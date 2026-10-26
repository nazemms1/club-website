export type TierId = "associate" | "member" | "patron";

export type ClubCategory = "Arts & Letters" | "Food & Wine" | "Music" | "Wellness" | "Outdoors" | "Games";

export type CoverMotif = "arch" | "rings" | "sun" | "waves" | "peaks" | "grid";

export type IconKey =
  | "book"
  | "wine"
  | "music"
  | "waves"
  | "mountain"
  | "trophy"
  | "utensils"
  | "briefcase"
  | "coffee"
  | "feather"
  | "telescope"
  | "dumbbell"
  | "bike"
  | "flame"
  | "palette"
  | "sprout";

export interface Palette {
  background: string;
  foreground: string;
  accent: string;
}

export interface Club {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ClubCategory;
  city: string;
  founded: number;
  memberCount: number;
  schedule: string;
  houseRule: string;
  requiredTier: TierId;
  hostIds: string[];
  highlights: string[];
  palette: Palette;
  motif: CoverMotif;
}

export interface ClubEvent {
  slug: string;
  title: string;
  summary: string;
  agenda: string[];
  /** Omitted for house-wide events that are not tied to one club. */
  clubSlug?: string;
  /** YYYY-MM-DD */
  date: string;
  /** 24h HH:mm */
  time: string;
  durationHours: number;
  venue: string;
  city: string;
  capacity: number;
  rsvpCount: number;
  /** CAD. Zero means included with membership. */
  price: number;
  status: "published" | "draft";
  hostId: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  city: string;
  tierId: TierId;
  role: "Member" | "Host" | "Curator";
  joinedOn: string;
  clubSlugs: string[];
  status: "active" | "paused";
}

export interface MembershipTier {
  id: TierId;
  name: string;
  monthly: number;
  annualMonthly: number;
  tagline: string;
  perks: string[];
  featured?: boolean;
}

export interface Service {
  slug: string;
  title: string;
  icon: IconKey;
  summary: string;
  priceLabel: string;
  includes: string[];
}

export type ApplicationStatus = "pending" | "approved" | "declined";

export interface Application {
  id: string;
  name: string;
  email: string;
  city: string;
  interests: ClubCategory[];
  requestedTier: TierId;
  statement: string;
  submittedOn: string;
  referredBy?: string;
  status: ApplicationStatus;
}

export interface Testimonial {
  quote: string;
  name: string;
  detail: string;
}

/** The signed-in account. Staff accounts have role "admin" and can open the staff area. */
export interface SessionUser {
  name: string;
  email: string;
  tierId: TierId;
  role: "member" | "admin";
}
