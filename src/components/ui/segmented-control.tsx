"use client";

import { cn } from "@/lib/utils";

interface SegmentedControlProps<T extends string> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({ label, options, value, onChange, size = "md" }: SegmentedControlProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-mist bg-white/70 p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full transition-colors",
              size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm",
              active ? "bg-forest text-paper" : "text-ink-soft hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
