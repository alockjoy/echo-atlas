import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { FeaturedSection } from "@/components/home/FeaturedSection";
import { Hero } from "@/components/home/Hero";
import { StoriesPreview } from "@/components/home/StoriesPreview";
import { Reveal } from "@/components/ui/reveal";
import { recordings } from "@/data/recordings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Echo Atlas — The Living Archive of Disappearing Sounds" },
      {
        name: "description",
        content:
          "Echo Atlas is a digital archive of place and sound: explore a world map of field recordings, listen, and read the stories behind them.",
      },
      { property: "og:title", content: "Echo Atlas — The Living Archive of Disappearing Sounds" },
      {
        property: "og:description",
        content:
          "Every place has a voice. Explore a map of field recordings and the stories behind them.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const held = recordings.filter((r) => r.audioUrl).length;

  return (
    <>
      <Hero />
      <FeaturedSection />

      <section className="shell border-t border-border py-24 sm:py-32">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow text-primary">The atlas</p>
            <h2 className="mt-5 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground">
              A map you listen to.
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground">
              Every entry is pinned to the place it came from. Open the atlas, choose a point, and
              hear what that corner of the world sounds like.
            </p>
            <Link to="/atlas" className="btn-base btn-primary mt-9">
              Open the Atlas
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          </div>

          <dl className="grid grid-cols-3 gap-6 border-t border-border pt-8 lg:col-span-5 lg:col-start-8 lg:border-t-0 lg:pt-0">
            <div>
              <dt className="eyebrow">Places</dt>
              <dd className="mt-2 font-display text-4xl text-foreground">{recordings.length}</dd>
            </div>
            <div>
              <dt className="eyebrow">Recordings held</dt>
              <dd className="mt-2 font-display text-4xl text-primary">{held}</dd>
            </div>
            <div>
              <dt className="eyebrow">Still wanted</dt>
              <dd className="mt-2 font-display text-4xl text-sand">
                {recordings.length - held}
              </dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <StoriesPreview />
    </>
  );
}
