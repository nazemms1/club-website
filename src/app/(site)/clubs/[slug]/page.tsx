import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { clubs, getClub } from "@/data/clubs";
import { events } from "@/data/events";
import { members } from "@/data/members";
import { Avatar } from "@/components/avatar";
import { CoverArt } from "@/components/cover-art";
import { EventCard } from "@/components/event-card";
import { JoinClubButton } from "@/components/actions";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/layout";
import { categoryIcons } from "@/lib/icons";
import { getTier } from "@/lib/membership";
import { formatNumber } from "@/lib/utils";

interface ClubPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return clubs.map((club) => ({ slug: club.slug }));
}

export async function generateMetadata({ params }: ClubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) return { title: "Club not found" };
  return { title: club.name, description: club.tagline };
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params;
  const club = getClub(slug);
  if (!club) notFound();

  const Icon = categoryIcons[club.category];
  const upcoming = events
    .filter((event) => event.clubSlug === club.slug && event.status === "published")
    .sort((a, b) => a.date.localeCompare(b.date));
  const hosts = members.filter((member) => club.hostIds.includes(member.id));
  const requirement = getTier(club.requiredTier);

  return (
    <>
      <section className="pt-36 pb-20 md:pt-44 md:pb-28">
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-3xl md:sticky md:top-32 md:col-span-5 md:self-start">
            <CoverArt palette={club.palette} motif={club.motif} />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-10 md:col-span-7">
            <Link href="/clubs" className="underline-sweep inline-flex w-fit items-center gap-2 text-sm text-ink-soft hover:text-ink">
              <ArrowLeft className="size-4" aria-hidden="true" />
              All clubs
            </Link>

            <div className="flex flex-col gap-5">
              <Eyebrow className="flex items-center gap-2">
                <Icon className="size-4" aria-hidden="true" />
                {club.category} &middot; {club.city}
              </Eyebrow>
              <h1 className="font-display text-6xl leading-[0.95] tracking-tight text-balance md:text-7xl">{club.name}</h1>
              <p className="font-display text-2xl leading-snug text-ink-soft italic md:text-3xl">{club.tagline}</p>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-y border-mist/80 py-6 sm:grid-cols-4">
              <div>
                <dt className="text-xs tracking-[0.16em] text-ink-soft uppercase">Meets</dt>
                <dd className="mt-1 text-sm">{club.schedule}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-ink-soft uppercase">Members</dt>
                <dd className="mt-1 text-sm">{formatNumber(club.memberCount)}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-ink-soft uppercase">Founded</dt>
                <dd className="mt-1 text-sm">{club.founded}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-ink-soft uppercase">Requires</dt>
                <dd className="mt-1 text-sm">{requirement.name} and up</dd>
              </div>
            </dl>

            <p className="text-lg leading-relaxed text-ink-soft">{club.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              <JoinClubButton clubSlug={club.slug} requiredTier={club.requiredTier} />
              <p className="text-sm text-ink-soft">{formatNumber(club.memberCount)} members already inside</p>
            </div>

            <blockquote className="rounded-3xl bg-forest p-8 text-paper">
              <p className="text-xs tracking-[0.2em] text-brass uppercase">House rule</p>
              <p className="mt-3 font-display text-3xl leading-snug italic">&ldquo;{club.houseRule}&rdquo;</p>
            </blockquote>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl">What to expect</h2>
              <RevealGroup className="grid gap-3 sm:grid-cols-2">
                {club.highlights.map((highlight) => (
                  <RevealItem key={highlight} className="flex gap-3 rounded-2xl border border-mist/80 bg-white/50 p-4 text-[15px] transition-colors duration-500 hover:bg-white/80">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                    {highlight}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-display text-2xl">Hosted by</h2>
              <RevealGroup>
                <ul className="flex flex-col gap-4">
                  {hosts.map((host) => (
                    <RevealItem key={host.id} as="li" className="flex items-center gap-4">
                      <Avatar name={host.name} />
                      <div>
                        <p className="font-medium">{host.name}</p>
                        <p className="text-sm text-ink-soft">
                          {host.role} &middot; {host.city}
                        </p>
                      </div>
                    </RevealItem>
                  ))}
                </ul>
              </RevealGroup>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-mist/80 bg-paper-deep py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>Next gatherings</Eyebrow>
            <h2 className="mt-5 font-display text-4xl tracking-tight md:text-5xl">
              On the <em className="italic">table</em>
            </h2>
          </Reveal>
          <RevealGroup className="flex flex-col gap-4 md:col-span-8">
            {upcoming.length > 0 ? (
              upcoming.map((event) => (
                <RevealItem key={event.slug}>
                  <EventCard event={event} />
                </RevealItem>
              ))
            ) : (
              <p className="text-ink-soft">No gatherings scheduled yet. Hosts announce new dates in the house letter.</p>
            )}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
