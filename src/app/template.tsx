import type { ReactNode } from "react";

/** A template remounts on every navigation, so each page rises gently into place. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
