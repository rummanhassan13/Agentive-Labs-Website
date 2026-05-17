import { Container } from "@/components/layout/Container";

export interface Kpi {
  value: string;
  label: string;
  suffix?: string;
}

interface KpiStripProps {
  items: Kpi[];
  eyebrow?: string;
}

export function KpiStrip({ items, eyebrow }: KpiStripProps) {
  return (
    <div className="border-y border-border-subtle bg-surface-1/60">
      <Container className="grid items-stretch gap-y-8 py-12 md:grid-cols-4 md:gap-y-0">
        {eyebrow && (
          <div className="md:col-span-4 -mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            {eyebrow}
          </div>
        )}
        {items.map((kpi, i) => (
          <div
            key={kpi.label}
            className={
              "flex flex-col gap-1 md:px-6 " +
              (i > 0 ? "md:border-l md:border-border-subtle" : "")
            }
          >
            <div className="font-mono text-3xl tracking-tight text-fg md:text-4xl">
              {kpi.value}
              {kpi.suffix && (
                <span className="ml-1 text-fg-muted">{kpi.suffix}</span>
              )}
            </div>
            <div className="text-sm text-fg-muted">{kpi.label}</div>
          </div>
        ))}
      </Container>
    </div>
  );
}
