import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/layout";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center pt-32 pb-20">
      <Container className="flex flex-col gap-8">
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em]">
          This room is <em className="text-clay italic">empty.</em>
        </h1>
        <p className="max-w-md text-lg text-ink-soft">The page you were looking for has moved or never opened. The clubs are still in session.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            Back to the house
          </Link>
          <Link href="/clubs" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Browse clubs
          </Link>
        </div>
      </Container>
    </section>
  );
}
