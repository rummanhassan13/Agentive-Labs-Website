import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function GuaranteeBand({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-2xl border border-border-subtle bg-surface-1 p-6 md:p-8",
        className
      )}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
        <ShieldCheck className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          90-Day ROI Promise
        </div>
        <h3 className="mt-1 font-serif text-xl tracking-tight">
          If we ship and it doesn&rsquo;t pay back in 90 days, we rebuild it free.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          Every engagement ships with documented KPIs, a dashboard and a
          90-day review. If the agreed metric isn&rsquo;t hit by the review
          date, we extend the build at no cost until it is.
        </p>
      </div>
    </div>
  );
}
