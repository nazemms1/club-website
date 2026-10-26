import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clubs } from "@/data/clubs";
import { milestones, values } from "@/data/content";
import { members } from "@/data/members";
import { Avatar } from "@/components/avatar";
import { PageHero } from "@/components/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container, SectionHeading } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "How Maison Commune began in a borrowed back room and grew into a members' house in three cities.",
};

export default function AboutPage() {
  const hosts = members.filter((member) => member.role !== "Member").slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="About the house"
        title={
          <>
            A house built on <em className="text-forest italic">small rooms.</em>
          </>
        }
        description="We started with eight people, one novel and a kettle that never stopped working. Seven years later the same idea runs in three cities: a room you can hear across, and a host who will walk you to the first table."
        art={{ palette: clubs[0].palette, motif: "arch" }}
      />

      <section className="border-y border-mist/80 py-28 md:py-36">
        <Container className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionHeading eyebrow="How we got here" title="Four rooms, four years." />
          </div>
          <RevealGroup className="md:col-span-8">
            <ol className="flex flex-col">
              {milestones.map((milestone, index) => (
                <RevealItem
                  key={milestone.year}
                  as="li"
                  className={cn("grid gap-6 py-10 md:grid-cols-[140px_1fr]", index !== 0 && "border-t border-mist/80")}
                >
                  <span className="font-display text-5xl tracking-tight text-clay">{milestone.year}</span>
                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-2xl tracking-tight md:text-3xl">{milestone.title}</h3>
                    <p className="max-w-xl leading-relaxed text-ink-soft">{milestone.body}</p>
                  </div>
                </RevealItem>
              ))}
            </ol>
          </RevealGroup>
        </Container>
      </section>

      <section className="py-28 md:py-36">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="What we keep"
            title={
              <>
                Four things we <em className="italic">will not trade.</em>
              </>
            }
          />
          <RevealGroup className="grid gap-px overflow-hidden rounded-3xl bg-mist md:grid-cols-2">
            {values.map((value, index) => (
              <RevealItem key={value.title} className="flex flex-col gap-6 bg-paper p-10 transition-colors duration-500 hover:bg-white/70 md:p-14">
                <span className="font-display text-sm text-clay">0{index + 1}</span>
                <h3 className="font-display text-3xl tracking-tight">{value.title}</h3>
                <p className="max-w-md leading-relaxed text-ink-soft">{value.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="bg-paper-deep py-28 md:py-36">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="The hosts"
            title={
              <>
                Members first. <em className="italic">Staff second, if at all.</em>
              </>
            }
            description="Every club is run by a member who has earned the room. Hosts keep the house rule, welcome new faces and make sure the last guest gets a lift home."
          />
          <RevealGroup className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {hosts.map((host) => {
              const hostedClubs = clubs.filter((club) => club.hostIds.includes(host.id));
              return (
                <RevealItem key={host.id} className="flex items-start gap-5 border-t border-ink/15 pt-6">
                  <Avatar name={host.name} size="lg" />
                  <div className="flex flex-col gap-2">
                    <p className="font-display text-2xl tracking-tight">{host.name}</p>
                    <p className="text-sm text-ink-soft">
                      {host.role} &middot; {host.city}
                    </p>
                    <p className="text-sm text-ink-soft">
                      {hostedClubs.length > 0 ? hostedClubs.map((club) => club.name).join(", ") : "Hosts across the house"}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-28 md:py-36">
        <Reveal>
          <Container className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
              Come and see the <em className="italic">long table.</em>
            </h2>
            <Link href="/membership" className={buttonVariants({ size: "lg" })}>
              Request an invitation
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
