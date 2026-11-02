"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    // Preserve intentional in-page anchor navigation such as /#services.
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
