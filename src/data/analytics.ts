// Mock analytics. Figures are fictional and chosen so the totals reconcile with each other.

export const membershipGrowth = [
  { month: "Apr", members: 402, attendance: 61 },
  { month: "May", members: 468, attendance: 64 },
  { month: "Jun", members: 533, attendance: 68 },
  { month: "Jul", members: 597, attendance: 66 },
  { month: "Aug", members: 662, attendance: 71 },
  { month: "Sep", members: 721, attendance: 74 },
  { month: "Oct", members: 788, attendance: 77 },
];

export const rsvpsByCategory = [
  { category: "Arts & Letters", rsvps: 310 },
  { category: "Food & Wine", rsvps: 268 },
  { category: "Wellness", rsvps: 188 },
  { category: "Music", rsvps: 152 },
  { category: "Outdoors", rsvps: 124 },
  { category: "Games", rsvps: 96 },
];

/** Monthly recurring revenue by tier. Sums to kpis.monthlyRecurringRevenue. */
export const revenueByTier = [
  { tier: "Associate", monthly: 7410, members: 262 },
  { tier: "Member", monthly: 33100, members: 430 },
  { tier: "Patron", monthly: 17730, members: 96 },
];

export const kpis = {
  activeMembers: 788,
  monthlyRecurringRevenue: 58240,
  attendanceRate: 77,
};

export const memberActivity = [
  { week: "W1", visits: 3 },
  { week: "W2", visits: 5 },
  { week: "W3", visits: 4 },
  { week: "W4", visits: 7 },
  { week: "W5", visits: 6 },
  { week: "W6", visits: 9 },
];

export const invoices = [
  { id: "INV-2026-10", date: "2026-10-01", description: "Member plan, monthly", amount: 79, status: "Paid" },
  { id: "INV-2026-09", date: "2026-09-01", description: "Member plan, monthly", amount: 79, status: "Paid" },
  { id: "INV-2026-08", date: "2026-08-01", description: "Member plan, monthly", amount: 79, status: "Paid" },
  { id: "INV-2026-07", date: "2026-07-14", description: "Sauna and Soup, guest ticket", amount: 18, status: "Paid" },
];
