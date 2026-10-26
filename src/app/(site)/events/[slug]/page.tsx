import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { getClub } from "@/data/clubs";
import { events, getEvent } from "@/data/events";
import { getMember } from "@/data/members";
import { Avatar } from "@/components/avatar";
import { EventCard } from "@/components/event-card";
import { RsvpButton } from "@/components/actions";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

const publishedEvents = events.filter((event) => event.status === "published");

/** Agenda lines are stored as "7:30 PM Doors open". This splits the time from the text. */
function splitAgenda(item: string) {
  const match = item.match(/^(\d{1,2}:\d{2} (?:AM|PM))\s+(.*)$/);
  return match ? { time: match[1], text: match[2] } : { time: "", text: item };
}

export function generateStaticParams() {
  return publishedEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return { title: event.title, description: event.summary };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event || event.status !== "published") notFound();

  const club = event.clubSlug ? getClub(event.clubSlug) : undefined;
  const host = getMember(event.hostId);
  const percentFull = Math.min(100, Math.round((event.rsvpCount / event.capacity) * 100));
  const isFull = event.rsvpCount >= event.capacity;
  const similar = publishedEvents
    .filter((item) => item.slug !== event.slug && item.clubSlug === event.clubSlug)
    .slice(0, 2);

  return (
    <>
      <section className="pt-36 pb-20 md:pt-44">
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="flex flex-col gap-10 md:col-span-7">
            <Link href="/events" className="underline-sweep inline-flex w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All events
            </Link>

            <div className="flex flex-col gap-5">
              <Eyebrow>{club ? club.name : "Maison Commune house event"}</Eyebrow>
              <h1 className="font-display text-5xl leading-[1] tracking-tight text-balance md:text-7xl">{event.title}</h1>
              <p className="text-lg leading-relaxed text-ink-soft">{event.summary}</p>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-display text-2xl">The evening</h2>
              <RevealGroup>
                <ol className="flex flex-col">
                  {event.agenda.map((item, index) => {
                    const { time, text } = splitAgenda(item);
                    return (
                      <RevealItem
                        key={item}
                        as="li"
                        className={cn("grid gap-4 py-5 sm:grid-cols-[140px_1fr]", index !== 0 && "border-t border-mist/80")}
                      >
                        <span className="font-display text-xl text-clay">{time}</span>
                        <span className="text-[15px] leading-relaxed">{text}</span>
                      </RevealItem>
                    );
                  })}
                </ol>
              </RevealGroup>
            </div>

            {host ? (
              <Reveal className="flex items-center gap-4 rounded-3xl border border-mist/80 bg-white/50 p-6">
                <Avatar name={host.name} size="lg" />
                <div>
                  <p className="text-xs tracking-[0.18em] text-ink-soft uppercase">Hosted by</p>
                  <p className="font-display text-2xl">{host.name}</p>
                  <p className="text-sm text-ink-soft">
                    {host.role} &middot; {host.city}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </Reveal>

          <aside className="md:sticky md:top-32 md:col-span-5 md:self-start">
            <Reveal delay={0.15} className="flex flex-col gap-7 rounded-3xl bg-forest p-8 text-paper md:p-10">
              <div className="flex flex-col gap-4 text-paper/90">
                <p className="flex items-center gap-3">
                  <CalendarDays className="size-4 text-brass" aria-hidden="true" />
                  {formatDate(event.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                </p>
                <p className="flex items-center gap-3">
                  <Clock className="size-4 text-brass" aria-hidden="true" />
                  {formatTime(event.time)} &middot; {event.durationHours} hours
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 text-brass" aria-hidden="true" />
                  {event.venue}, {event.city}
                </p>
              </div>

              <div className="border-t border-paper/15 pt-6">
                <div className="flex items-end justify-between">
                  <p className="font-display text-4xl">{formatCurrency(event.price)}</p>
                  <p className="flex items-center gap-2 text-sm text-paper/70">
                    <Users className="size-4" aria-hidden="true" />
                    {event.rsvpCount} of {event.capacity} seats
                  </p>
                </div>
                <div
                  className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper/15"
                  role="progressbar"
                  aria-label="Seats filled"
                  aria-valuemin={0}
                  aria-valuemax={event.capacity}
                  aria-valuenow={event.rsvpCount}
                >
                  <div className="h-full rounded-full bg-brass transition-[width] duration-1000 ease-out" style={{ width: `${percentFull}%` }} />
                </div>
                <p className="mt-3 text-sm text-paper/60">
                  {isFull ? "Fully booked. Join the waitlist and we will write." : `${event.capacity - event.rsvpCount} seats left`}
                </p>
              </div>

              <RsvpButton eventSlug={event.slug} full={isFull} className="w-full" />
            </Reveal>
          </aside>
        </Container>
      </section>

      {similar.length > 0 ? (
        <section className="border-t border-mist/80 bg-paper-deep py-24">
          <Container className="flex flex-col gap-8">
            <Eyebrow>More from {club?.name}</Eyebrow>
            <RevealGroup className="grid gap-4 md:grid-cols-2">
              {similar.map((item) => (
                <RevealItem key={item.slug}>
                  <EventCard event={item} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      ) : null}
    </>
  );
}
