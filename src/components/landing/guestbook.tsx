"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/membership";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export function Guestbook() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % total), 7000);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  const testimonial = testimonials[index];

  return (
    <section className="py-32 md:py-40" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <Container className="flex flex-col gap-16">
        <div className="flex items-center justify-between gap-6">
          <Eyebrow>From the guest book</Eyebrow>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setIndex((index - 1 + total) % total)}
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIndex((index + 1) % total)}
              className="flex size-11 items-center justify-center rounded-full border border-ink/15 transition-colors hover:bg-ink hover:text-paper"
            >
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative min-h-[360px] md:min-h-[300px]" aria-live="polite">
          <span aria-hidden="true" className="absolute -top-16 -left-4 font-display text-[12rem] leading-none text-brass/30 select-none">
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={testimonial.name + index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-w-4xl flex-col gap-10"
            >
              <blockquote className="font-display text-4xl leading-[1.15] tracking-tight text-balance md:text-6xl">
                <p className="italic">{testimonial.quote}</p>
              </blockquote>
              <figcaption className="flex flex-col gap-1">
                <span className="font-medium">{testimonial.name}</span>
                <span className="text-sm text-ink-soft">{testimonial.detail}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="flex gap-2" role="tablist" aria-label="Choose testimonial">
          {testimonials.map((item, dotIndex) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`Testimonial from ${item.name}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                dotIndex === index ? "w-12 bg-forest" : "w-4 bg-ink/20 hover:bg-ink/40",
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
