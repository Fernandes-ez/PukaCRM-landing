"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Forces one ScrollTrigger.refresh() pass after the whole tree has mounted
 * (and again once web fonts settle). Without this, a tall/short-first-paint
 * viewport can capture reveal elements mid-layout, before font swap or a
 * late image finishes shifting things — their trigger start position gets
 * computed against not-yet-final layout and never re-checked, since nothing
 * else forces a recheck until the user actually scrolls or resizes.
 * Mounted once, near the root (`app/layout.tsx`) — renders nothing.
 */
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    document.fonts?.ready?.then(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
