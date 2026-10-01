import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check, Heart, MapPin, Share2 } from "lucide-react";
import { useState } from "react";

import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { SoundGrid } from "@/components/sounds/SoundGrid";
import { Reveal } from "@/components/ui/reveal";
import { WORLD_HEIGHT, WORLD_PATHS, WORLD_WIDTH, projectToMap } from "@/data/world-map";
import { getRecording, relatedRecordings } from "@/data/recordings";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCoords, formatDate, formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sounds/$slug")({
  loader: ({ params }) => {
    const recording = getRecording(params.slug);
    if (!recording) throw notFound();
    return { recording };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Recording unavailable — Echo Atlas" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { recording } = loaderData;
    return {
      meta: [
        { title: `${recording.title} — Echo Atlas` },
        { name: "description", content: recording.description },
        { property: "og:title", content: `${recording.title} — Echo Atlas` },
        { property: "og:description", content: recording.description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: SoundPage,
});

function SoundPage() {
  const { recording } = Route.useLoaderData();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [shared, setShared] = useState(false);
  const related = relatedRecordings(recording, 3);
  const saved = isFavorite(recording.id);
  const point = projectToMap(recording.latitude, recording.longitude);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = { title: `${recording.title} — Echo Atlas`, text: recording.description, url };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2400);
    } catch {
      /* the user dismissed the share sheet — nothing to report */
    }
  };

  return (
    <article className="pt-[4.5rem]">
      <header className="relative isolate flex min-h-[68vh] items-end overflow-hidden">
        <img
          src={recording.image}
          alt={recording.imageAlt}
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 size-full object-cover opacity-55"
        />
        <div className="hero-veil absolute inset-0 -z-10" />
        <div className="shell w-full pb-14">
          <p className="eyebrow text-primary">
            {recording.category} · {recording.country}
          </p>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.97] text-foreground">
            {recording.title}
          </h1>
          <p className="meta mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{recording.location}</span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            <span>
              {recording.audioUrl ? formatTime(recording.duration) : "Recording wanted"}
            </span>
            <span aria-hidden="true" className="h-px w-8 bg-border-strong" />
            <span>{formatDate(recording.recordedAt)}</span>
          </p>
        </div>
      </header>

      <section className="shell border-b border-border py-10">
        <AudioPlayer recording={recording} size="lg" />
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => toggleFavorite(recording.id)}
            aria-pressed={saved}
            className={cn("btn-base", saved ? "btn-primary" : "btn-ghost")}
          >
            <Heart className={cn("size-4", saved && "fill-current")} strokeWidth={1.5} />
            {saved ? "Saved to your collection" : "Save to collection"}
          </button>
          <button type="button" onClick={share} className="btn-base btn-ghost">
            {shared ? (
              <Check className="size-4" strokeWidth={1.5} />
            ) : (
              <Share2 className="size-4" strokeWidth={1.5} />
            )}
            {shared ? "Link copied" : "Share"}
          </button>
        </div>
      </section>

      <div className="shell grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          {recording.story.map((paragraph, i) => (
            <p
              key={i}
              className={cn(
                "text-muted-foreground",
                i === 0
                  ? "font-display text-[clamp(1.5rem,3vw,2rem)] leading-snug text-foreground"
                  : "mt-6 text-[1.0625rem] leading-[1.75]",
              )}
            >
              {paragraph}
            </p>
          ))}

          <p className="meta mt-12 border-l border-sand/60 pl-4 normal-case tracking-normal">
            Source: {recording.source.label}
            {recording.source.url ? (
              <>
                {" "}
                <a
                  href={recording.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-primary"
                >
                  View source
                </a>
              </>
            ) : null}
          </p>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <h2 className="eyebrow">Where it was heard</h2>
          <div className="mt-5 border border-border bg-[oklch(0.17_0.014_245)]">
            <svg
              role="img"
              aria-label={`Map showing ${recording.location}`}
              viewBox={`${point.x - 110} ${point.y - 70} 220 140`}
              className="aspect-[22/14] w-full"
            >
              <g
                fill="oklch(0.24 0.016 243)"
                stroke="oklch(1 0 0 / 0.14)"
                strokeWidth={0.3}
              >
                {WORLD_PATHS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              <circle cx={point.x} cy={point.y} r={7} fill="oklch(0.82 0.1 178 / 0.18)" />
              <circle
                cx={point.x}
                cy={point.y}
                r={2.6}
                fill="oklch(0.82 0.1 178)"
                stroke="oklch(0.14 0.012 250)"
                strokeWidth={0.8}
              />
              <rect
                x={0}
                y={0}
                width={WORLD_WIDTH}
                height={WORLD_HEIGHT}
                fill="none"
                pointerEvents="none"
              />
            </svg>
            <p className="meta border-t border-border px-4 py-3">
              <MapPin className="mr-2 inline size-3.5 text-primary" strokeWidth={1.5} />
              {formatCoords(recording.latitude, recording.longitude)}
            </p>
          </div>

          <dl className="mt-8 space-y-4 border-t border-border pt-6">
            <div>
              <dt className="eyebrow">Tags</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {recording.tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/explore" className="btn-base btn-ghost">
              <ArrowLeft className="size-4" strokeWidth={1.5} />
              Back to Explore
            </Link>
            <Link to="/atlas" className="btn-base btn-ghost">
              Explore location
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="shell border-t border-border py-20">
          <Reveal>
            <h2 className="eyebrow text-primary">Related recordings</h2>
            <p className="mt-4 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] text-foreground">
              Keep listening.
            </p>
          </Reveal>
          <div className="mt-10">
            <SoundGrid recordings={related} editorial={false} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
