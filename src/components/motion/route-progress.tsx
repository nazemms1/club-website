"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NAVIGATING = "navigating";

/**
 * Shows a slim bar as soon as a same-site link is clicked, so the wait never looks like a freeze.
 * The bar is driven by a data attribute and CSS, so the click itself causes no React re-render.
 */
export function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const destination = new URL(anchor.href, window.location.href);
      const isSameSite = destination.origin === window.location.origin;
      const isSamePage = destination.href === window.location.href;
      if (!isSameSite || isSamePage) return;

      document.documentElement.dataset[NAVIGATING] = "true";
      // Safety net: if the navigation never completes, hide the bar after a while.
      window.setTimeout(() => delete document.documentElement.dataset[NAVIGATING], 8000);
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    delete document.documentElement.dataset[NAVIGATING];
  }, [pathname]);

  return <div aria-hidden="true" className="route-progress" />;
}
