import { cn, initials } from "@/lib/utils";

export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-forest font-display text-paper",
        size === "sm" && "size-8 text-xs",
        size === "md" && "size-11 text-sm",
        size === "lg" && "size-16 text-xl",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
