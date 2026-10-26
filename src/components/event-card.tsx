import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { getClub } from "@/data/clubs";
import type { ClubEvent } from "@/lib/types";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";

interface EventCardProps {
  event: ClubEvent;
  className?: string;
}

/** A row-style event card with a date block. Used across the events index, club pages and dashboard. */
export function EventCard({ event, className }: EventCardProps) {
  const club = event.clubSlug ? getClub(event.clubSlug) : undefined;
  const month = formatDate(event.date, { month: "short" }).toUpperCase();
  const day = formatDate(event.date, { day: "numeric" });
  const weekday = formatDate(event.date, { weekday: "long" });

  return (
    <Link
      href={`/events/${event.slug}`}
      className={cn(
        "group grid grid-cols-[auto_1fr_auto] items-center gap-6 rounded-3xl border border-mist/80 bg-white/50 p-5 transition-all duration-500 hover:border-forest/40 hover:bg-white md:p-6",
        className,
      )}
    >
      <div className="flex w-20 flex-col items-center rounded-2xl bg-paper-deep py-3 text-center">
        <span className="text-xs tracking-[0.18em] text-clay">{month}</span>
        <span className="font-display text-4xl leading-none">{day}</span>
        <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-soft">{weekday.slice(0, 3)}</span>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">{club ? club.name : "Maison Commune house event"}</p>
        <h3 className="font-display text-xl leading-snug tracking-tight md:text-2xl">{event.title}</h3>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
          <span>{formatTime(event.time)}</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            {event.venue}
          </span>
        </p>
      </div>

      <div className="hidden flex-col items-end gap-3 sm:flex">
        <span className="text-sm font-medium">{formatCurrency(event.price)}</span>
        <span className="flex size-10 items-center justify-center rounded-full border border-ink/15 transition-all group-hover:bg-forest group-hover:text-paper">
          <ArrowRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
