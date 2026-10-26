import type { ComponentProps, ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10", className)} {...props} />;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-xs font-medium uppercase tracking-[0.22em] text-clay", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal className={cn("flex max-w-3xl flex-col gap-5", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">{title}</h2>
      {description ? <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">{description}</p> : null}
    </Reveal>
  );
}
