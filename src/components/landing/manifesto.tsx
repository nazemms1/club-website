"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { manifesto } from "@/data/content";
import { Container, Eyebrow } from "@/components/ui/layout";

function Word({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {children}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 45%"] });

  const allWords = manifesto.flatMap((line) => line.split(" "));
  let wordIndex = 0;

  return (
    <section ref={ref} className="py-32 md:py-44">
      <Container className="grid gap-16 md:grid-cols-12">
        <div className="md:sticky md:top-32 md:col-span-4 md:self-start">
          <Eyebrow>Our house rules</Eyebrow>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-5xl">
            Loosely held, <em className="italic">kept well.</em>
          </h2>
          <p className="mt-6 max-w-xs text-ink-soft">Five lines we return to at every table. Read them slowly.</p>
        </div>

        <div className="flex flex-col gap-12 md:col-span-8">
          {manifesto.map((line) => {
            const words = line.split(" ");
            return (
              <p key={line} className="font-display text-4xl leading-[1.15] tracking-tight md:text-6xl">
                {words.map((word) => {
                  const index = wordIndex++;
                  const start = (index / allWords.length) * 0.75;
                  const end = start + 0.2;
                  return (
                    <Word key={`${word}-${index}`} progress={scrollYProgress} start={start} end={end}>
                      {word}
                    </Word>
                  );
                })}
              </p>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
