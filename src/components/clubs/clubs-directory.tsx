"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { clubs } from "@/data/clubs";
import { ClubCard } from "@/components/club-card";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { inputClass } from "@/components/ui/field";
import type { ClubCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type CategoryFilter = "All" | ClubCategory;

const categories: CategoryFilter[] = ["All", "Arts & Letters", "Food & Wine", "Music", "Wellness", "Outdoors", "Games"];
const cities = ["All cities", "Toronto", "Montréal", "Vancouver"] as const;

export function ClubsDirectory() {
  // The landing page links here with ?category=..., so read it once on mount.
  const searchParams = useSearchParams();
  const requested = searchParams.get("category");
  const initialCategory = categories.find((item) => item === requested) ?? "All";

  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [city, setCity] = useState<(typeof cities)[number]>("All cities");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return clubs.filter((club) => {
      const matchesCategory = category === "All" || club.category === category;
      const matchesCity = city === "All cities" || club.city === city;
      const matchesQuery = `${club.name} ${club.tagline} ${club.category}`.toLowerCase().includes(needle);
      return matchesCategory && matchesCity && matchesQuery;
    });
  }, [category, city, query]);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6 border-y border-mist/80 py-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={item === category}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-all duration-300 active:scale-[0.97]",
                item === category ? "border-forest bg-forest text-paper" : "border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="relative block">
            <span className="sr-only">Search clubs</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, mood or category"
              className={cn(inputClass, "pl-11")}
            />
          </label>
          <label className="block">
            <span className="sr-only">Filter by city</span>
            <select
              value={city}
              onChange={(event) => setCity(event.target.value as (typeof cities)[number])}
              className={cn(inputClass, "appearance-none pr-10")}
            >
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing {filtered.length} of {clubs.length} clubs
        </p>
      </div>

      {filtered.length > 0 ? (
        <RevealGroup className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((club) => (
            <RevealItem key={club.slug}>
              <ClubCard club={club} />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-ink/25 p-12">
          <p className="font-display text-3xl">No clubs match that combination.</p>
          <p className="text-ink-soft">Try another city or clear the search. A new club may be forming near you.</p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setCity("All cities");
              setQuery("");
            }}
            className="underline-sweep mt-2 text-sm font-medium hover:text-clay"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
