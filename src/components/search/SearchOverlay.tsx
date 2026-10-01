import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { recordings } from "@/data/recordings";
import { stories } from "@/data/stories";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SearchResult {
  key: string;
  kind: "Recording" | "Story";
  title: string;
  subtitle: string;
  image: string;
  slug: string;
  haystack: string;
}

const SUGGESTIONS = ["water", "rail", "market", "forest", "silence", "Japan"];

function buildIndex(): SearchResult[] {
  return [
    ...recordings.map((r) => ({
      key: `rec-${r.id}`,
      kind: "Recording" as const,
      title: r.title,
      subtitle: `${r.location}, ${r.country} · ${r.category} · ${r.audioUrl ? formatTime(r.duration) : "recording wanted"}`,
      image: r.image,
      slug: r.slug,
      haystack: [r.title, r.location, r.country, r.category, r.description, ...r.tags]
        .join(" ")
        .toLowerCase(),
    })),
    ...stories.map((s) => ({
      key: `story-${s.id}`,
      kind: "Story" as const,
      title: s.title,
      subtitle: `${s.location} · ${s.category} · ${s.readingTime} min read`,
      image: s.coverImage,
      slug: s.slug,
      haystack: [s.title, s.location, s.category, s.excerpt, s.intro].join(" ").toLowerCase(),
    })),
  ];
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 6);
    return index.filter((item) => item.haystack.includes(q)).slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (result: SearchResult) => {
    onClose();
    if (result.kind === "Recording") {
      void navigate({ to: "/sounds/$slug", params: { slug: result.slug } });
    } else {
      void navigate({ to: "/stories/$slug", params: { slug: result.slug } });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-background/85 backdrop-blur-md"
          onClick={onClose}
          onKeyDown={onKeyDown}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the archive"
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-[12vh] w-[min(46rem,92vw)] border border-border bg-surface shadow-panel"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search className="size-4 shrink-0 text-subtle" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search places, recordings, categories, stories…"
                aria-label="Search the archive"
                className="h-16 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-subtle"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear the search field"
                  className="meta text-subtle transition-colors hover:text-foreground"
                >
                  Clear
                </button>
              ) : null}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="grid size-9 place-items-center text-subtle transition-colors hover:text-foreground"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>

            {!query ? (
              <div className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-4">
                <span className="eyebrow mr-1">Try</span>
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" className="chip" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            <ul className="max-h-[52vh] overflow-y-auto">
              {results.map((result, i) => (
                <li key={result.key}>
                  <button
                    type="button"
                    onClick={() => go(result)}
                    onMouseEnter={() => setActive(i)}
                    aria-current={i === active}
                    className={cn(
                      "flex w-full items-center gap-4 px-5 py-3 text-left transition-colors",
                      i === active ? "bg-elevated" : "hover:bg-elevated/60",
                    )}
                  >
                    <img
                      src={result.image}
                      alt=""
                      loading="lazy"
                      width={96}
                      height={96}
                      className="size-12 shrink-0 object-cover opacity-85"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-foreground">{result.title}</span>
                      <span className="meta block truncate normal-case tracking-normal">
                        {result.subtitle}
                      </span>
                    </span>
                    <span className="meta shrink-0 text-primary">{result.kind}</span>
                  </button>
                </li>
              ))}
            </ul>

            {results.length === 0 ? (
              <div className="px-5 py-10">
                <p className="text-foreground">Nothing in the archive matches “{query}”.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a place, a country, or a category such as Nature or Urban.
                </p>
              </div>
            ) : null}

            <p className="meta border-t border-border px-5 py-3">
              ↑ ↓ to move · Enter to open · Esc to close
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
