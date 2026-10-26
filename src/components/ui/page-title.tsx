import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/layout";

/** Title block for workspace pages. Same scale on every dashboard and staff page. */
export function PageTitle({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex min-w-0 flex-col gap-3">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="font-display text-3xl tracking-tight md:text-4xl">{title}</h1>
        {description ? <p className="max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-3">{actions}</div> : null}
    </div>
  );
}
