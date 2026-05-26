"use client";

import { useReducedMotion } from "./MotionSafe";

export function DynamicGrain() {
  const reduced = useReducedMotion();
  
  if (reduced) return null;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[999] h-full w-full opacity-[0.015]" 
      aria-hidden="true"
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
