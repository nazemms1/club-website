"use client";

import { useMemo, useState } from "react";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { getTier } from "@/lib/membership";
import type { Application, ApplicationStatus } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Filter = "all" | ApplicationStatus;

const statusTone: Record<ApplicationStatus, "brass" | "forest" | "muted"> = {
  pending: "brass",
  approved: "forest",
  declined: "muted",
};

export function ApplicationsQueue({ initial }: { initial: Application[] }) {
  const { notify } = useApp();
  const [items, setItems] = useState<Application[]>(initial);
  const [filter, setFilter] = useState<Filter>("pending");

  const counts = useMemo(
    () => ({
      pending: items.filter((item) => item.status === "pending").length,
      approved: items.filter((item) => item.status === "approved").length,
      declined: items.filter((item) => item.status === "declined").length,
      all: items.length,
    }),
    [items],
  );

  const visible = items.filter((item) => filter === "all" || item.status === filter);

  function setStatus(id: string, status: ApplicationStatus) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl<Filter>
        label="Filter applications"
        value={filter}
        onChange={setFilter}
        options={[
          { value: "pending", label: `Pending ${counts.pending}` },
          { value: "approved", label: `Approved ${counts.approved}` },
          { value: "declined", label: `Declined ${counts.declined}` },
          { value: "all", label: `All ${counts.all}` },
        ]}
      />

      {visible.length === 0 ? (
        <Card className="text-ink-soft">Nothing in this view. The queue is clear.</Card>
      ) : null}

      <ul className="grid gap-5 xl:grid-cols-2">
        {visible.map((application) => (
          <li key={application.id}>
            <Card className="flex h-full flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold tracking-tight">{application.name}</p>
                  <p className="truncate text-sm text-ink-soft">
                    {application.city} &middot; {application.email}
                  </p>
                </div>
                <Pill tone={statusTone[application.status]} className="capitalize">
                  {application.status}
                </Pill>
              </div>

              <div className="flex flex-wrap gap-2">
                <Pill tone="neutral">{getTier(application.requestedTier).name}</Pill>
                {application.interests.map((interest) => (
                  <Pill key={interest} tone="muted">
                    {interest}
                  </Pill>
                ))}
              </div>

              <blockquote className="border-l-2 border-brass pl-4 text-sm leading-relaxed text-ink-soft">{application.statement}</blockquote>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-mist/70 pt-5 text-sm text-ink-soft">
                <p>
                  Submitted {formatDate(application.submittedOn, { day: "numeric", month: "short" })}
                  {application.referredBy ? <> &middot; referred by {application.referredBy}</> : null}
                </p>
                {application.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setStatus(application.id, "declined");
                        notify(`${application.name} has been declined. A kind note is queued`);
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setStatus(application.id, "approved");
                        notify(`${application.name} approved. Welcome note queued`);
                      }}
                    >
                      Approve
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setStatus(application.id, "pending")}>
                    Move back to pending
                  </Button>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
