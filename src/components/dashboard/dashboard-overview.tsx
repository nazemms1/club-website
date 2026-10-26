"use client";

import Link from "next/link";
import { CalendarDays, Gift, Sparkles, Users } from "lucide-react";
import { useApp } from "@/components/providers/app-provider";
import { clubs, getClub } from "@/data/clubs";
import { memberActivity } from "@/data/analytics";
import { events } from "@/data/events";
import { getMember } from "@/data/members";
import { TODAY } from "@/data/content";
import { CoverArt } from "@/components/cover-art";
import { ChartDataTable, VisitsSparkline } from "@/components/charts";
import { MembershipCard } from "@/components/membership-card";
import { MonthCalendar } from "@/components/dashboard/month-calendar";
import { Card, CardHeader } from "@/components/ui/card";
import { ChartCard } from "@/components/ui/chart-card";
import { PageTitle } from "@/components/ui/page-title";
import { Pill } from "@/components/ui/pill";
import { StatTile } from "@/components/ui/stat-tile";
import { buttonVariants } from "@/components/ui/button";
import { rowClass, tableClass, tableWrapClass, tdClass, theadClass, thClass } from "@/components/ui/table";
import { getTier, hasTier } from "@/lib/membership";
import type { ClubEvent, TierId } from "@/lib/types";
import { cn, formatCurrency, formatDate, formatTime } from "@/lib/utils";

// Guest passes per calendar month by tier.
const guestPassAllowance: Record<TierId, number> = { associate: 0, member: 0, patron: 2 };
const passesUsedThisMonth = 1;

const activity = [
  { time: "Today, 9:12 AM", text: "RSVP confirmed for Sauna and Soup", dot: "bg-forest" },
  { time: "Yesterday, 6:40 PM", text: "Invoice INV-2026-10 paid, $79.00", dot: "bg-brass" },
  { time: "Sat, 24 Oct", text: "Joined Cold Water Club", dot: "bg-forest" },
  { time: "Thu, 22 Oct", text: "Guest pass used for Chamber Night", dot: "bg-clay" },
];

function isEvent(value: ClubEvent | undefined): value is ClubEvent {
  return value !== undefined;
}

function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

export function DashboardOverview() {
  const { user, rsvps, joined, toggleRsvp, toggleClub, notify } = useApp();
  if (!user) return null;

  const tier = getTier(user.tierId);
  const firstName = user.name.split(" ")[0];
  const booked = rsvps
    .map((slug) => events.find((event) => event.slug === slug))
    .filter(isEvent)
    .sort((a, b) => a.date.localeCompare(b.date));
  const nextUp = booked[0];
  const nextClub = nextUp?.clubSlug ? getClub(nextUp.clubSlug) : undefined;
  const nextHost = nextUp ? getMember(nextUp.hostId) : undefined;
  const daysToNext = nextUp ? daysBetween(TODAY, nextUp.date) : 0;

  const myClubs = clubs.filter((club) => joined.includes(club.slug));
  const suggested = clubs.filter((club) => !joined.includes(club.slug) && hasTier(user.tierId, club.requiredTier)).slice(0, 3);
  const passesLeft = Math.max(0, guestPassAllowance[user.tierId] - passesUsedThisMonth);

  const sixWeekVisits = memberActivity.reduce((sum, week) => sum + week.visits, 0);
  const averageVisits = (sixWeekVisits / memberActivity.length).toFixed(1);

  const novemberMarks = events
    .filter((event) => event.status === "published" && event.date.startsWith("2026-11"))
    .map((event) => ({ date: event.date, tone: rsvps.includes(event.slug) ? ("booked" as const) : ("open" as const) }));

  return (
    <div className="stagger flex flex-col gap-8">
      <PageTitle
        eyebrow="Overview"
        title={`Welcome back, ${firstName}.`}
        description={`${formatDate(TODAY, { weekday: "long", month: "long", day: "numeric", year: "numeric" })} · ${tier.name} member in Toronto`}
        actions={
          <>
            <Link href="/events" className={buttonVariants({ variant: "outline" })}>
              Browse events
            </Link>
            <Link href="/services" className={buttonVariants({})}>
              Book a service
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Evenings booked"
          count={booked.length}
          delta={nextUp ? `Next on ${formatDate(nextUp.date, { month: "short", day: "numeric" })}` : "Nothing booked yet"}
          icon={<CalendarDays className="size-4" aria-hidden="true" />}
        />
        <StatTile
          label="Clubs joined"
          count={myClubs.length}
          delta={`${new Set(myClubs.map((club) => club.city)).size} cities`}
          icon={<Users className="size-4" aria-hidden="true" />}
        />
        <StatTile
          label="Visits, last six weeks"
          count={sixWeekVisits}
          tone="up"
          delta="+12% on the six weeks before"
          icon={<Sparkles className="size-4" aria-hidden="true" />}
        />
        <StatTile
          label="Guest passes left"
          count={passesLeft}
          delta={tier.id === "patron" ? "Resets 1 November" : "Included with Patron"}
          icon={<Gift className="size-4" aria-hidden="true" />}
        />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12">
        {nextUp ? (
          <section aria-labelledby="next-up-heading" className="relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-forest p-7 text-paper shadow-sm md:p-9 xl:col-span-7">
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-4">
                <p className="text-xs font-medium tracking-[0.18em] text-brass uppercase">
                  Next up &middot; in {daysToNext} {daysToNext === 1 ? "day" : "days"}
                </p>
                <h2 id="next-up-heading" className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
                  {nextUp.title}
                </h2>
                <p className="text-sm text-paper/70">{nextClub?.name ?? "Maison Commune house event"}</p>
              </div>
              {nextClub ? (
                <div className="hidden size-28 shrink-0 overflow-hidden rounded-2xl sm:block">
                  <CoverArt palette={nextClub.palette} motif={nextClub.motif} />
                </div>
              ) : null}
            </div>

            <dl className="grid gap-5 text-sm sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <dt className="text-paper/60">When</dt>
                <dd className="font-medium">
                  {formatDate(nextUp.date, { weekday: "short", month: "short", day: "numeric" })} &middot; {formatTime(nextUp.time)}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-paper/60">Where</dt>
                <dd className="font-medium">{nextUp.venue}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-paper/60">Host</dt>
                <dd className="font-medium">{nextHost?.name ?? "House team"}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <Link href={`/events/${nextUp.slug}`} className={buttonVariants({ variant: "inverse" })}>
                View evening
              </Link>
              <button
                type="button"
                onClick={() => {
                  toggleRsvp(nextUp.slug);
                  notify("RSVP cancelled");
                }}
                className="inline-flex h-11 items-center rounded-full border border-paper/30 px-5 text-sm transition-colors hover:bg-paper/10"
              >
                Cancel RSVP
              </button>
            </div>
          </section>
        ) : (
          <Card className="flex flex-col justify-center gap-3 xl:col-span-7">
            <p className="font-display text-2xl">No evenings booked yet</p>
            <p className="text-sm text-ink-soft">Pick an evening from the calendar and it will appear here.</p>
          </Card>
        )}

        <div className="flex flex-col gap-6 xl:col-span-5">
          <MembershipCard name={user.name} tierName={tier.name} city="Toronto" memberNumber="MC  0412  2026" />
          <Card>
            <CardHeader title="Membership" description={`${tier.name} plan`} />
            <dl className="flex flex-col divide-y divide-mist/70 text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-soft">Monthly fee</dt>
                <dd className="font-medium">{formatCurrency(tier.monthly)}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-soft">Next payment</dt>
                <dd className="font-medium">{formatDate("2026-11-01", { day: "numeric", month: "short", year: "numeric" })}</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-ink-soft">Guest passes</dt>
                <dd className="font-medium">{guestPassAllowance[user.tierId] > 0 ? `${passesLeft} of ${guestPassAllowance[user.tierId]} left` : "Patron only"}</dd>
              </div>
            </dl>
            <Link href="/dashboard/billing" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4")}>
              Manage membership
            </Link>
          </Card>
        </div>

        <Card className="xl:col-span-7">
          <CardHeader
            title="Upcoming reservations"
            description="Confirmed evenings and the price you pay"
            action={
              <Link href="/events" className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
                All events
              </Link>
            }
          />
          {booked.length > 0 ? (
            <div className={tableWrapClass}>
              <table className={tableClass}>
                <thead className={theadClass}>
                  <tr>
                    <th scope="col" className={thClass}>Evening</th>
                    <th scope="col" className={thClass}>When</th>
                    <th scope="col" className={cn(thClass, "text-right")}>Price</th>
                    <th scope="col" className={thClass}>Status</th>
                    <th scope="col" className={cn(thClass, "text-right")}>
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {booked.map((event) => (
                    <tr key={event.slug} className={rowClass}>
                      <td className={tdClass}>
                        <Link href={`/events/${event.slug}`} className="font-medium hover:text-clay">
                          {event.title}
                        </Link>
                        <p className="text-xs text-ink-soft">{event.venue}</p>
                      </td>
                      <td className={cn(tdClass, "whitespace-nowrap")}>
                        {formatDate(event.date, { weekday: "short", month: "short", day: "numeric" })}
                        <span className="block text-xs text-ink-soft">{formatTime(event.time)}</span>
                      </td>
                      <td className={cn(tdClass, "text-right whitespace-nowrap tabular-nums")}>{formatCurrency(event.price)}</td>
                      <td className={tdClass}>
                        <Pill tone="forest">Confirmed</Pill>
                      </td>
                      <td className={cn(tdClass, "text-right")}>
                        <button
                          type="button"
                          onClick={() => {
                            toggleRsvp(event.slug);
                            notify("RSVP cancelled");
                          }}
                          className="text-sm text-ink-soft underline underline-offset-4 hover:text-clay"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">No reservations yet.</p>
          )}
        </Card>

        <Card className="xl:col-span-5">
          <CardHeader title="November at a glance" description="Your bookings and open evenings" />
          <MonthCalendar label="November 2026" year={2026} month={10} marks={novemberMarks} />
        </Card>

        <ChartCard
          id="visits"
          className="xl:col-span-4"
          title="Visits per week"
          description="Last six weeks"
          headline={
            <p className="text-3xl font-semibold tracking-tight">
              {sixWeekVisits} <span className="text-sm font-normal text-ink-soft">visits</span>
            </p>
          }
          table={
            <ChartDataTable
              caption="Visits per week, last six weeks"
              columns={["Week", "Visits"]}
              rows={memberActivity.map((week) => [week.week, week.visits])}
            />
          }
          footer={`Average ${averageVisits} visits a week`}
        >
          <VisitsSparkline data={memberActivity} />
        </ChartCard>

        <Card className="xl:col-span-4">
          <CardHeader
            title="My clubs"
            description="Clubs you belong to"
            action={
              <Link href="/clubs" className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
                Browse
              </Link>
            }
          />
          {myClubs.length > 0 ? (
            <ul className="flex flex-col divide-y divide-mist/70">
              {myClubs.map((club) => (
                <li key={club.slug} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="size-12 shrink-0 overflow-hidden rounded-2xl">
                    <CoverArt palette={club.palette} motif={club.motif} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/clubs/${club.slug}`} className="block truncate font-medium hover:text-clay">
                      {club.name}
                    </Link>
                    <p className="truncate text-xs text-ink-soft">{club.schedule}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      toggleClub(club.slug);
                      notify(`You have left ${club.name}`);
                    }}
                    className="shrink-0 text-xs text-ink-soft underline underline-offset-4 hover:text-clay"
                  >
                    Leave
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft">You have not joined a club yet.</p>
          )}
        </Card>

        <Card className="xl:col-span-4">
          <CardHeader title="Recent activity" description="Across your account" />
          <ol className="flex flex-col gap-5">
            {activity.map((item) => (
              <li key={item.text} className="flex gap-4">
                <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", item.dot)} aria-hidden="true" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm">{item.text}</p>
                  <p className="text-xs text-ink-soft">{item.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>

      {suggested.length > 0 ? (
        <section aria-labelledby="suggested-heading" className="flex flex-col gap-5">
          <h2 id="suggested-heading" className="text-base font-semibold tracking-tight">
            Suggested for you
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {suggested.map((club) => (
              <Link
                key={club.slug}
                href={`/clubs/${club.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-mist/80 bg-white/70 shadow-sm transition-transform duration-500 hover:-translate-y-0.5"
              >
                <div className="h-32 overflow-hidden">
                  <div className="h-full transition-transform duration-700 group-hover:scale-105">
                    <CoverArt palette={club.palette} motif={club.motif} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="font-display text-xl tracking-tight">{club.name}</p>
                  <p className="text-sm leading-relaxed text-ink-soft">{club.tagline}</p>
                  <span className="mt-auto pt-3 text-sm font-medium text-clay">View club</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
