"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { Card } from "@/components/ui/card";
import { inputClass } from "@/components/ui/field";
import { Pill } from "@/components/ui/pill";
import { rowClass, tableClass, tableWrapClass, tdClass, theadClass, thClass } from "@/components/ui/table";
import { getTier } from "@/lib/membership";
import type { Member, TierId } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function MembersTable({ members }: { members: Member[] }) {
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState<TierId | "all">("all");
  const [status, setStatus] = useState<Member["status"] | "all">("all");

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery = `${member.name} ${member.email} ${member.city}`.toLowerCase().includes(needle);
      const matchesTier = tier === "all" || member.tierId === tier;
      const matchesStatus = status === "all" || member.status === status;
      return matchesQuery && matchesTier && matchesStatus;
    });
  }, [members, query, tier, status]);

  return (
    <Card className="flex flex-col gap-6">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
        <label className="relative block">
          <span className="sr-only">Search members</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email or city"
            className={cn(inputClass, "pl-11")}
          />
        </label>
        <label className="block">
          <span className="sr-only">Filter by tier</span>
          <select value={tier} onChange={(event) => setTier(event.target.value as TierId | "all")} className={cn(inputClass, "appearance-none")}>
            <option value="all">All tiers</option>
            <option value="associate">Associate</option>
            <option value="member">Member</option>
            <option value="patron">Patron</option>
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Filter by status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as Member["status"] | "all")}
            className={cn(inputClass, "appearance-none")}
          >
            <option value="all">Any status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </label>
      </div>

      <p className="-mb-3 text-sm text-ink-soft" aria-live="polite">
        Showing {rows.length} of {members.length} members
      </p>

      <div className={tableWrapClass}>
        <table className={cn(tableClass, "min-w-[760px]")}>
          <thead className={theadClass}>
            <tr>
              <th scope="col" className={thClass}>Member</th>
              <th scope="col" className={thClass}>City</th>
              <th scope="col" className={thClass}>Tier</th>
              <th scope="col" className={thClass}>Role</th>
              <th scope="col" className={thClass}>Joined</th>
              <th scope="col" className={cn(thClass, "text-right")}>Clubs</th>
              <th scope="col" className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((member) => (
              <tr key={member.id} className={rowClass}>
                <td className={tdClass}>
                  <div className="flex items-center gap-3">
                    <Avatar name={member.name} size="sm" />
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-ink-soft">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className={tdClass}>{member.city}</td>
                <td className={tdClass}>
                  <Pill tone="neutral">{getTier(member.tierId).name}</Pill>
                </td>
                <td className={tdClass}>{member.role}</td>
                <td className={cn(tdClass, "whitespace-nowrap")}>{formatDate(member.joinedOn, { day: "numeric", month: "short", year: "numeric" })}</td>
                <td className={cn(tdClass, "text-right tabular-nums")}>{member.clubSlugs.length}</td>
                <td className={tdClass}>
                  <Pill tone={member.status === "active" ? "forest" : "brass"} className="capitalize">
                    {member.status}
                  </Pill>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-ink-soft">
                  No members match these filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
