"use client";

import { useState, type ReactNode } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";

interface ChartCardProps {
  id: string;
  title: string;
  description?: string;
  /** Hero figure shown above the plot, e.g. the latest total. */
  headline?: ReactNode;
  children: ReactNode;
  /** Table twin of the chart, so every value is readable without hovering. */
  table: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function ChartCard({ id, title, description, headline, children, table, footer, className }: ChartCardProps) {
  const [view, setView] = useState<"chart" | "table">("chart");
  const headingId = `${id}-heading`;

  return (
    <Card aria-labelledby={headingId} className={`flex flex-col ${className ?? ""}`}>
      <CardHeader
        titleId={headingId}
        title={title}
        description={description}
        action={
          <SegmentedControl<"chart" | "table">
            label={`${title} view`}
            size="sm"
            value={view}
            onChange={setView}
            options={[
              { value: "chart", label: "Chart" },
              { value: "table", label: "Table" },
            ]}
          />
        }
      />
      {headline ? <div className="mb-6">{headline}</div> : null}
      <div className="min-w-0 flex-1">{view === "chart" ? children : table}</div>
      {footer ? <div className="mt-6 border-t border-mist/70 pt-5 text-sm text-ink-soft">{footer}</div> : null}
    </Card>
  );
}
