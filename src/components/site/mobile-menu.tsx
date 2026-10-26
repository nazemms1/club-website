"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/content";
import { useApp } from "@/components/providers/app-provider";

export function MobileMenu() {
  const { user } = useApp();

  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label="Open menu"
        className="flex size-10 items-center justify-center rounded-full border border-ink/15 xl:hidden"
      >
        <Menu className="size-5" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-0 z-[70] flex flex-col bg-paper px-6 py-6 focus:outline-none">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-2xl">
              Maison <em className="italic">Commune</em>
            </Dialog.Title>
            <Dialog.Close aria-label="Close menu" className="flex size-10 items-center justify-center rounded-full border border-ink/15">
              <X className="size-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="mt-12 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.href}>
                <Link href={link.href} className="font-display text-4xl tracking-tight transition-colors hover:text-clay">
                  {link.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <Dialog.Close asChild>
              <Link
                href={user ? "/dashboard" : "/login"}
                className="flex h-14 items-center justify-center rounded-full bg-forest text-base font-medium text-paper"
              >
                {user ? "Open your dashboard" : "Sign in"}
              </Link>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Link href="/membership" className="flex h-14 items-center justify-center rounded-full border border-ink/20 text-base font-medium">
                Request an invitation
              </Link>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
