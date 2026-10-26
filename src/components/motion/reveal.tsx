"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, margin: "-60px" } as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const cascade: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

/** Fades a block up once it scrolls into view. Use it on every section so scroll motion is consistent. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: rise.hidden, show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } } }}
    >
      {children}
    </motion.div>
  );
}

/** Parent for RevealItem children. Items cascade in one after another as the group scrolls into view. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={viewport} variants={cascade}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  if (as === "li") {
    return (
      <motion.li className={className} variants={rise}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div className={className} variants={rise}>
      {children}
    </motion.div>
  );
}
