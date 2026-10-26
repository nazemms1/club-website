import type { Metadata } from "next";
import { siteConfig } from "@/data/content";
import { clubs } from "@/data/clubs";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the house team, the concierge or a host in Toronto, Montréal or Vancouver.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Write to the <em className="text-forest italic">house.</em>
          </>
        }
        description="Questions about membership, hosting or a private booking? Send a note and the right person will answer, usually within two working days."
        art={{ palette: clubs[5].palette, motif: "grid" }}
      />

      <section className="pb-32">
        <Container className="grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ContactForm />
          </Reveal>

          <RevealGroup className="flex flex-col gap-10 md:col-span-4 md:col-start-9">
            <RevealItem className="flex flex-col gap-3">
              <p className="text-xs tracking-[0.2em] text-clay uppercase">Visit the house</p>
              <p className="font-display text-2xl">{siteConfig.address}</p>
              <p className="text-ink-soft">{siteConfig.hours}</p>
            </RevealItem>
            <RevealItem className="flex flex-col gap-3">
              <p className="text-xs tracking-[0.2em] text-clay uppercase">Write or call</p>
              <a href={`mailto:${siteConfig.email}`} className="underline-sweep w-fit font-display text-2xl hover:text-clay">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="underline-sweep w-fit text-ink-soft hover:text-ink">
                {siteConfig.phone}
              </a>
            </RevealItem>
            <RevealItem>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper-deep" aria-hidden="true">
                <svg viewBox="0 0 400 300" className="size-full" preserveAspectRatio="xMidYMid slice">
                  <g stroke="#1c1b18" strokeOpacity="0.12" strokeWidth="1">
                    {Array.from({ length: 9 }, (_, index) => (
                      <line key={`h-${index}`} x1="0" x2="400" y1={index * 36} y2={index * 36} />
                    ))}
                    {Array.from({ length: 12 }, (_, index) => (
                      <line key={`v-${index}`} x1={index * 36} x2={index * 36} y1="0" y2="300" />
                    ))}
                  </g>
                  <path d="M0 220 C 90 180, 150 260, 240 200 S 360 120, 400 160" fill="none" stroke="#b08a4e" strokeWidth="6" />
                  <circle cx="210" cy="150" r="10" fill="#1d3a2f" />
                  <circle cx="210" cy="150" r="22" fill="none" stroke="#1d3a2f" strokeOpacity="0.4" />
                </svg>
                <p className="absolute bottom-4 left-4 rounded-full bg-paper/90 px-4 py-2 text-sm">King Street West</p>
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
