import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { SoundGrid } from "@/components/sounds/SoundGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { getRecordingsByIds } from "@/data/recordings";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Saved Sounds — Echo Atlas" },
      {
        name: "description",
        content:
          "Your own collection of saved recordings from the Echo Atlas archive, kept in this browser.",
      },
      { property: "og:title", content: "Saved Sounds — Echo Atlas" },
      {
        property: "og:description",
        content: "The recordings you chose to keep close.",
      },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { favorites, clearFavorites, ready } = useFavorites();
  const [confirming, setConfirming] = useState(false);
  const saved = getRecordingsByIds(favorites);

  return (
    <div className="pt-[4.5rem]">
      <section className="shell pt-12 sm:pt-16">
        <p className="eyebrow text-primary">Your collection</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground lg:col-span-7">
            The sounds you kept.
          </h1>
          <p className="text-[0.975rem] leading-relaxed text-muted-foreground lg:col-span-5">
            Saved entries live in this browser only — no account, nothing sent anywhere. They stay
            here when you come back.
          </p>
        </div>
      </section>

      <section className="shell mt-10 flex flex-wrap items-center gap-4 border-y border-border py-4">
        <p className="meta" role="status">
          {ready ? `${saved.length} ${saved.length === 1 ? "recording" : "recordings"} saved` : "Loading your collection…"}
        </p>
        {saved.length > 0 ? (
          <div className="ml-auto flex items-center gap-3">
            {confirming ? (
              <>
                <p className="meta normal-case tracking-normal text-foreground">
                  Remove all saved recordings?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearFavorites();
                    setConfirming(false);
                  }}
                  className="chip chip-active"
                >
                  Yes, clear
                </button>
                <button type="button" onClick={() => setConfirming(false)} className="chip">
                  Keep them
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirming(true)}
                className="meta link-underline text-foreground"
              >
                Clear collection
              </button>
            )}
          </div>
        ) : null}
      </section>

      <section className="shell mt-10 pb-10">
        {!ready ? null : saved.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            description="Tap the heart on any recording and it will wait for you here — a small, private shelf of sounds."
            action={
              <Link to="/explore" className="btn-base btn-primary">
                Explore the archive
              </Link>
            }
          />
        ) : (
          <SoundGrid recordings={saved} />
        )}
      </section>
    </div>
  );
}
