"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/event-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn, formatDate } from "@/lib/utils";
import type { ClubEvent } from "@/lib/types";

interface EventsBrowserProps {
  events: ClubEvent[];
  clubs: { slug: string; name: string }[];
}

export function EventsBrowser({ events, clubs }: EventsBrowserProps) {
  const [clubSlug, setClubSlug] = useState<string>("all");
  const [month, setMonth] = useState<string>("all");

  const months = useMemo(() => {
    const unique = Array.from(new Set(events.map((event) => event.date.slice(0, 7))));
    return unique.map((value) => ({
      value,
      label: formatDate(`${value}-01`, { month: "long", year: "numeric" }),
    }));
  }, [events]);

  const filtered = events.filter((event) => {
    const clubMatch = clubSlug === "all" || (clubSlug === "house" ? !event.clubSlug : event.clubSlug === clubSlug);
    const monthMatch = month === "all" || event.date.startsWith(month);
    return clubMatch && monthMatch;
  });

  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm transition-all duration-300 active:scale-[0.97]",
      active ? "border-forest bg-forest text-paper" : "border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink",
    );

  return (
    <div className="grid gap-12 md:grid-cols-12">
      <aside className="flex flex-col gap-8 md:sticky md:top-32 md:col-span-3 md:self-start">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-xs tracking-[0.18em] text-ink-soft uppercase">Month</legend>
          <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
            <button type="button" aria-pressed={month === "all"} onClick={() => setMonth("all")} className={chip(month === "all")}>
              All months
            </button>
            {months.map((item) => (
              <button
                key={item.value}
                type="button"
                aria-pressed={month === item.value}
                onClick={() => setMonth(item.value)}
                className={chip(month === item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 text-xs tracking-[0.18em] text-ink-soft uppercase">Club</legend>
          <div className="flex flex-wrap gap-2 md:flex-col md:items-start">
            <button type="button" aria-pressed={clubSlug === "all"} onClick={() => setClubSlug("all")} className={chip(clubSlug === "all")}>
              Every club
            </button>
            <button type="button" aria-pressed={clubSlug === "house"} onClick={() => setClubSlug("house")} className={chip(clubSlug === "house")}>
              House events
            </button>
            {clubs.map((club) => (
              <button
                key={club.slug}
                type="button"
                aria-pressed={clubSlug === club.slug}
                onClick={() => setClubSlug(club.slug)}
                className={chip(clubSlug === club.slug)}
              >
                {club.name}
              </button>
            ))}
          </div>
        </fieldset>
      </aside>

      <div className="flex flex-col gap-4 md:col-span-9">
        <p className="mb-2 text-sm text-ink-soft" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "gathering" : "gatherings"} found
        </p>
        {filtered.length > 0 ? (
          <RevealGroup className="flex flex-col gap-4">
            {filtered.map((event) => (
              <RevealItem key={`${event.slug}-${clubSlug}-${month}`}>
                <EventCard event={event} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="rounded-3xl border border-dashed border-ink/25 p-12">
            <p className="font-display text-3xl">Nothing on the table for that filter.</p>
            <p className="mt-3 text-ink-soft">Try a different month, or see every club in the house.</p>
          </div>
        )}
      </div>
    </div>
  );
}
