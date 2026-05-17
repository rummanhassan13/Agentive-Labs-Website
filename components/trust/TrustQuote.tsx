interface TrustQuoteProps {
  quote: string;
  attribution?: string;
}

export function TrustQuote({ quote, attribution }: TrustQuoteProps) {
  return (
    <figure className="rounded-2xl border border-border-subtle bg-surface-1 p-6">
      <blockquote className="font-serif text-xl leading-snug tracking-tight">
        &ldquo;{quote}&rdquo;
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          — {attribution}
        </figcaption>
      )}
    </figure>
  );
}
