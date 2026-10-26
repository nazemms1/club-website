"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { clubs } from "@/data/clubs";
import { CoverArt } from "@/components/cover-art";
import { Container, SectionHeading } from "@/components/ui/layout";
import { getCategoryIcon } from "@/lib/icons";
import type { ClubCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const categories: ClubCategory[] = ["Arts & Letters", "Food & Wine", "Music", "Wellness", "Outdoors", "Games"];

/** Expanding panels: hover or focus a room to open it. Works with touch via tap. */
export function Rooms() {
  const [active, setActive] = useState<ClubCategory>("Arts & Letters");

  return (
    <section className="border-y border-mist/80 bg-paper-deep/60 py-28 md:py-36">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Choose a room"
            title={
              <>
                Six kinds of table. <em className="italic">One door.</em>
              </>
            }
          />
          <p className="max-w-xs text-sm text-ink-soft">Hover or tap a room to open it. Each one has its own hosts, rhythm and house rule.</p>
        </div>

        <div className="flex h-[720px] flex-col gap-3 md:h-[520px] md:flex-row">
          {categories.map((category) => {
            const club = clubs.find((item) => item.category === category);
            if (!club) return null;
            const isActive = category === active;
            const Icon = getCategoryIcon(category);

            return (
              <div
                key={category}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => setActive(category)}
                onFocus={() => setActive(category)}
                onClick={() => setActive(category)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActive(category);
                  }
                }}
                style={{ flexGrow: isActive ? 5 : 1 }}
                className="group relative basis-0 min-h-0 min-w-0 cursor-pointer overflow-hidden rounded-3xl transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <div className={cn("absolute inset-0 transition-[filter] duration-700", isActive ? "" : "saturate-50")}>
                  <CoverArt palette={club.palette} motif={club.motif} />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden="true" />

                {!isActive ? (
                  <span className="absolute inset-0 flex items-center justify-center md:items-end md:pb-8">
                    <span className="font-display text-2xl text-paper md:text-3xl md:rotate-180 md:[writing-mode:vertical-rl]">
                      {category}
                    </span>
                  </span>
                ) : null}

                <div
                  className={cn(
                    "absolute inset-x-0 bottom-0 flex flex-col gap-4 p-7 text-paper transition-all duration-700 md:p-9",
                    isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                  )}
                >
                  <span className="flex size-11 items-center justify-center rounded-full border border-paper/40">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-display text-4xl leading-none tracking-tight md:text-5xl">{club.name}</p>
                  <p className="max-w-md text-paper/80">{club.tagline}</p>
                  <Link
                    href={`/clubs?category=${encodeURIComponent(category)}`}
                    className="mt-2 inline-flex w-fit items-center gap-2 border-b border-paper/50 pb-1 text-sm transition-colors hover:border-brass hover:text-brass"
                  >
                    Explore {category}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
