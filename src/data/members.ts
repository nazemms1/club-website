import type { Member } from "@/lib/types";

// All people, emails and details in this file are fictional mock data.
export const members: Member[] = [
  { id: "m-claire", name: "Claire Dubois", email: "claire.dubois@example.com", city: "Toronto", tierId: "member", role: "Member", joinedOn: "2024-09-14", clubSlugs: ["literary-salon", "cold-water"], status: "active" },
  { id: "m-marcus", name: "Marcus Hale", email: "marcus.hale@example.com", city: "Toronto", tierId: "patron", role: "Host", joinedOn: "2021-03-02", clubSlugs: ["literary-salon", "late-table"], status: "active" },
  { id: "m-priya", name: "Priya Raman", email: "priya.raman@example.com", city: "Montréal", tierId: "member", role: "Host", joinedOn: "2022-05-19", clubSlugs: ["wine-circle", "supper-club"], status: "active" },
  { id: "m-hugo", name: "Hugo Lefebvre", email: "hugo.lefebvre@example.com", city: "Montréal", tierId: "patron", role: "Host", joinedOn: "2020-11-08", clubSlugs: ["wine-circle", "studio-nights"], status: "active" },
  { id: "m-elena", name: "Elena Markovic", email: "elena.markovic@example.com", city: "Vancouver", tierId: "member", role: "Host", joinedOn: "2023-01-25", clubSlugs: ["cold-water"], status: "active" },
  { id: "m-daniel", name: "Daniel Okafor", email: "daniel.okafor@example.com", city: "Vancouver", tierId: "associate", role: "Member", joinedOn: "2025-02-11", clubSlugs: ["trailhead"], status: "active" },
  { id: "m-sofia", name: "Sofia Brandt", email: "sofia.brandt@example.com", city: "Toronto", tierId: "member", role: "Curator", joinedOn: "2023-06-03", clubSlugs: ["late-table", "literary-salon"], status: "active" },
  { id: "m-lucas", name: "Lucas Tremblay", email: "lucas.tremblay@example.com", city: "Montréal", tierId: "associate", role: "Member", joinedOn: "2025-08-30", clubSlugs: ["studio-nights"], status: "paused" },
  { id: "m-amara", name: "Amara Osei", email: "amara.osei@example.com", city: "Vancouver", tierId: "patron", role: "Host", joinedOn: "2022-10-17", clubSlugs: ["trailhead", "cold-water"], status: "active" },
  { id: "m-jonah", name: "Jonah Whitfield", email: "jonah.whitfield@example.com", city: "Toronto", tierId: "associate", role: "Member", joinedOn: "2026-02-06", clubSlugs: ["late-table"], status: "active" },
  { id: "m-meilin", name: "Mei Lin Chen", email: "meilin.chen@example.com", city: "Vancouver", tierId: "member", role: "Host", joinedOn: "2024-04-21", clubSlugs: ["sunday-strings"], status: "active" },
  { id: "m-theo", name: "Théo Gagnon", email: "theo.gagnon@example.com", city: "Montréal", tierId: "associate", role: "Member", joinedOn: "2025-11-12", clubSlugs: ["supper-club"], status: "active" },
  { id: "m-ingrid", name: "Ingrid Solberg", email: "ingrid.solberg@example.com", city: "Toronto", tierId: "member", role: "Member", joinedOn: "2023-09-09", clubSlugs: ["literary-salon"], status: "active" },
  { id: "m-noah", name: "Noah Fischer", email: "noah.fischer@example.com", city: "Montréal", tierId: "associate", role: "Member", joinedOn: "2026-06-18", clubSlugs: ["wine-circle"], status: "active" },
  { id: "m-isabel", name: "Isabel Ruiz", email: "isabel.ruiz@example.com", city: "Vancouver", tierId: "member", role: "Member", joinedOn: "2024-12-02", clubSlugs: ["cold-water", "trailhead"], status: "active" },
  { id: "m-kieran", name: "Kieran Walsh", email: "kieran.walsh@example.com", city: "Toronto", tierId: "patron", role: "Host", joinedOn: "2021-07-27", clubSlugs: ["late-table", "wine-circle"], status: "active" },
];

export function getMember(id: string) {
  return members.find((member) => member.id === id);
}
