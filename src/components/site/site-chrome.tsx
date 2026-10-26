"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/** Workspace routes bring their own shell. Everything else gets the public header and footer. */
export function isWorkspacePath(pathname: string) {
  return pathname === "/dashboard" || pathname.startsWith("/dashboard/") || pathname === "/admin" || pathname.startsWith("/admin/");
}

/**
 * Chooses the chrome in one place, under the root layout. Keeping this out of route-group layouts
 * means moving between the public site and the workspaces only swaps content, never layouts.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (isWorkspacePath(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
