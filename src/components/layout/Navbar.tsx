import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Wordmark } from "@/components/layout/Wordmark";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/atlas", label: "The Atlas" },
  { to: "/explore", label: "Explore" },
  { to: "/stories", label: "Stories" },
  { to: "/about", label: "About" },
] as const;

export function Navbar({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || menuOpen
          ? "border-b border-border bg-background/88 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-[4.5rem] items-center justify-between gap-6"
      >
        <Wordmark onNavigate={() => setMenuOpen(false)} />

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="meta text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "meta text-primary" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search the archive"
            className="grid size-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="size-[1.1rem]" strokeWidth={1.5} />
          </button>

          <Link
            to="/collections"
            aria-label={`Saved sounds (${favorites.length} saved)`}
            className="relative grid size-10 place-items-center text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-primary" }}
          >
            <Heart className="size-[1.1rem]" strokeWidth={1.5} />
            {favorites.length > 0 ? (
              <span className="absolute right-1 top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 font-mono text-[0.6rem] leading-4 text-primary-foreground">
                {favorites.length}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close the menu" : "Open the menu"}
            className="grid size-10 place-items-center text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            {menuOpen ? (
              <X className="size-[1.15rem]" strokeWidth={1.5} />
            ) : (
              <Menu className="size-[1.15rem]" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-2xl text-foreground"
                    activeProps={{ className: "block py-3 font-display text-2xl text-primary" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/collections"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-display text-2xl text-foreground"
                >
                  Saved sounds
                </Link>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
