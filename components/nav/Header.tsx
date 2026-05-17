"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Container } from "@/components/layout/Container";
import { NavLink } from "@/components/nav/NavLink";
import { MobileDrawer } from "@/components/nav/MobileDrawer";
import { BookSprintCta } from "@/components/cta/BookSprintCta";
import { ThemeToggle } from "@/components/utility/ThemeToggle";
import { primaryNav } from "@/components/nav/nav-config";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-surface-1 focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>
      <header
        role="banner"
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border-subtle backdrop-blur-md transition-[height,background-color] duration-200",
          scrolled
            ? "h-14 bg-surface-0/85"
            : "h-[72px] bg-surface-0/70"
        )}
      >
        <Container className="flex h-full items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight"
            aria-label={`${site.name} home`}
          >
            <Logomark className="h-6 w-6" />
            <span className="font-serif text-lg leading-none">
              {site.name}
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 md:flex"
          >
            {primaryNav.map((it) => (
              <NavLink key={it.href} href={it.href}>
                {it.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <BookSprintCta size="sm" label="Book the Discovery Sprint" />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <MobileDrawer items={primaryNav} />
          </div>
        </Container>
      </header>
    </>
  );
}

function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeOpacity="0.2" />
      <circle cx="12" cy="12" r="4" fill="oklch(0.78 0.14 195)" />
      <path
        d="M12 1v6M12 17v6M1 12h6M17 12h6"
        stroke="oklch(0.78 0.14 195)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
