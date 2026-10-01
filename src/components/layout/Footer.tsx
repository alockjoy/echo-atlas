import { Link } from "@tanstack/react-router";

import { Wordmark } from "@/components/layout/Wordmark";
import { seededBars } from "@/lib/format";

const BARS = seededBars("echo-atlas-footer", 72);

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/30">
      <div
        aria-hidden="true"
        className="flex h-16 items-end gap-[3px] overflow-hidden px-6 opacity-40"
      >
        {BARS.map((b, i) => (
          <span
            key={i}
            className="w-full flex-1 bg-primary/50"
            style={{ height: `${Math.round(b * 100)}%` }}
          />
        ))}
      </div>

      <div className="shell grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark />
          <p className="mt-5 max-w-sm font-display text-2xl leading-snug text-muted-foreground">
            Preserving the sounds that make places unforgettable.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4 lg:col-start-8">
          <h2 className="eyebrow">The archive</h2>
          <ul className="mt-5 space-y-3">
            {[
              { to: "/explore", label: "Explore" },
              { to: "/atlas", label: "The Atlas" },
              { to: "/stories", label: "Stories" },
              { to: "/collections", label: "Saved sounds" },
              { to: "/about", label: "About" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-border py-6">
        <p className="meta">© {new Date().getFullYear()} Echo Atlas</p>
        <p className="meta">A demonstration archive · Editorial content written for this project</p>
      </div>
    </footer>
  );
}
