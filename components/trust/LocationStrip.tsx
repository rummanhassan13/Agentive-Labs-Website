import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LocationStrip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle",
        className
      )}
    >
      {site.locations.map((loc, i) => (
        <span key={loc.code} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>·</span>}
          <span>{loc.label}</span>
        </span>
      ))}
    </div>
  );
}
