"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useApp } from "@/components/providers/app-provider";
import { AccessScreen } from "@/components/workspace/access-screen";
import { WorkspaceShell } from "@/components/workspace/workspace-shell";

/**
 * One frame for every workspace route. The page always renders inside the shell, so prerendering
 * keeps it in the static output. The session check only replaces the workspace once the browser
 * has loaded the saved session.
 */
export function WorkspaceFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { ready, user } = useApp();
  const isStaff = pathname === "/admin" || pathname.startsWith("/admin/");
  const area = isStaff ? "staff" : "member";
  const allowed = Boolean(user) && (area === "member" || user?.role === "admin");

  if (ready && !allowed) {
    return <AccessScreen area={area} />;
  }

  return (
    <WorkspaceShell variant={isStaff ? "admin" : "member"} pending={!ready}>
      {children}
    </WorkspaceShell>
  );
}
