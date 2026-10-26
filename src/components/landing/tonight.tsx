import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";
import { EventCard } from "@/components/event-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/layout";

export function Tonight() {
  const upcoming = events
    .filter((event) => event.status === "published")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <section className="py-32 md:py-40">
      <Container className="grid gap-16 md:grid-cols-12">
        <Reveal className="flex flex-col gap-8 md:sticky md:top-32 md:col-span-4 md:self-start">
          <Eyebrow>On the calendar</Eyebrow>
          <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Next at <em className="italic">the house.</em>
          </h2>
          <p className="max-w-xs text-ink-soft">Four evenings from across the three cities. Every one has a host, a capacity and a waiting list if it fills.</p>
          <Link href="/events" className="underline-sweep inline-flex w-fit items-center gap-2 text-sm font-medium hover:text-clay">
            See the full calendar
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <RevealGroup className="flex flex-col gap-4 md:col-span-8">
          {upcoming.map((event) => (
            <RevealItem key={event.slug}>
              <EventCard event={event} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
