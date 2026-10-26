import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-paper-deep text-ink",
  forest: "bg-forest/10 text-forest",
  brass: "bg-brass/20 text-ink",
  clay: "bg-clay/15 text-clay",
  muted: "border border-ink/15 text-ink-soft",
} as const;

export function Pill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: keyof typeof tones;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap", tones[tone], className)}>
      {children}
    </span>
  );
}
