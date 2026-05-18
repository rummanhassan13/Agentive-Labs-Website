<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Agentive Labs project notes

This is a Next.js 16 App Router site for **Agentive Labs**, an AI automation agency for SMEs. Phase 1 + 2 MVP scope: home, services index, pricing, offers, contact (form → Cal.com embed), about, security, legal pages, sitemap/robots/og-image.

## Locked stack

- **Next.js 16.2.x** App Router + React 19 + TypeScript strict
- **Tailwind CSS v4** with CSS-first `@theme inline` in `app/globals.css` (NO `tailwind.config.js`)
- **shadcn/ui** primitives (hand-authored under `components/ui/`; new-york style; `radix-ui` unified package; `lucide-react` for icons)
- **Velite** for MDX content under `content/`, output to `.velite/`, alias `#site/content`. Runs via `pnpm prebuild`/`pnpm predev` because Turbopack does not run Velite's webpack plugin.
- **Motion v12** for animations (Phase 4 — currently imported but not yet used)
- **react-hook-form** + **zod** + Server Actions on `/contact`
- **@calcom/embed-react ^1.5.3** for booking (popup site-wide, inline on `/contact`)
- **@vercel/analytics + @vercel/speed-insights** prod-only. **next-plausible** gated on `NEXT_PUBLIC_PLAUSIBLE_SRC`.
- **next/font/google**: Instrument Serif (display, weight 400 + italic), Inter (variable), Geist Mono (variable). Variables exposed as `--font-serif`, `--font-sans`, `--font-mono`.
- **pnpm 10** package manager

## Vibe-coding gotchas (reject these patterns)

1. **No `tailwind.config.js`** — tokens live in `app/globals.css` under `@theme inline`. Brand surfaces/text/borders/accent are OKLCH; shadcn aliases (`--color-background`, `--color-primary`, etc.) are mapped to brand tokens in the same block.
2. **No `framer-motion`** — import from `motion/react` (Motion v12).
3. **No `contentlayer` / `contentlayer2`** — use Velite.
4. **No `shadcn-ui` CLI** — registry was hand-installed because `ui.shadcn.com` requires auth this sandbox lacked. To add a primitive, copy from the shadcn source on GitHub or write by hand against `radix-ui` + `cva` + `cn`.
5. **No `forwardRef` ceremony for shadcn pieces written from scratch** — the codebase uses `forwardRef` where it was clean; new wrappers can skip it.
6. **No `useFormState`** — use `useActionState` from `'react'` (NOT `react-dom`).
7. **No `import * as Icons from 'lucide-react'`** — named imports only (tree-shaking).
8. **No `next/script strategy="beforeInteractive"`** for analytics or third-party widgets.
9. **No `next/image` on SVG icons** — inline the SVG.
10. **No top-level `await` in `next.config.ts`** — drive Velite via `pnpm prebuild`/`pnpm predev` scripts.
11. **No brand icons from `lucide-react`** — v1.16 dropped them. Inline SVG for LinkedIn / GitHub / YouTube etc.
12. **No fabricated facts** in `[Placeholder]` copy — pages where source copy is missing render visible placeholders. Do not invent testimonials, bios, certifications, client metrics.
13. **`useReducedMotion`** — use `useSyncExternalStore` pattern (see `components/utility/MotionSafe.tsx`). Setting state inside `useEffect` for hydration-only reads trips the React 19 lint rule.
14. **`@vercel/og` divs with > 1 child** — must have explicit `display: flex` (or `contents` / `none`). Satori enforces this even when CSS would default to it.
15. **`@calcom/embed-react` peer deps** pin to React 18; pnpm 10 emits a warning but installs cleanly. Don't downgrade React.

## Project layout

```
app/                                  # App Router pages (no (marketing) group)
  layout.tsx                          # fonts, ThemeProvider, Org+WebSite JSON-LD, analytics
  globals.css                         # Tailwind v4 + @theme inline + OKLCH tokens
  page.tsx                            # /
  services/page.tsx                   # /services (reads #site/content)
  pricing/page.tsx                    # /pricing
  offers/page.tsx                     # /offers
  contact/{page,contact-flow,contact-form,cal-inline,actions}.tsx
  about/page.tsx
  security/page.tsx
  legal/{privacy,terms}/page.tsx
  sitemap.ts                          # built-in, NOT next-sitemap
  robots.ts
  opengraph-image.tsx                 # edge runtime
  not-found.tsx

components/
  ui/                                 # hand-written shadcn primitives
  layout/                             # SiteShell, Section, Container, Grid
  nav/                                # Header, MobileDrawer, NavLink, Footer, Breadcrumbs, nav-config
  hero/                               # Hero, WorkflowDiagram
  sections/                           # KpiStrip, LogoMarquee, HowItWorks, FeatureBento, TestimonialTrio, FaqAccordion, FinalCtaBand, PricingTabs
  cards/                              # BentoCard, PricingCard, CaseStudyCard, MetricPill
  cta/                                # CtaButton, BookSprintCta, StickyMobileCta
  trust/                              # LocationStrip, GuaranteeBand, SecurityBadgeRow, TrustQuote
  analytics/                          # AnalyticsProviders
  utility/                            # JsonLd, ThemeProvider, ThemeToggle, MotionSafe

content/services/*.mdx                # Velite source (7 stubs for /services + /pricing)
lib/
  site.ts                             # brand config (URL, social, locations, cal slug)
  fonts.ts
  motion.ts                           # easing + duration tokens for Phase 4
  utils.ts                            # cn()
  schemas/contact.ts                  # Zod schema for /contact form
  jsonld/                             # Org, LocalBusiness, Service, Product, FAQ, Breadcrumb, ContactPage, ItemList builders
```

## Environment variables

| Var | Purpose | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base | `https://agentivelabs.com` |
| `NEXT_PUBLIC_CAL_LINK` | Cal.com link slug | `agentivelabs/discovery` |
| `NEXT_PUBLIC_PLAUSIBLE_SRC` | Plausible script URL | unset → provider not mounted |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain | `agentivelabs.com` |

## Out of scope (Phase 3+)

- `/services/[slug]` detail pages, `/portfolio`, `/resources`, `/playbooks`, `/templates`, `/partners`, `/blog`
- Motion-driven animations beyond CSS hover lifts
- A/B variants, session replay, lead-magnet flows, Cal Routing Form
- Real HubSpot/Resend wiring on contact server action (TODO comment in `app/contact/actions.ts`)
- Real client testimonials, founder bio, sub-processor confirmations, legal counsel review
