"use client";

import { useEffect } from "react";

/* The list pages (events, manage, joined) are behind a loading.tsx skeleton, so
   Next's built-in #hash scrolling fires before the cards exist and lands at the
   wrong place. This mounts inside the real page content, finds the card by id
   from window.location.hash and scrolls to it (offset for the sticky navbar),
   retrying a few frames so late layout from images can't throw it off. */
export default function ScrollToHash() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let frame = 0;
    let cancelled = false;

    const scrollToTarget = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - 90 /* sticky header */;
        const destination = Math.max(top, 0);
        if (Math.abs(window.scrollY - destination) > 5) {
          window.scrollTo({ top: destination, behavior: "smooth" });
        }
        return;
      }
      if (frame < 30) {
        frame += 1;
        requestAnimationFrame(scrollToTarget);
      }
    };

    requestAnimationFrame(scrollToTarget);
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
