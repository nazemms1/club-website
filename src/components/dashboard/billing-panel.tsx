"use client";

import { useState } from "react";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { rowClass, tableClass, tableWrapClass, tdClass, theadClass, thClass } from "@/components/ui/table";
import { invoices } from "@/data/analytics";
import { tiers } from "@/data/membership";
import { getTier } from "@/lib/membership";
import type { TierId } from "@/lib/types";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export function BillingPanel() {
  const { user, updateUser, notify } = useApp();
  const [pendingTier, setPendingTier] = useState<TierId | null>(null);
  if (!user) return null;

  const current = getTier(user.tierId);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 xl:grid-cols-12">
        <section className="flex flex-col gap-6 rounded-3xl bg-forest p-7 text-paper shadow-sm md:p-9 xl:col-span-7">
          <p className="text-xs font-medium tracking-[0.18em] text-brass uppercase">Current plan</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="font-display text-4xl tracking-tight">{current.name}</p>
            <p className="text-2xl font-semibold tracking-tight">
              {formatCurrency(current.monthly)}
              <span className="ml-2 text-sm font-normal text-paper/60">/ month</span>
            </p>
          </div>
          <p className="text-sm text-paper/75">
            Next payment on {formatDate("2026-11-01", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <ul className="grid gap-3 text-sm text-paper/85 sm:grid-cols-2">
            {current.perks.map((perk) => (
              <li key={perk} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brass" />
                {perk}
              </li>
            ))}
          </ul>
        </section>

        <Card className="flex flex-col xl:col-span-5">
          <CardHeader title="Payment method" description="Used for monthly dues and guest tickets" />
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-mist/80 bg-white/60 p-5">
            <div>
              <p className="font-medium">Visa ending 0198</p>
              <p className="text-sm text-ink-soft">Expires 08 / 2029</p>
            </div>
            <Pill tone="forest">Default</Pill>
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <Button variant="outline" size="sm" onClick={() => notify("A secure update link has been sent to your email (mock)")}>
              Update card
            </Button>
            <Button variant="ghost" size="sm" onClick={() => notify("Pause request logged for review (mock)")}>
              Pause membership
            </Button>
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="Change plan" description="Upgrades apply straight away. Downgrades start on your next billing date." />
        <div className="grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => {
            const isCurrent = tier.id === user.tierId;
            const isPending = pendingTier === tier.id;
            return (
              <div
                key={tier.id}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border p-6 transition-colors",
                  isCurrent ? "border-forest bg-white" : "border-mist/80 bg-white/50",
                )}
              >
                <div className="flex items-center justify-between">
                  <p className="font-display text-2xl">{tier.name}</p>
                  {isCurrent ? <Pill tone="forest">Current</Pill> : null}
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{tier.tagline}</p>
                <p className="text-2xl font-semibold tracking-tight">
                  {formatCurrency(tier.monthly)}
                  <span className="ml-1 text-sm font-normal text-ink-soft">/ month</span>
                </p>
                <div className="mt-auto pt-2">
                  {isCurrent ? (
                    <Button variant="ghost" size="sm" disabled>
                      Your current plan
                    </Button>
                  ) : isPending ? (
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        onClick={() => {
                          updateUser({ tierId: tier.id });
                          setPendingTier(null);
                          notify(`Plan changed to ${tier.name}`);
                        }}
                      >
                        Confirm
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setPendingTier(null)}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => setPendingTier(tier.id)}>
                      Switch to {tier.name}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader title="Invoices" description="Paid in full" />
        <div className={tableWrapClass}>
          <table className={tableClass}>
            <thead className={theadClass}>
              <tr>
                <th scope="col" className={thClass}>Invoice</th>
                <th scope="col" className={thClass}>Date</th>
                <th scope="col" className={thClass}>Description</th>
                <th scope="col" className={cn(thClass, "text-right")}>Amount</th>
                <th scope="col" className={thClass}>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className={rowClass}>
                  <td className={cn(tdClass, "font-mono text-xs")}>{invoice.id}</td>
                  <td className={cn(tdClass, "whitespace-nowrap")}>{formatDate(invoice.date, { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className={tdClass}>{invoice.description}</td>
                  <td className={cn(tdClass, "text-right tabular-nums")}>{formatCurrency(invoice.amount)}</td>
                  <td className={tdClass}>
                    <Pill tone="forest">{invoice.status}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
