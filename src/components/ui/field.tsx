import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "h-12 w-full rounded-xl border border-mist bg-white/70 px-4 text-[15px] text-ink placeholder:text-ink-soft/60 transition focus:border-forest focus:bg-white focus:outline-none";

export const textareaClass =
  "min-h-28 w-full rounded-xl border border-mist bg-white/70 px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/60 transition focus:border-forest focus:bg-white focus:outline-none";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? (
        <span role="alert" className="text-sm text-clay">
          {error}
        </span>
      ) : null}
    </label>
  );
}
