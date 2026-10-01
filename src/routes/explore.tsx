import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { SoundGrid } from "@/components/sounds/SoundGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { CATEGORIES } from "@/data/categories";
import { featuredRecording, recordings } from "@/data/recordings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore the Archive — Echo Atlas" },
      {
        name: "description",
        content:
          "Browse every entry in the Echo Atlas archive by category, country and length — and listen as you go.",
      },
      { property: "og:title", content: "Explore the Archive — Echo Atlas" },
      {
        property: "og:description",
        content: "Discover the world, one sound at a time.",
      },
    ],
  }),
  component: ExplorePage,
});

type Sort = "Featured" | "Newest" | "Alphabetical";
const SORTS: Sort[] = ["Featured", "Newest", "Alphabetical"];

function ExplorePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [country, setCountry] = useState<string>("All");
  const [sort, setSort] = useState<Sort>("Featured");

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(recordings.map((r) => r.country))).sort()],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = recordings.filter((r) => {
      const matchesQuery =
        !q ||
        [r.title, r.location, r.country, r.category, r.description, ...r.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return (
        matchesQuery &&
        (category === "All" || r.category === category) &&
        (country === "All" || r.country === country)
      );
    });

    const sorted = [...list];
    if (sort === "Alphabetical") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "Newest")
      sorted.sort((a, b) => (b.recordedAt ?? "").localeCompare(a.recordedAt ?? ""));
    else
      sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title),
      );
    return sorted;
  }, [query, category, country, sort]);

  const dirty = Boolean(query) || category !== "All" || country !== "All" || sort !== "Featured";

  const clear = () => {
    setQuery("");
    setCategory("All");
    setCountry("All");
    setSort("Featured");
  };

  return (
    <div className="pt-[4.5rem]">
      <section className="shell pt-12 sm:pt-16">
        <p className="eyebrow text-primary">Explore</p>
        <h1 className="mt-5 max-w-[26ch] text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground">
          Discover the world, one sound at a time.
        </h1>
      </section>

      <Reveal className="shell mt-14 grid gap-10 border-y border-border py-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative overflow-hidden bg-elevated lg:col-span-6">
          <img
            src={featuredRecording.image}
            alt={featuredRecording.imageAlt}
            loading="lazy"
            width={1280}
            height={720}
            className="aspect-[16/9] w-full object-cover opacity-85"
          />
          <div className="image-veil opacity-50" />
        </div>
        <div className="flex flex-col justify-center lg:col-span-6">
          <p className="eyebrow">Start here</p>
          <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight text-foreground">
            {featuredRecording.title}
          </h2>
          <p className="meta mt-3">
            {featuredRecording.location} · {featuredRecording.category}
          </p>
          <div className="mt-7">
            <AudioPlayer recording={featuredRecording} />
          </div>
        </div>
      </Reveal>

      <section className="shell mt-10">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <label className="flex min-w-[15rem] flex-1 items-center gap-2 border border-border px-3">
            <Search className="size-4 shrink-0 text-subtle" strokeWidth={1.5} />
            <span className="sr-only">Search recordings</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, places, tags"
              className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear the search field"
                className="text-subtle transition-colors hover:text-foreground"
              >
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            ) : null}
          </label>

          <label className="flex items-center gap-2">
            <span className="eyebrow">Place</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-11 border border-border bg-transparent px-3 text-sm text-foreground outline-none"
            >
              {countries.map((c) => (
                <option key={c} value={c} className="bg-surface">
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="eyebrow">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 border border-border bg-transparent px-3 text-sm text-foreground outline-none"
            >
              {SORTS.map((s) => (
                <option key={s} value={s} className="bg-surface">
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...CATEGORIES].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={cn("chip", category === c && "chip-active")}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="meta ml-auto" role="status">
            {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
          </p>
          {dirty ? (
            <button type="button" onClick={clear} className="meta link-underline text-foreground">
              Clear filters
            </button>
          ) : null}
        </div>
      </section>

      <section className="shell mt-10 pb-10">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing matches those filters yet"
            description="The archive is small by design. Try a broader category, or clear the filters to see everything."
            action={
              <button type="button" onClick={clear} className="btn-base btn-ghost">
                Clear filters
              </button>
            }
          />
        ) : (
          <SoundGrid recordings={filtered} />
        )}
      </section>
    </div>
  );
}
