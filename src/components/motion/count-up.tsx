"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  className?: string;
}

/**
 * Counts from zero to the value once it is on screen. The server markup already shows the final
 * number, so the page reads correctly even before JavaScript runs.
 */
export function CountUp({ value, format = (number) => String(Math.round(number)), duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(value);
  const display = useTransform(count, (latest) => format(latest));

  useEffect(() => {
    if (!inView) return;
    count.set(0);
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
