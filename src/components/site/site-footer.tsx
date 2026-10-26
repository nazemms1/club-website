"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { navLinks, siteConfig } from "@/data/content";
import { useApp } from "@/components/providers/app-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { inputClass } from "@/components/ui/field";

export function SiteFooter() {
  const { notify } = useApp();
  const [email, setEmail] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      notify("Please enter a valid email address");
      return;
    }
    notify("Thank you. The next house letter is on its way");
    setEmail("");
  }

  return (
    <footer className="bg-forest-deep text-paper">
      <Container className="grid gap-14 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-5xl leading-none tracking-tight md:text-6xl">
            Maison <em className="italic">Commune</em>
          </p>
          <p className="mt-6 max-w-sm text-paper/70">
            A members&rsquo; house of small clubs, in {siteConfig.cities.slice(0, -1).join(", ")} and {siteConfig.cities.at(-1)}.
          </p>
          <form onSubmit={handleSubscribe} className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email for the house letter"
              aria-label="Email address"
              className={inputClass + " border-paper/20 bg-transparent text-paper placeholder:text-paper/50 focus:border-brass focus:bg-transparent"}
            />
            <Button variant="brass" className="h-12 shrink-0">
              Subscribe
            </Button>
          </form>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-4 md:col-start-7 md:gap-10">
          <div className="flex min-w-0 flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50">Explore</p>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-paper/85 transition-colors hover:text-brass">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex min-w-0 flex-col gap-3 text-paper/85">
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50">Visit</p>
            <p>{siteConfig.address}</p>
            <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-brass">
              {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brass">
              {siteConfig.phone}
            </a>
            <p className="text-sm text-paper/60">{siteConfig.hours}</p>
          </div>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-8 text-sm text-paper/50 md:col-span-12">
          <p>&copy; {siteConfig.copyrightYear} Maison Commune. A prototype with fictional mock data.</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-paper">
              About
            </Link>
            <Link href="/contact" className="hover:text-paper">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-paper">
              Staff sign-in
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
