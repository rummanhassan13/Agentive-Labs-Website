import Link from "next/link";

import { site } from "@/lib/site";
import { Container } from "@/components/layout/Container";

function LinkedinGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.5 18V10H6v8h2.5Zm-1.25-9.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM18 18v-4.5c0-2.4-1.3-3.5-3-3.5a2.6 2.6 0 0 0-2.3 1.3V10h-2.4v8h2.5v-4.3c0-1.1.5-1.7 1.3-1.7s1.4.5 1.4 1.7V18H18Z" />
    </svg>
  );
}

function GithubGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8 0-.7.4-1.2.7-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.6c0 .3.2.6.7.5A10 10 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z"
      />
    </svg>
  );
}

function YoutubeGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M23 7.2c-.3-1-1-1.8-2-2.1C19 4.5 12 4.5 12 4.5s-7 0-9 .6c-1 .3-1.8 1.1-2 2.1-.5 2-.5 4.8-.5 4.8s0 2.8.5 4.8c.3 1 1 1.8 2 2.1 2 .6 9 .6 9 .6s7 0 9-.6c1-.3 1.8-1.1 2-2.1.5-2 .5-4.8.5-4.8s0-2.8-.5-4.8ZM9.8 15.6V8.4l5.7 3.6-5.7 3.6Z" />
    </svg>
  );
}

const footerLinks = {
  Product: [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Security", href: "/security" },
  ],
  Legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
};

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="mt-auto border-t border-border-subtle bg-surface-1"
    >
      <Container className="grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="font-serif text-xl">{site.name}</div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.08em] text-fg-subtle">
            {site.locations.map((loc, i) => (
              <span key={loc.code} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden>·</span>}
                <span>{loc.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 md:col-span-6 md:col-start-7">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
                {heading}
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-fg-muted transition-colors hover:text-fg"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <div className="border-t border-border-subtle">
        <Container className="flex flex-col items-start justify-between gap-4 py-6 text-xs text-fg-subtle md:flex-row md:items-center">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-fg"
            >
              <LinkedinGlyph className="h-4 w-4" />
            </a>
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-fg"
            >
              <GithubGlyph className="h-4 w-4" />
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-fg"
            >
              <YoutubeGlyph className="h-4 w-4" />
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
