import type { ReactNode } from "react";
import { CoverArt } from "@/components/cover-art";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn } from "@/lib/utils";
import type { CoverMotif, Palette } from "@/lib/types";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
  art?: { palette: Palette; motif: CoverMotif };
  className?: string;
}

/** Shared header for internal pages. Text rises in line by line, and the artwork drifts slowly against the scroll. */
export function PageHero({ eyebrow, title, description, aside, art, className }: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-28", className)}>
      <Container className="grid items-end gap-12 md:grid-cols-12">
        <div className="flex flex-col gap-7 md:col-span-7">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-5xl leading-[0.98] tracking-tight text-balance md:text-7xl">{title}</h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.16}>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{description}</p>
            </Reveal>
          ) : null}
          {aside ? (
            <Reveal delay={0.24}>
              <div className="pt-2">{aside}</div>
            </Reveal>
          ) : null}
        </div>

        {art ? (
          <Parallax className="hidden md:col-span-5 md:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <CoverArt palette={art.palette} motif={art.motif} />
            </div>
          </Parallax>
        ) : null}
      </Container>
    </section>
  );
}
