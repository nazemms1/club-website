"use client";

import Link from "next/link";
import { useState } from "react";
import { tiers } from "@/data/membership";
import { MembershipCard } from "@/components/membership-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn, formatCurrency } from "@/lib/utils";
import type { TierId } from "@/lib/types";

export function MembershipShowcase() {
  const [tierId, setTierId] = useState<TierId>("member");
  const tier = tiers.find((item) => item.id === tierId) ?? tiers[1];

  return (
    <section className="relative overflow-hidden bg-forest py-32 text-paper md:py-40">
      <Container className="grid items-center gap-20 md:grid-cols-12">
        <RevealGroup className="flex flex-col gap-8 md:col-span-6">
          <RevealItem>
            <Eyebrow className="text-brass">One card, every room</Eyebrow>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
              Choose how often <em className="italic">you arrive.</em>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-md text-paper/70">
              Three memberships, billed monthly or annually. Hover the card, then switch tiers to see the perks change.
            </p>
          </RevealItem>

          <RevealItem>
            <div role="radiogroup" aria-label="Membership tier" className="flex w-fit flex-wrap gap-2 rounded-full border border-paper/20 p-1.5">
              {tiers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={item.id === tierId}
                  onClick={() => setTierId(item.id)}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm transition-all duration-300 active:scale-[0.97]",
                    item.id === tierId ? "bg-paper text-ink" : "text-paper/70 hover:text-paper",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </RevealItem>

          <RevealItem className="flex flex-col gap-4">
            <p className="font-display text-4xl">
              {formatCurrency(tier.monthly)}
              <span className="ml-2 font-sans text-base text-paper/60">/ month</span>
            </p>
            <ul className="grid gap-3 text-paper/80 sm:grid-cols-2">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex gap-3 text-[15px]">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                  {perk}
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <Link href="/membership" className={cn(buttonVariants({ variant: "inverse", size: "lg" }), "w-fit")}>
              Compare memberships
            </Link>
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.15} className="flex justify-center md:col-span-6 md:justify-end">
          <MembershipCard name="Claire Dubois" tierName={tier.name} city="Toronto" memberNumber="MC  0412  2026" />
        </Reveal>
      </Container>
    </section>
  );
}
