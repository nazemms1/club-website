"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/app-provider";
import { Button, buttonVariants } from "@/components/ui/button";
import { hasTier, getTier } from "@/lib/membership";
import type { TierId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function RsvpButton({ eventSlug, full, className }: { eventSlug: string; full: boolean; className?: string }) {
  const { ready, user, rsvps, toggleRsvp, notify } = useApp();

  if (!ready) {
    return <Button disabled className={className}>Loading</Button>;
  }

  if (!user) {
    return (
      <Link href="/login" className={cn(buttonVariants({ size: "lg" }), className)}>
        Sign in to RSVP
      </Link>
    );
  }

  const going = rsvps.includes(eventSlug);

  if (!going && full) {
    return (
      <Button
        variant="outline"
        size="lg"
        className={className}
        onClick={() => notify("You are on the waitlist. We will write if a place opens")}
      >
        Join the waitlist
      </Button>
    );
  }

  return (
    <Button
      variant={going ? "outline" : "primary"}
      size="lg"
      className={className}
      onClick={() => {
        toggleRsvp(eventSlug);
        notify(going ? "RSVP cancelled" : "You are on the list. See you there");
      }}
    >
      {going ? "Cancel RSVP" : "RSVP for this evening"}
    </Button>
  );
}

export function JoinClubButton({
  clubSlug,
  requiredTier,
  className,
}: {
  clubSlug: string;
  requiredTier: TierId;
  className?: string;
}) {
  const { ready, user, joined, toggleClub, notify } = useApp();

  if (!ready) {
    return <Button disabled className={className}>Loading</Button>;
  }

  if (!user) {
    return (
      <Link href="/login" className={cn(buttonVariants({ size: "lg" }), className)}>
        Sign in to join
      </Link>
    );
  }

  if (!hasTier(user.tierId, requiredTier)) {
    return (
      <Link href="/membership" className={cn(buttonVariants({ size: "lg", variant: "brass" }), className)}>
        Upgrade to {getTier(requiredTier).name} to join
      </Link>
    );
  }

  const isMember = joined.includes(clubSlug);

  return (
    <Button
      variant={isMember ? "outline" : "primary"}
      size="lg"
      className={className}
      onClick={() => {
        toggleClub(clubSlug);
        notify(isMember ? "You have left the club" : "Welcome to the club");
      }}
    >
      {isMember ? "Leave club" : "Join this club"}
    </Button>
  );
}
