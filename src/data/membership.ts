import type { Application, MembershipTier, Service, Testimonial } from "@/lib/types";

export const tiers: MembershipTier[] = [
  {
    id: "associate",
    name: "Associate",
    monthly: 29,
    annualMonthly: 24,
    tagline: "For curious newcomers who want a seat at a few tables.",
    perks: ["Access to Associate-level clubs", "Discounted event tickets", "Reading room and lounge access", "Monthly house newsletter"],
  },
  {
    id: "member",
    name: "Member",
    monthly: 79,
    annualMonthly: 66,
    tagline: "The everyday membership for people who show up most weeks.",
    perks: ["Every club in the house", "Priority RSVP on all events", "Workspace days, four per month", "Private dining room, twice a year", "Member directory access"],
    featured: true,
  },
  {
    id: "patron",
    name: "Patron",
    monthly: 199,
    annualMonthly: 166,
    tagline: "For hosts, founders and anyone who wants the house to feel like home.",
    perks: ["Everything in Member", "Two guest passes every month", "Host a club or a supper", "Concierge event planning", "Unlimited workspace days", "Seat on the members' council"],
  },
];

export const services: Service[] = [
  {
    slug: "private-dining",
    title: "Private Dining Room",
    icon: "utensils",
    summary: "Reserve the Cellar Room for up to fourteen guests, with a sommelier and a set menu written around your table.",
    priceLabel: "From $450 per evening",
    includes: ["Room hire for up to 14 guests", "Sommelier-led wine pairing", "Set menu or chef's tasting", "Coat check and door host"],
  },
  {
    slug: "concierge-events",
    title: "Event Concierge",
    icon: "briefcase",
    summary: "We plan the launch party, the birthday or the offsite from first call to final clean-up.",
    priceLabel: "Quoted per brief",
    includes: ["Venue and vendor sourcing", "Run-of-show and timing plan", "On-site event lead", "Post-event summary"],
  },
  {
    slug: "study-library",
    title: "Library and Study",
    icon: "feather",
    summary: "Quiet reading rooms, a curated lending library and a desk you can keep for the whole week.",
    priceLabel: "Included with Member and Patron",
    includes: ["Quiet reading rooms", "Curated lending library", "Reserved weekly desk", "Printing and scanning"],
  },
  {
    slug: "wellness-suite",
    title: "Wellness Suite",
    icon: "waves",
    summary: "Sauna, cold plunge and a treatment room, bookable by the hour outside club sessions.",
    priceLabel: "$35 per hour",
    includes: ["Private sauna and plunge hour", "Treatment room booking", "Towels and robes", "Member-only off-peak rates"],
  },
  {
    slug: "workspace-days",
    title: "Workspace Days",
    icon: "coffee",
    summary: "Hot desks, meeting rooms and a kitchen that works as hard as you do.",
    priceLabel: "$25 per day",
    includes: ["Hot desk with monitor", "Bookable meeting room (1 hour)", "Kitchen and espresso bar", "High-speed wifi"],
  },
  {
    slug: "guest-passes",
    title: "Guest Passes",
    icon: "telescope",
    summary: "Bring a friend to any club evening. Passes are personal, dated and always welcome.",
    priceLabel: "Two per month with Patron",
    includes: ["One guest per pass", "Any open club evening", "Guest introduction by a host", "Pass tracked in your dashboard"],
  },
];

export const applications: Application[] = [
  { id: "app-1041", name: "Adrien Côté", email: "adrien.cote@example.com", city: "Montréal", interests: ["Food & Wine", "Games"], requestedTier: "member", statement: "I host a small monthly dinner for colleagues and want to learn from people who do it better.", submittedOn: "2026-10-21", referredBy: "Priya Raman", status: "pending" },
  { id: "app-1042", name: "Nadia Haddad", email: "nadia.haddad@example.com", city: "Toronto", interests: ["Arts & Letters"], requestedTier: "associate", statement: "Recently moved here and looking for a book group that reads widely and argues well.", submittedOn: "2026-10-22", status: "pending" },
  { id: "app-1043", name: "Owen Park", email: "owen.park@example.com", city: "Vancouver", interests: ["Outdoors", "Wellness"], requestedTier: "member", statement: "Trail runner looking for slower, social days out. Happy to lead a route once I know the trails.", submittedOn: "2026-10-22", referredBy: "Amara Osei", status: "pending" },
  { id: "app-1044", name: "Sylvie Morin", email: "sylvie.morin@example.com", city: "Montréal", interests: ["Music"], requestedTier: "associate", statement: "Cellist who misses playing in a room full of other people. Keen to join a chamber night.", submittedOn: "2026-10-23", status: "pending" },
  { id: "app-1045", name: "Ravi Menon", email: "ravi.menon@example.com", city: "Toronto", interests: ["Games", "Arts & Letters"], requestedTier: "patron", statement: "Runs a small strategy game group already and would like to bring it into a proper house.", submittedOn: "2026-10-23", referredBy: "Kieran Walsh", status: "pending" },
  { id: "app-1046", name: "Léa Bouchard", email: "lea.bouchard@example.com", city: "Montréal", interests: ["Arts & Letters", "Food & Wine"], requestedTier: "member", statement: "Ceramicist. Would love to teach a beginner wheel session if the house wants one.", submittedOn: "2026-10-24", status: "pending" },
  { id: "app-1047", name: "Tom Brennan", email: "tom.brennan@example.com", city: "Vancouver", interests: ["Wellness"], requestedTier: "associate", statement: "Post-marathon, looking for a cold water group that does not take itself too seriously.", submittedOn: "2026-10-24", status: "approved" },
  { id: "app-1048", name: "Yusuf Demir", email: "yusuf.demir@example.com", city: "Toronto", interests: ["Food & Wine"], requestedTier: "member", statement: "Former restaurant cook, now teaching. Want to cook for people again, slowly.", submittedOn: "2026-10-25", status: "pending" },
  { id: "app-1049", name: "Grace Lindqvist", email: "grace.lindqvist@example.com", city: "Vancouver", interests: ["Music", "Outdoors"], requestedTier: "associate", statement: "Choir singer who would like to sing somewhere that is not a church on Sundays.", submittedOn: "2026-10-18", status: "declined" },
];

export const testimonials: Testimonial[] = [
  { quote: "I came for a book group and left with three dinner invitations and a standing Thursday with people I would not otherwise have met.", name: "Claire D.", detail: "Member, Toronto" },
  { quote: "The house rules are short and the hosts keep them. That is why the room feels so easy to walk into.", name: "Hugo L.", detail: "Patron, Montréal" },
  { quote: "Cold Water is the only place I have ever been where nobody checks their phone for an hour and it feels like a gift.", name: "Isabel R.", detail: "Member, Vancouver" },
  { quote: "We booked the Cellar Room for my father's seventieth. It was the first time I felt the house was actually ours.", name: "Priya R.", detail: "Host, Montréal" },
];
