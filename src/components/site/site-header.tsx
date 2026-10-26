"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";
import { useApp } from "@/components/providers/app-provider";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { MobileMenu } from "@/components/site/mobile-menu";
import { cn, initials } from "@/lib/utils";

export function SiteHeader() {
  const { user } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-mist/70 bg-paper/85 py-3 backdrop-blur-md" : "bg-transparent py-6",
      )}
    >
      <Container className="flex items-center justify-between gap-6">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Maison <em className="italic">Commune</em>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn("underline-sweep text-sm transition-colors hover:text-clay", active ? "text-clay" : "text-ink-soft")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href={user.role === "admin" ? "/admin" : "/dashboard"}
              aria-label={user.role === "admin" ? "Open the staff workspace" : "Open your dashboard"}
              className="flex size-10 items-center justify-center rounded-full bg-forest text-sm font-medium text-paper"
            >
              {initials(user.name)}
            </Link>
          ) : (
            <Link href="/login" className="hidden text-sm text-ink-soft transition-colors hover:text-ink sm:inline">
              Sign in
            </Link>
          )}
          <Link href="/membership" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
            Request invitation
          </Link>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
