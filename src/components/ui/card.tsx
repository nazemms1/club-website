import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The one surface style used by every dashboard panel and chart card. */
export function Card({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("rounded-3xl border border-mist/80 bg-white/70 p-6 shadow-sm md:p-7", className)} {...props} />;
}

export function CardHeader({
  title,
  description,
  action,
  titleId,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  titleId?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 id={titleId} className="text-base font-semibold tracking-tight">
          {title}
        </h2>
        {description ? <p className="text-sm text-ink-soft">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}
