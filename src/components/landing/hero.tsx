"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { clubs } from "@/data/clubs";
import { CoverArt } from "@/components/cover-art";
import { Parallax } from "@/components/motion/parallax";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const collagePositions = [
  "left-0 top-0 w-[62%] -rotate-4",
  "right-0 top-[16%] w-[56%] rotate-5",
  "bottom-0 left-[14%] w-[50%] -rotate-1",
];

function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1.1, delay, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const featuredClubs = clubs.slice(0, 3);

  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:min-h-[100svh] md:pt-44">
      <Container className="grid gap-16 md:grid-cols-12">
        <div className="flex flex-col justify-between gap-14 md:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
            <Eyebrow>Members&rsquo; houses in Toronto, Montréal and Vancouver</Eyebrow>
          </motion.div>

          <h1 className="font-display text-[clamp(3.6rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.035em]">
            <Line delay={0.15}>Come as a stranger.</Line>
            <Line delay={0.3}>
              Leave as a <em className="text-forest italic">neighbour.</em>
            </Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease }}
            className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              Eight small clubs under one roof: reading, supper, strings, cold water, trails and late-night card tables.
              One membership opens every door, and every evening is hosted by someone who lives nearby.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/membership" className={buttonVariants({ size: "lg" })}>
                Request an invitation
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href="/clubs" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Explore the clubs
              </Link>
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="grid max-w-lg grid-cols-3 gap-6 border-t border-ink/15 pt-6"
          >
            {[
              ["8", "clubs under one roof"],
              ["3", "cities, one membership"],
              ["100%", "evenings hosted by members"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-4xl tracking-tight">{value}</dt>
                <dd className="mt-1 text-sm text-ink-soft">{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <Parallax distance={36} className="hidden md:col-span-5 md:block">
          <div className="relative mx-auto h-[640px] w-full max-w-md">
            {featuredClubs.map((club, index) => (
              <motion.div
                key={club.slug}
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5 + index * 0.18, ease }}
                whileHover={{ scale: 1.03 }}
                className={cn("absolute aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl", collagePositions[index])}
              >
                <CoverArt palette={club.palette} motif={club.motif} />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/85 to-transparent p-5 text-paper">
                  <p className="font-display text-xl">{club.name}</p>
                  <p className="text-xs tracking-[0.18em] uppercase text-paper/70">{club.city}</p>
                </div>
              </motion.div>
            ))}

            <div className="absolute -left-10 top-4 size-36 rounded-full bg-paper shadow-lg">
              <svg viewBox="0 0 200 200" className="animate-orbit size-full" aria-hidden="true">
                <defs>
                  <path id="hero-badge-path" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
                </defs>
                <text className="fill-ink text-[13px] tracking-[0.2em] uppercase">
                  <textPath href="#hero-badge-path" textLength="470" lengthAdjust="spacing">
                    Gather &middot; Host &middot; Belong &middot; Repeat &middot;
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl leading-none italic">
                  since
                  <br />
                  2019
                </span>
              </div>
            </div>
          </div>
        </Parallax>
      </Container>
    </section>
  );
}
