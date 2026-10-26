import type { Metadata } from "next";
import type { ReactNode } from "react";
import { WorkspaceFrame } from "@/components/workspace/workspace-frame";

export const metadata: Metadata = {
  title: { default: "Workspace", template: "%s | Maison Commune workspace" },
  robots: { index: false, follow: false },
};

export default function WorkspaceLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <WorkspaceFrame>{children}</WorkspaceFrame>;
}
