"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { tiers } from "@/data/membership";
import { ApplicationForm } from "@/components/membership/application-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container, SectionHeading } from "@/components/ui/layout";
import { cn, formatCurrency } from "@/lib/utils";
import type { TierId } from "@/lib/types";

export function MembershipFlow() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [tierId, setTierId] = useState<TierId>("member");
  const selected = tiers.find((tier) => tier.id === tierId) ?? tiers[1];

  return (
    <>
      <section className="pb-24">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Choose your membership" title="Three ways in. Same front door." />
            <Reveal delay={0.15}>
              <div role="radiogroup" aria-label="Billing period" className="flex rounded-full border border-ink/15 p-1">
                {(["monthly", "annual"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={billing === option}
                    onClick={() => setBilling(option)}
                    className={cn(
                      "flex items-center gap-2 rounded-full px-5 py-2 text-sm capitalize transition-all duration-300 active:scale-[0.97]",
                      billing === option ? "bg-forest text-paper" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {option}
                    {option === "annual" ? <span className="rounded-full bg-brass/25 px-2 py-0.5 text-[11px] text-ink">Save 15%</span> : null}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <RevealGroup className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => {
              const isSelected = tier.id === tierId;
              const price = billing === "annual" ? tier.annualMonthly : tier.monthly;
              return (
                <RevealItem key={tier.id}>
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setTierId(tier.id)}
                    className={cn(
                      "relative flex h-full w-full flex-col gap-8 rounded-3xl border p-8 text-left transition-all duration-500 active:scale-[0.99] md:p-10",
                      isSelected ? "border-forest bg-forest text-paper shadow-2xl" : "border-mist bg-white/60 hover:-translate-y-1 hover:border-ink/40 hover:shadow-lg",
                    )}
                  >
                    {tier.featured ? (
                      <span className="absolute -top-3 left-8 rounded-full bg-brass px-3 py-1 text-[11px] tracking-[0.16em] text-ink uppercase">
                        Most chosen
                      </span>
                    ) : null}
                    <div className="flex flex-col gap-3">
                      <p className="font-display text-4xl tracking-tight">{tier.name}</p>
                      <p className={cn("text-[15px] leading-relaxed", isSelected ? "text-paper/75" : "text-ink-soft")}>{tier.tagline}</p>
                    </div>
                    <p className="font-display text-5xl">
                      {formatCurrency(price)}
                      <span className={cn("ml-2 font-sans text-base", isSelected ? "text-paper/60" : "text-ink-soft")}>/ month</span>
                    </p>
                    <ul className="flex flex-col gap-3 text-[15px]">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex gap-3">
                          <Check className={cn("mt-0.5 size-4 shrink-0", isSelected ? "text-brass" : "text-clay")} aria-hidden="true" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={cn(
                        "mt-auto inline-flex h-11 items-center justify-center rounded-full text-sm font-medium",
                        isSelected ? "bg-paper text-ink" : "border border-ink/20",
                      )}
                    >
                      {isSelected ? "Selected" : `Choose ${tier.name}`}
                    </span>
                  </button>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-32 bg-paper-deep py-24 md:py-32">
        <Container className="grid gap-16 md:grid-cols-12">
          <Reveal className="flex flex-col gap-6 md:sticky md:top-32 md:col-span-4 md:self-start">
            <SectionHeading
              eyebrow="Apply"
              title={
                <>
                  Tell us who <em className="italic">you are.</em>
                </>
              }
              description="Applications are read by the hosts of the house nearest you. We reply within three working days."
            />
            <p className="text-sm text-ink-soft">
              Applying for <span className="font-medium text-ink">{selected.name}</span>. You can change tiers at any time.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-8">
            <ApplicationForm tier={selected} billing={billing} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
