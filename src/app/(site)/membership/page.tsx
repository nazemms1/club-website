import type { Metadata } from "next";
import { clubs } from "@/data/clubs";
import { MembershipFlow } from "@/components/membership/membership-flow";
import { PageHero } from "@/components/page-hero";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Membership",
  description: "Three memberships, billed monthly or annually. Request an invitation to join a house near you.",
};

const faqs = [
  {
    question: "Is membership by invitation?",
    answer: "Yes. Every application is read by a host in the city you live in. Most people hear back within three working days, usually with an invitation to a first evening.",
  },
  {
    question: "Can I change tiers later?",
    answer: "At any time. Upgrades apply straight away and are prorated. Downgrades take effect at your next billing date.",
  },
  {
    question: "Do I have to attend a club to keep my membership?",
    answer: "No. Some members come every week and others a few times a year. We only ask that you are kind to the people at your table.",
  },
  {
    question: "What does 'guest pass' mean?",
    answer: "A guest pass lets one friend join any open club evening with you. Patron members receive two each month. Passes are dated and tracked in your dashboard.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title={
          <>
            Request an <em className="text-forest italic">invitation.</em>
          </>
        }
        description="Membership opens every club in the house, in every city we serve. Choose a tier, tell us a little about yourself and a host will be in touch."
        art={{ palette: clubs[6].palette, motif: "sun" }}
      />

      <MembershipFlow />

      <section className="py-28 md:py-36">
        <Container className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <SectionHeading eyebrow="Good questions" title="Before you apply." />
          </Reveal>
          <RevealGroup className="flex flex-col md:col-span-8">
            {faqs.map((faq) => (
              <RevealItem key={faq.question} className="border-t border-ink/15 py-6 last:border-b">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl tracking-tight marker:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/20 text-lg transition-transform duration-500 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{faq.answer}</p>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
