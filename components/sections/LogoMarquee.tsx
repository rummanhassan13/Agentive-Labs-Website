import { Container } from "@/components/layout/Container";

interface LogoMarqueeProps {
  eyebrow?: string;
  logos: { name: string }[];
}

/**
 * Static placeholder logo strip. Phase 2 ships without real client logos —
 * each cell renders a stylized wordmark in mono type. Replace with real
 * SVG logos when permissions are confirmed.
 */
export function LogoMarquee({
  eyebrow = "Trusted by ops teams at",
  logos,
}: LogoMarqueeProps) {
  return (
    <div className="border-y border-border-subtle bg-surface-0/40 py-8">
      <Container>
        <div className="text-center font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          {eyebrow}
        </div>
        <div className="mt-6 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="font-mono text-sm tracking-wide text-fg-subtle opacity-60 grayscale transition-opacity hover:opacity-100 hover:grayscale-0"
              aria-label={logo.name}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
