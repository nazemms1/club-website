"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/app-provider";
import { SignInForm } from "@/components/auth/sign-in-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Eyebrow } from "@/components/ui/layout";

/** Full-page screen for a workspace the current visitor cannot open. */
export function AccessScreen({ area }: { area: "member" | "staff" }) {
  const { user, signOut } = useApp();
  const isStaffArea = area === "staff";
  const isWrongAccount = Boolean(user);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-mist/80">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-tight">
            Maison <em className="italic">Commune</em>
          </Link>
          <Link href="/" className="text-sm text-ink-soft hover:text-ink">
            Back to the website
          </Link>
        </Container>
      </header>

      <main className="flex flex-1 items-center py-16 md:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <Eyebrow>{isStaffArea ? "Staff workspace" : "Members only"}</Eyebrow>
            <h1 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              {isStaffArea ? (
                <>
                  Run the house <em className="italic">from one desk.</em>
                </>
              ) : (
                <>
                  Sign in to see <em className="italic">your evenings.</em>
                </>
              )}
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-ink-soft">
              {isStaffArea
                ? "Applications, members and the event calendar live here. Access is limited to the staff account."
                : "Your RSVPs, clubs, membership card and billing are kept in your member dashboard."}
            </p>
          </div>

          <Card className="p-8 md:p-10 lg:col-span-5 lg:col-start-8">
            {isWrongAccount ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl">Staff access only</h2>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    You are signed in as {user?.name}. The staff workspace needs the staff account. Sign out to switch accounts, or return to
                    your dashboard.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
                    Go to my dashboard
                  </Link>
                  <Button onClick={() => signOut()}>Sign out</Button>
                </div>
              </div>
            ) : isStaffArea ? (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl">Staff sign-in</h2>
                  <p className="text-sm text-ink-soft">Enter the staff credentials to open the workspace.</p>
                </div>
                <SignInForm allowedRoles={["admin"]} submitLabel="Open staff workspace" />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-2xl">Sign in to continue</h2>
                  <p className="text-sm leading-relaxed text-ink-soft">Use your member email and password, or create an account if you are new to the house.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/login" className={buttonVariants({ size: "lg" })}>
                    Go to sign in
                  </Link>
                  <Link href="/login" className={buttonVariants({ variant: "outline", size: "lg" })}>
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </Card>
        </Container>
      </main>
    </div>
  );
}
