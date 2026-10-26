"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { PointerEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export function FinalCta() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 200, damping: 16 });
  const y = useSpring(pointerY, { stiffness: 200, damping: 16 });

  // A magnetic button: the CTA drifts gently towards the pointer.
  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - (rect.left + rect.width / 2)) * 0.25);
    pointerY.set((event.clientY - (rect.top + rect.height / 2)) * 0.25);
  }

  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section className="bg-paper-deep py-32 md:py-44">
      <Container className="flex flex-col items-center gap-12 text-center">
        <Reveal className="flex flex-col items-center gap-12">
          <Eyebrow>Open by invitation</Eyebrow>
          <h2 className="font-display text-[clamp(3rem,8vw,8rem)] leading-[0.92] tracking-[-0.03em] text-balance">
            Your chair is <em className="text-clay italic">already</em> waiting.
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-ink-soft">
            Tell us what you love to do. A host will reply within three working days with an invitation to a first evening.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <motion.div style={{ x, y }}>
            <Link
              href="/membership"
              onPointerMove={handlePointerMove}
              onPointerLeave={reset}
              className={cn(buttonVariants({ size: "lg" }), "h-16 px-10 text-base")}
            >
              Request an invitation
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}
