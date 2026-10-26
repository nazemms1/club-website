import type { Metadata } from "next";
import { events } from "@/data/events";
import { clubs } from "@/data/clubs";
import { EventsBrowser } from "@/components/events/events-browser";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Events",
  description: "Every upcoming gathering across the clubs, with capacity, price and venue.",
};

export default function EventsPage() {
  const upcoming = events
    .filter((event) => event.status === "published")
    .sort((a, b) => a.date.localeCompare(b.date));

  const clubOptions = clubs.map((club) => ({ slug: club.slug, name: club.name }));

  return (
    <>
      <PageHero
        eyebrow="The calendar"
        title={
          <>
            Evenings, <em className="text-clay italic">lined up.</em>
          </>
        }
        description="Every gathering in the house, with its host, capacity and price. Filter by club or by month, then RSVP in a single tap."
        art={{ palette: clubs[1].palette, motif: "rings" }}
      />
      <section className="pb-32">
        <Container>
          <EventsBrowser events={upcoming} clubs={clubOptions} />
        </Container>
      </section>
    </>
  );
}
