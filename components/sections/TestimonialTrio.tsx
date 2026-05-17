import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface TestimonialTrioProps {
  heading?: string;
  items?: Testimonial[];
}

const PLACEHOLDER: Testimonial[] = [
  {
    quote:
      "[Placeholder — real client quote pending. Will replace before launch.]",
    name: "[Placeholder]",
    role: "[Role]",
    company: "[Company]",
  },
  {
    quote:
      "[Placeholder — real client quote pending. Will replace before launch.]",
    name: "[Placeholder]",
    role: "[Role]",
    company: "[Company]",
  },
  {
    quote:
      "[Placeholder — real client quote pending. Will replace before launch.]",
    name: "[Placeholder]",
    role: "[Role]",
    company: "[Company]",
  },
];

export function TestimonialTrio({
  heading = "What clients say",
  items,
}: TestimonialTrioProps) {
  const rendered = items?.length === 3 ? items : PLACEHOLDER;
  const isPlaceholder = rendered === PLACEHOLDER;
  return (
    <Container>
      <h2 className="font-serif text-3xl tracking-tight md:text-4xl">
        {heading}
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {rendered.map((t, i) => (
          <figure
            key={i}
            className={cn(
              "flex flex-col gap-4 rounded-2xl border border-border-subtle bg-surface-1 p-6",
              isPlaceholder && "opacity-70"
            )}
          >
            <blockquote className="text-base leading-relaxed text-fg-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-mono text-xs text-fg-subtle"
              >
                {t.name.slice(0, 1) || "?"}
              </span>
              <div>
                <div className="text-sm font-medium text-fg">{t.name}</div>
                <div className="text-xs text-fg-subtle">
                  {t.role} · {t.company}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {isPlaceholder && (
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          Real testimonials pending — placeholder content only
        </div>
      )}
    </Container>
  );
}
