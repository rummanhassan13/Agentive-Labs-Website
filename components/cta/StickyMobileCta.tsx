"use client";

import * as React from "react";
import { BookSprintCta } from "@/components/cta/BookSprintCta";

/**
 * Fixed bottom CTA bar that appears on mobile after the hero scrolls out
 * of view. Hides on scroll-up; respects safe-area-inset-bottom.
 */
export function StickyMobileCta({ threshold = 480 }: { threshold?: number }) {
  const [visible, setVisible] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const scrollingUp = y < lastY.current;
      lastY.current = y;
      if (y < threshold) {
        setVisible(false);
      } else if (scrollingUp) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <div
      className={
        "pointer-events-none fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 md:hidden " +
        (visible ? "translate-y-0" : "translate-y-full")
      }
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="pointer-events-auto border-t border-border-subtle bg-surface-1/95 px-4 py-3 backdrop-blur-md">
        <BookSprintCta size="lg" className="w-full" />
      </div>
    </div>
  );
}
