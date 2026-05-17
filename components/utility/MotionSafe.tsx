"use client";

import * as React from "react";

/**
 * Hook returning true if user prefers reduced motion.
 * Mirrors `useReducedMotion` from motion/react without forcing the import.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

interface MotionSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Wrapper that renders fallback (or nothing) when user prefers reduced motion.
 * Use sparingly — most reduced-motion handling should be CSS-only via the
 * @media (prefers-reduced-motion: reduce) rule in globals.css.
 */
export function MotionSafe({ children, fallback = null }: MotionSafeProps) {
  const reduced = useReducedMotion();
  return <>{reduced ? fallback : children}</>;
}
