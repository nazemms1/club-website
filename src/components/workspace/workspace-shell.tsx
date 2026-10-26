"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowUpLeft, Bell, LogOut } from "lucide-react";
import { applications } from "@/data/membership";
import { useApp } from "@/components/providers/app-provider";
import { Avatar } from "@/components/avatar";
import { adminNav, exploreNav, memberNav, type WorkspaceNavItem } from "@/components/workspace/nav-config";
import { WorkspaceSkeleton } from "@/components/workspace/workspace-skeleton";
import { getTier } from "@/lib/membership";
import { cn } from "@/lib/utils";

const pendingApplications = applications.filter((application) => application.status === "pending").length;

/**
 * One gutter for the top bar and the page, so their edges line up. The content runs close to the
 * sidebar on normal screens and only centres on very wide ones.
 */
const shellContainer = "mx-auto w-full max-w-[1680px] px-6 md:px-8 xl:px-10";

function isActive(item: WorkspaceNavItem, pathname: string) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

interface WorkspaceShellProps {
  variant: "member" | "admin";
  /** While the saved session loads, the page area shows a skeleton and the page stays hidden. */
  pending?: boolean;
  children: ReactNode;
}

export function WorkspaceShell({ variant, pending = false, children }: WorkspaceShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, notify } = useApp();

  const items = variant === "member" ? memberNav : adminNav;
  const areaLabel = variant === "member" ? "Member workspace" : "Staff workspace";
  const activeItem = items.find((item) => isActive(item, pathname));
  const badges: Record<string, number> = { "/admin/applications": pendingApplications };
  const roleLabel = user?.role === "admin" ? "Staff administrator" : user ? `${getTier(user.tierId).name} plan` : "";

  function handleSignOut() {
    signOut();
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-paper lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <aside className="border-b border-mist/80 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-r lg:border-b-0">
        <div className="flex flex-col gap-8 px-5 py-6 lg:min-h-full lg:px-6 lg:py-8">
          <Link href="/" className="font-display text-2xl tracking-tight">
            Maison <em className="italic">Commune</em>
          </Link>

          <nav aria-label={`${areaLabel} navigation`} className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            <p className="hidden px-4 pb-1 text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase lg:block">
              {variant === "member" ? "My membership" : "Staff"}
            </p>
            {items.map((item) => {
              const active = isActive(item, pathname);
              const Icon = item.icon;
              const badge = badges[item.href];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors duration-300",
                    active ? "bg-forest text-paper" : "text-ink-soft hover:bg-ink/5 hover:text-ink",
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="flex-1">{item.label}</span>
                  {badge ? (
                    <span className={cn("rounded-full px-2 py-0.5 text-xs", active ? "bg-paper/20" : "bg-brass/25 text-ink")}>{badge}</span>
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {variant === "member" ? (
            <nav aria-label="Explore the house" className="hidden flex-col gap-1 lg:flex">
              <p className="px-4 pb-1 text-xs font-medium tracking-[0.16em] text-ink-soft/80 uppercase">Explore</p>
              {exploreNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-full px-4 py-2.5 text-sm text-ink-soft transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          ) : null}

          <Link href="/" className="mt-auto hidden items-center gap-2 px-4 text-sm text-ink-soft transition-colors hover:text-ink lg:inline-flex">
            <ArrowUpLeft className="size-4" aria-hidden="true" />
            Back to the website
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-mist/70 bg-paper/90 backdrop-blur-md">
          <div className={cn(shellContainer, "flex h-16 items-center justify-between gap-4")}>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden truncate text-ink-soft sm:inline">{areaLabel}</span>
              <span aria-hidden="true" className="hidden text-ink-soft/50 sm:inline">
                /
              </span>
              <span className="truncate font-medium">{activeItem?.label ?? "Overview"}</span>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => notify("You have two unread notes from your hosts")}
                className="relative flex size-10 items-center justify-center rounded-full border border-mist bg-white/70 transition-colors hover:border-ink/30"
              >
                <Bell className="size-4" aria-hidden="true" />
                <span className="absolute top-2 right-2.5 size-2 rounded-full bg-clay" aria-hidden="true" />
              </button>

              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <div className="hidden leading-tight md:block">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-ink-soft">{roleLabel}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Sign out"
                    onClick={handleSignOut}
                    className="flex size-10 items-center justify-center rounded-full border border-mist bg-white/70 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </header>

        <div className={cn(shellContainer, "py-8 md:py-10")}>
          {pending ? <WorkspaceSkeleton /> : null}
          <div hidden={pending}>{children}</div>
        </div>
      </div>
    </div>
  );
}
