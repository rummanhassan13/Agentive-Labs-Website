"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface MotionSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function MotionSafe({ children, fallback = null }: MotionSafeProps) {
  const reduced = useReducedMotion();
  return <>{reduced ? fallback : children}</>;
}
