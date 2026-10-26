"use client";

import Link from "next/link";
import { useState } from "react";
import { Download } from "lucide-react";
import { applications } from "@/data/membership";
import { events } from "@/data/events";
import { getClub } from "@/data/clubs";
import { kpis, membershipGrowth, revenueByTier, rsvpsByCategory } from "@/data/analytics";
import { ChartDataTable, MembershipGrowthChart, RsvpBarChart, TierDonut } from "@/components/charts";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ChartCard } from "@/components/ui/chart-card";
import { PageTitle } from "@/components/ui/page-title";
import { Pill } from "@/components/ui/pill";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { StatTile } from "@/components/ui/stat-tile";
import { rowClass, tableClass, tableWrapClass, tdClass, theadClass, thClass } from "@/components/ui/table";
import { getTier } from "@/lib/membership";
import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";

type Period = "quarter" | "season";

const periodOptions: { value: Period; label: string }[] = [
  { value: "quarter", label: "Last 3 months" },
  { value: "season", label: "Since April" },
];

export function AdminOverview() {
  const { notify } = useApp();
  const [period, setPeriod] = useState<Period>("season");

  const growthSeries = period === "quarter" ? membershipGrowth.slice(-3) : membershipGrowth;
  const firstMonth = growthSeries[0];
  const lastMonth = growthSeries[growthSeries.length - 1];
  const growthInPeriod = lastMonth.members - firstMonth.members;

  const pending = applications.filter((application) => application.status === "pending");
  const upcoming = events
    .filter((event) => event.status === "published")
    .sort((a, b) => a.date.localeCompare(b.date));
  const nearlyFull = upcoming
    .map((event) => ({ event, fill: event.rsvpCount / event.capacity }))
    .filter((item) => item.fill >= 0.8)
    .sort((a, b) => b.fill - a.fill)
    .slice(0, 5);

  const totalRsvps = rsvpsByCategory.reduce((sum, item) => sum + item.rsvps, 0);
  const totalRevenue = revenueByTier.reduce((sum, item) => sum + item.monthly, 0);
  const patrons = revenueByTier[revenueByTier.length - 1];
  const patronRevenueShare = Math.round((patrons.monthly / totalRevenue) * 100);
  const patronMemberShare = Math.round((patrons.members / kpis.activeMembers) * 100);

  return (
    <div className="stagger flex flex-col gap-8">
      <PageTitle
        eyebrow="Overview"
        title="The house, at a glance"
        description="Membership, revenue and bookings across Toronto, Montréal and Vancouver. Every figure is mock data for review."
        actions={
          <>
            <SegmentedControl label="Period" value={period} onChange={setPeriod} options={periodOptions} />
            <Button variant="outline" onClick={() => notify("CSV export queued. It will be emailed to you (mock)")}>
              <Download className="size-4" aria-hidden="true" />
              Export
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Active members" count={kpis.activeMembers} format={formatNumber} tone="up" delta="+67 since September" />
        <StatTile
          label="Monthly recurring revenue"
          count={kpis.monthlyRecurringRevenue}
          format={formatCurrency}
          tone="up"
          delta="+4.1% since September"
        />
        <StatTile label="Attendance rate" count={kpis.attendanceRate} format={(value) => `${Math.round(value)}%`} tone="up" delta="+3 points since September" />
        <StatTile label="Applications waiting" count={pending.length} delta="Average reply in 2.4 days" />
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12">
        <ChartCard
          id="growth"
          className="xl:col-span-8"
          title="Membership growth"
          description="Active members at the end of each month"
          headline={
            <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
              <p className="text-3xl font-semibold tracking-tight">{formatNumber(lastMonth.members)}</p>
              <p className="pb-1 text-sm text-ink-soft">members, up {formatNumber(growthInPeriod)} in this period</p>
            </div>
          }
          table={
            <ChartDataTable
              caption="Membership growth by month"
              columns={["Month", "Members", "Attendance"]}
              rows={growthSeries.map((item) => [item.month, formatNumber(item.members), `${item.attendance}%`])}
            />
          }
          footer={`Attendance in ${lastMonth.month}: ${lastMonth.attendance}% of members came to at least one evening`}
        >
          <MembershipGrowthChart data={growthSeries} />
        </ChartCard>

        <ChartCard
          id="tiers"
          className="xl:col-span-4"
          title="Revenue by tier"
          description="Monthly recurring revenue"
          table={
            <ChartDataTable
              caption="Monthly recurring revenue by tier"
              columns={["Tier", "Members", "Revenue"]}
              rows={revenueByTier.map((item) => [item.tier, formatNumber(item.members), formatCurrency(item.monthly)])}
            />
          }
          footer={`Patrons bring ${patronRevenueShare}% of revenue from ${patronMemberShare}% of members`}
        >
          <TierDonut data={revenueByTier} />
        </ChartCard>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12">
        <ChartCard
          id="rsvps"
          className="xl:col-span-7"
          title="RSVPs by category"
          description="Year to date, all clubs"
          headline={
            <p className="text-3xl font-semibold tracking-tight">
              {formatNumber(totalRsvps)} <span className="text-sm font-normal text-ink-soft">RSVPs</span>
            </p>
          }
          table={
            <ChartDataTable
              caption="RSVPs by category, year to date"
              columns={["Category", "RSVPs", "Share"]}
              rows={rsvpsByCategory.map((item) => [item.category, formatNumber(item.rsvps), `${Math.round((item.rsvps / totalRsvps) * 100)}%`])}
            />
          }
          footer="Arts & Letters and Food & Wine account for almost half of all RSVPs"
        >
          <RsvpBarChart data={rsvpsByCategory} />
        </ChartCard>

        <Card className="xl:col-span-5">
          <CardHeader
            title="Capacity alerts"
            description="Evenings at 80% of capacity or more"
            action={
              <Link href="/admin/events" className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
                Manage events
              </Link>
            }
          />
          {nearlyFull.length > 0 ? (
            <ul className="flex flex-col divide-y divide-mist/70">
              {nearlyFull.map(({ event, fill }) => {
                const club = event.clubSlug ? getClub(event.clubSlug) : undefined;
                const percent = Math.min(100, Math.round(fill * 100));
                const soldOut = fill >= 1;
                return (
                  <li key={event.slug} className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate font-medium">{event.title}</p>
                        <p className="text-xs text-ink-soft">
                          {formatDate(event.date, { weekday: "short", month: "short", day: "numeric" })} &middot; {club?.name ?? "House event"}
                        </p>
                      </div>
                      <Pill tone={soldOut ? "clay" : "brass"}>{soldOut ? "Sold out" : `${percent}% full`}</Pill>
                    </div>
                    <div
                      className="h-1.5 overflow-hidden rounded-full bg-paper-deep"
                      role="progressbar"
                      aria-label={`${event.title}: seats filled`}
                      aria-valuemin={0}
                      aria-valuemax={event.capacity}
                      aria-valuenow={event.rsvpCount}
                    >
                      <div className={cn("h-full rounded-full", soldOut ? "bg-clay" : "bg-forest")} style={{ width: `${percent}%` }} />
                    </div>
                    <p className="text-xs text-ink-soft">
                      {event.rsvpCount} of {event.capacity} seats
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-ink-soft">No evenings are close to capacity.</p>
          )}
        </Card>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <CardHeader
            title="Upcoming evenings"
            description="Published events and seats sold"
            action={
              <Link href="/admin/events" className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
                All events
              </Link>
            }
          />
          <div className={tableWrapClass}>
            <table className={tableClass}>
              <thead className={theadClass}>
                <tr>
                  <th scope="col" className={thClass}>Evening</th>
                  <th scope="col" className={thClass}>Date</th>
                  <th scope="col" className={thClass}>Seats</th>
                  <th scope="col" className={thClass}>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.slice(0, 5).map((event) => {
                  const fill = event.rsvpCount / event.capacity;
                  return (
                    <tr key={event.slug} className={rowClass}>
                      <td className={tdClass}>
                        <p className="font-medium">{event.title}</p>
                        <p className="text-xs text-ink-soft">{event.venue}</p>
                      </td>
                      <td className={cn(tdClass, "whitespace-nowrap")}>{formatDate(event.date, { month: "short", day: "numeric" })}</td>
                      <td className={cn(tdClass, "tabular-nums")}>
                        {event.rsvpCount} / {event.capacity}
                      </td>
                      <td className={tdClass}>
                        <Pill tone={fill >= 1 ? "clay" : fill >= 0.8 ? "brass" : "forest"}>
                          {fill >= 1 ? "Sold out" : fill >= 0.8 ? "Almost full" : "Open"}
                        </Pill>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="xl:col-span-5">
          <CardHeader
            title="Waiting for a reply"
            description={`${pending.length} applications to review`}
            action={
              <Link href="/admin/applications" className="text-sm text-ink-soft underline underline-offset-4 hover:text-ink">
                Open queue
              </Link>
            }
          />
          <ul className="flex flex-col divide-y divide-mist/70">
            {pending.slice(0, 5).map((application) => (
              <li key={application.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-medium">{application.name}</p>
                  <p className="truncate text-xs text-ink-soft">
                    {application.city} &middot; {application.interests.join(", ")}
                  </p>
                </div>
                <Pill tone="muted">{getTier(application.requestedTier).name}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
