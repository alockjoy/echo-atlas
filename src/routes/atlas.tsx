import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { LocationPanel } from "@/components/atlas/LocationPanel";
import { SoundMap } from "@/components/atlas/SoundMap";
import { EmptyState } from "@/components/ui/empty-state";
import { ATLAS_CATEGORIES } from "@/data/categories";
import { recordings, type Recording } from "@/data/recordings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atlas")({
  head: () => ({
    meta: [
      { title: "The Atlas — Echo Atlas" },
      {
        name: "description",
        content:
          "An interactive world map of the archive: choose a place and hear what it sounds like, from rainforest canopy to railway platform.",
      },
      { property: "og:title", content: "The Atlas — Echo Atlas" },
      {
        property: "og:description",
        content: "A map you listen to. Choose a point and hear that corner of the world.",
      },
    ],
  }),
  component: AtlasPage,
});

function AtlasPage() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recordings.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesQuery =
        !q ||
        [r.title, r.location, r.country, r.category, ...r.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const selected = visible.find((r) => r.id === selectedId) ?? null;

  const select = (recording: Recording) => setSelectedId(recording.id);

  return (
    <div className="pt-[4.5rem]">
      <section className="shell pt-12 sm:pt-16">
        <p className="eyebrow text-primary">The atlas</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground lg:col-span-7">
            Every point is a place with a voice.
          </h1>
          <p className="text-[0.975rem] leading-relaxed text-muted-foreground lg:col-span-5">
            Pan and zoom the map, then select a marker to read the entry and listen. Teal markers
            hold audio; sand markers are places catalogued while the recording is still wanted.
          </p>
        </div>
      </section>

      <section className="shell mt-10">
        <div className="flex flex-wrap items-center gap-3 border-y border-border py-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {["All", ...ATLAS_CATEGORIES].map((c) => (
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

          <label className="ml-auto flex min-w-[14rem] flex-1 items-center gap-2 border border-border px-3 sm:max-w-xs">
            <Search className="size-4 shrink-0 text-subtle" strokeWidth={1.5} />
            <span className="sr-only">Search places on the map</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search places"
              className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear the map search"
                className="text-subtle transition-colors hover:text-foreground"
              >
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            ) : null}
          </label>

          <p className="meta w-full sm:w-auto" role="status">
            {visible.length} of {recordings.length} places
          </p>
        </div>
      </section>

      <section className="shell mt-6 pb-24">
        {visible.length === 0 ? (
          <EmptyState
            title="No places match those filters"
            description="Try another category, or clear the search to see the whole atlas."
            action={
              <button
                type="button"
                className="btn-base btn-ghost"
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                }}
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="grid gap-px border border-border bg-border lg:grid-cols-12">
            <div className="h-[55vh] min-h-[22rem] bg-background lg:col-span-8 lg:h-[36rem]">
              <SoundMap recordings={visible} selectedId={selectedId} onSelect={select} />
            </div>

            <div className="bg-background lg:col-span-4 lg:h-[36rem]">
              {selected ? (
                <LocationPanel recording={selected} onClose={() => setSelectedId(null)} />
              ) : (
                <div className="flex h-full flex-col justify-between gap-8 p-6">
                  <div>
                    <h2 className="font-display text-2xl text-foreground">Choose a place</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      Select any marker to open its entry, listen to the recording, and move on to
                      nearby places in the archive.
                    </p>
                  </div>
                  <ul className="space-y-px overflow-y-auto">
                    {visible.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() => select(r)}
                          className="flex w-full items-baseline gap-3 border-b border-border py-3 text-left transition-colors hover:text-primary"
                        >
                          <span className="meta w-20 shrink-0">{r.category}</span>
                          <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                            {r.location}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              "size-1.5 shrink-0 rounded-full",
                              r.audioUrl ? "bg-primary" : "bg-sand",
                            )}
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
