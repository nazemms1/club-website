import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth/auth-panel";
import { Card } from "@/components/ui/card";
import { Container, Eyebrow } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your member dashboard, or create an account to begin.",
};

export default function LoginPage() {
  return (
    <section className="pt-40 pb-32 md:pt-48">
      <Container className="grid items-start gap-16 md:grid-cols-12">
        <div className="flex flex-col gap-6 md:col-span-6">
          <Eyebrow>Members&rsquo; door</Eyebrow>
          <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
            Welcome back to <em className="text-forest italic">the house.</em>
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-ink-soft">
            Members sign in to their dashboard. Staff sign in with the staff account to reach the workspace for applications, members and
            events.
          </p>
          <Card className="mt-2 flex max-w-md flex-col gap-4 p-6">
            <p className="text-sm font-medium">Prototype access</p>
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="text-ink-soft">Member dashboard</dt>
                <dd className="mt-1">Any valid email with a password of at least 8 characters</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Staff workspace</dt>
                <dd className="mt-1 font-mono text-[13px]">admin@admin.com &middot; password</dd>
              </div>
            </dl>
          </Card>
        </div>
        <Card className="p-8 md:col-span-5 md:col-start-8 md:p-10">
          <AuthPanel />
        </Card>
      </Container>
    </section>
  );
}
