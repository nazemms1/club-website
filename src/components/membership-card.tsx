"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { cn } from "@/lib/utils";

interface MembershipCardProps {
  name: string;
  tierName: string;
  city: string;
  memberNumber: string;
  className?: string;
}

/** A 3D-tilting membership card that follows the pointer. Purely decorative, with mock data. */
export function MembershipCard({ name, tierName, city, memberNumber, className }: MembershipCardProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 160, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 160, damping: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-11, 11]);
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(244,239,230,0.22), transparent 55%)`;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div className={cn("w-full max-w-md", className)} style={{ perspective: 1200 }} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[1.586/1] w-full overflow-hidden rounded-[22px] text-paper shadow-[0_40px_80px_-30px_rgba(19,40,32,0.6)]"
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #1d3a2f 0%, #132820 60%, #0b1812 100%)" }}
        />
        <motion.div className="absolute inset-0" style={{ background: glare }} />
        <div className="absolute inset-0 flex flex-col justify-between p-7">
          <div className="flex items-start justify-between">
            <p className="font-display text-xl tracking-tight">
              Maison <em className="italic">Commune</em>
            </p>
            <p className="text-[11px] uppercase tracking-[0.25em] text-brass">{tierName}</p>
          </div>
          <p className="font-mono text-sm tracking-[0.3em] text-paper/70">{memberNumber}</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-display text-2xl">{name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-paper/60">{city}</p>
            </div>
            <div className="size-10 rounded-full border border-brass/70" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
