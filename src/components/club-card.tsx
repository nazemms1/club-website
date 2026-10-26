import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CoverArt } from "@/components/cover-art";
import { categoryIcons } from "@/lib/icons";
import { getTier } from "@/lib/membership";
import type { Club } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

export function ClubCard({ club }: { club: Club }) {
  const Icon = categoryIcons[club.category];

  return (
    <Link href={`/clubs/${club.slug}`} className="group flex flex-col gap-5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
          <CoverArt palette={club.palette} motif={club.motif} />
        </div>
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <span className="flex items-center gap-2 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur">
            <Icon className="size-3.5" aria-hidden="true" />
            {club.category}
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-paper/90 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl tracking-tight">{club.name}</h3>
          <span className="shrink-0 text-sm text-ink-soft">{club.city}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-ink-soft">{club.tagline}</p>
        <p className="pt-1 text-xs uppercase tracking-[0.16em] text-ink-soft/80">
          {formatNumber(club.memberCount)} members &middot; {getTier(club.requiredTier).name} and up
        </p>
      </div>
    </Link>
  );
}
