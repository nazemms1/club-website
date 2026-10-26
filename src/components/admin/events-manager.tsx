"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { getClub } from "@/data/clubs";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { rowClass, tableClass, tableWrapClass, tdClass, theadClass, thClass } from "@/components/ui/table";
import type { ClubEvent } from "@/lib/types";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";

export function EventsManager({ initial }: { initial: ClubEvent[] }) {
  const { notify } = useApp();
  const [items, setItems] = useState<ClubEvent[]>(initial);

  function togglePublished(slug: string) {
    const target = items.find((item) => item.slug === slug);
    if (!target) return;
    const nextStatus: ClubEvent["status"] = target.status === "published" ? "draft" : "published";
    setItems((current) => current.map((item) => (item.slug === slug ? { ...item, status: nextStatus } : item)));
    notify(nextStatus === "published" ? "Event published to the site" : "Event moved back to draft");
  }

  function addDraft() {
    const number = items.filter((item) => item.slug.startsWith("untitled-")).length + 1;
    const draft: ClubEvent = {
      slug: `untitled-${number}`,
      title: `Untitled gathering ${number}`,
      summary: "Add a short summary for members.",
      agenda: ["7:00 PM Doors open"],
      date: "2027-02-06",
      time: "19:00",
      durationHours: 2,
      venue: "To be confirmed",
      city: "Toronto",
      capacity: 30,
      rsvpCount: 0,
      price: 0,
      status: "draft",
      hostId: "m-sofia",
    };
    setItems((current) => [draft, ...current]);
    notify("Draft created. Edit details in the next release");
  }

  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const publishedCount = items.filter((item) => item.status === "published").length;
  const draftCount = items.length - publishedCount;

  return (
    <Card className="flex flex-col gap-6">
      <CardHeader
        title="Event calendar"
        description={`${publishedCount} published and ${draftCount} in draft`}
        action={
          <Button size="sm" onClick={addDraft}>
            <Plus className="size-4" aria-hidden="true" />
            New draft
          </Button>
        }
      />

      <div className={tableWrapClass}>
        <table className={cn(tableClass, "min-w-[860px]")}>
          <thead className={theadClass}>
            <tr>
              <th scope="col" className={thClass}>Event</th>
              <th scope="col" className={thClass}>When</th>
              <th scope="col" className={thClass}>Venue</th>
              <th scope="col" className={thClass}>Seats</th>
              <th scope="col" className={thClass}>Price</th>
              <th scope="col" className={thClass}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((event) => {
              const club = event.clubSlug ? getClub(event.clubSlug) : undefined;
              const percent = Math.min(100, Math.round((event.rsvpCount / event.capacity) * 100));
              return (
                <tr key={event.slug} className={rowClass}>
                  <td className={tdClass}>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-xs text-ink-soft">{club?.name ?? "House event"}</p>
                  </td>
                  <td className={cn(tdClass, "whitespace-nowrap")}>
                    {formatDate(event.date, { weekday: "short", month: "short", day: "numeric" })}
                    <span className="block text-xs text-ink-soft">{formatTime(event.time)}</span>
                  </td>
                  <td className={cn(tdClass, "text-ink-soft")}>{event.venue}</td>
                  <td className={tdClass}>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-paper-deep">
                        <div className="h-full rounded-full bg-forest" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-xs text-ink-soft tabular-nums">
                        {event.rsvpCount}/{event.capacity}
                      </span>
                    </div>
                  </td>
                  <td className={cn(tdClass, "tabular-nums")}>{formatCurrency(event.price)}</td>
                  <td className={tdClass}>
                    <button
                      type="button"
                      onClick={() => togglePublished(event.slug)}
                      aria-label={`Mark ${event.title} as ${event.status === "published" ? "draft" : "published"}`}
                      className="rounded-full transition-opacity hover:opacity-80"
                    >
                      <Pill tone={event.status === "published" ? "forest" : "muted"}>
                        {event.status === "published" ? "Published" : "Draft"}
                      </Pill>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
