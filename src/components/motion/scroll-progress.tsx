"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A slim brass line at the top of the public site that shows how far the reader has scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brass" />;
}
