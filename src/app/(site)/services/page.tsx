import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/data/membership";
import { clubs } from "@/data/clubs";
import { getIcon } from "@/lib/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServiceRequestDialog } from "@/components/services/service-request-dialog";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: "Private dining, event concierge, workspace days, wellness suite and more, bookable by members.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything a house needs, <em className="text-clay italic">by the hour.</em>
          </>
        }
        description="Beyond the club evening: rooms to book, desks to keep, and a concierge who will plan the party you have been putting off."
        art={{ palette: clubs[4].palette, motif: "peaks" }}
      />

      <section className="pb-28">
        <Container className="flex flex-col">
          {services.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.slug}>
                <article
                  className={cn(
                    "group grid gap-10 border-t border-ink/15 py-14 transition-colors duration-500 md:grid-cols-12 md:py-20",
                    index === services.length - 1 && "border-b",
                  )}
                >
                  <div className="flex items-start gap-5 md:col-span-1">
                    <span className="font-display text-sm text-clay">0{index + 1}</span>
                  </div>

                  <div className="flex flex-col gap-6 md:col-span-5">
                    <span className="flex size-12 items-center justify-center rounded-full bg-forest text-paper transition-transform duration-500 group-hover:scale-110">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">{service.title}</h2>
                    <p className="max-w-md text-lg leading-relaxed text-ink-soft">{service.summary}</p>
                  </div>

                  <div className="flex flex-col justify-between gap-10 md:col-span-6">
                    <RevealGroup className="grid gap-3 sm:grid-cols-2">
                      {service.includes.map((item) => (
                        <RevealItem key={item} className="flex gap-3 rounded-2xl border border-mist/80 bg-white/50 p-4 text-[15px] transition-colors duration-500 group-hover:border-mist">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                          {item}
                        </RevealItem>
                      ))}
                    </RevealGroup>
                    <div className="flex flex-wrap items-center justify-between gap-6">
                      <p className="font-display text-2xl">{service.priceLabel}</p>
                      <ServiceRequestDialog service={service} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <section className="bg-forest py-24 text-paper md:py-32">
        <Reveal>
          <Container className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-2xl font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
              Not sure what you need? <em className="text-brass italic">Ask a host.</em>
            </h2>
            <Link href="/contact" className={cn(buttonVariants({ variant: "inverse", size: "lg" }))}>
              Talk to the concierge
            </Link>
          </Container>
        </Reveal>
      </section>
    </>
  );
}
