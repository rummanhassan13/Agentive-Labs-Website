import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd } from "@/components/utility/JsonLd";
import { breadcrumbList } from "@/lib/jsonld/breadcrumb";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-fg-muted">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-fg"
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRight className="h-3 w-3" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={breadcrumbList(items.map((it) => ({ name: it.name, url: it.href })))}
      />
    </>
  );
}
