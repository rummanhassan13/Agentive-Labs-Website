export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuad: [0.45, 0, 0.55, 1] as const,
} as const;

export const duration = {
  micro: 0.15,
  short: 0.22,
  base: 0.32,
  long: 0.48,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
} as const;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const;
