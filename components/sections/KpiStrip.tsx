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
              "group flex flex-col gap-1 md:px-6 transition-all duration-300 " +
              (i > 0 ? "md:border-l md:border-border-subtle" : "")
            }
          >
            <div className="flex items-center gap-2 font-mono text-3xl tracking-tight text-fg md:text-4xl">
              <span>
                {kpi.value}
                {kpi.suffix && (
                  <span className="ml-0.5 text-[20px] md:text-[24px] text-fg-muted font-normal">{kpi.suffix}</span>
                )}
              </span>
              
              <svg 
                className="h-5 w-12 shrink-0 text-accent/50 opacity-60 transition-all duration-300 group-hover:text-accent group-hover:opacity-100 group-hover:scale-105" 
                viewBox="0 0 48 16" 
                fill="none" 
                aria-hidden="true"
              >
                <path
                  d={
                    i % 3 === 0
                      ? "M2 13 C12 11, 20 6, 32 7 C38 8, 42 3, 46 3"
                      : i % 3 === 1
                      ? "M2 11 C12 14, 22 8, 30 4 C36 4, 42 2, 46 2"
                      : "M2 14 C10 8, 20 10, 28 5 C34 5, 42 2, 46 2"
                  }
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-sm text-fg-muted transition-colors duration-300 group-hover:text-fg">{kpi.label}</div>
          </div>
        ))}
      </Container>
    </div>
  );
}

