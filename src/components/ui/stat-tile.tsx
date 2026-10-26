import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Tone = "up" | "down" | "flat";

const deltaIcons = { up: ArrowUpRight, down: ArrowDownRight, flat: Minus } as const;

const deltaTones: Record<Tone, string> = {
  up: "bg-forest/10 text-forest",
  down: "bg-clay/15 text-clay",
  flat: "bg-paper-deep text-ink-soft",
};

/**
 * A KPI tile. Pass `count` to animate the number up when it appears; `value` is used for text such as currency.
 * Hover changes the shadow only, because transforms would fight the staggered entrance animation.
 */
export function StatTile({
  label,
  value,
  count,
  format,
  delta,
  tone = "flat",
  icon,
}: {
  label: string;
  value?: string;
  count?: number;
  format?: (value: number) => string;
  delta?: string;
  tone?: Tone;
  icon?: ReactNode;
}) {
  const DeltaIcon = deltaIcons[tone];

  return (
    <Card className="flex flex-col gap-5 p-6 transition-shadow duration-500 hover:shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">{label}</p>
        {icon ? <span className="text-ink-soft">{icon}</span> : null}
      </div>
      <p className="text-3xl font-semibold tracking-tight">
        {count !== undefined ? <CountUp value={count} format={format} /> : value}
      </p>
      {delta ? (
        <p className={cn("inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", deltaTones[tone])}>
          <DeltaIcon className="size-3.5" aria-hidden="true" />
          {delta}
        </p>
      ) : null}
    </Card>
  );
}
