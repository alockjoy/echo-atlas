import { Link } from "@tanstack/react-router";
import { Heart, Pause, Play } from "lucide-react";

import type { Recording } from "@/data/recordings";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SoundCardProps {
  recording: Recording;
  isPlaying: boolean;
  isFavorite: boolean;
  onPlay: (recording: Recording) => void;
  onFavorite: (recording: Recording) => void;
  /** Visual weight inside an editorial grid. */
  variant?: "default" | "wide" | "tall";
}

const mediaHeights = {
  default: "aspect-[4/3]",
  wide: "aspect-[16/9] sm:aspect-[21/9]",
  tall: "aspect-[4/5]",
};

export function SoundCard({
  recording,
  isPlaying,
  isFavorite,
  onPlay,
  onFavorite,
  variant = "default",
}: SoundCardProps) {
  const unavailable = !recording.audioUrl;

  return (
    <article className="group relative isolate flex h-full flex-col border border-border bg-surface/40 transition-colors duration-500 hover:border-border-strong">
      <div className={cn("relative overflow-hidden bg-elevated", mediaHeights[variant])}>
        <img
          src={recording.image}
          alt={recording.imageAlt}
          loading="lazy"
          width={1280}
          height={864}
          className="size-full object-cover opacity-80 transition-[transform,opacity] duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
        />
        <div className="image-veil opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <button
            type="button"
            onClick={() => onPlay(recording)}
            disabled={unavailable}
            aria-label={
              unavailable
                ? `No recording held for ${recording.title}`
                : isPlaying
                  ? `Pause ${recording.title}`
                  : `Play ${recording.title}`
            }
            className={cn(
              "relative z-20 grid size-11 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300",
              unavailable
                ? "cursor-not-allowed border-border bg-background/50 text-subtle"
                : "border-primary/40 bg-background/60 text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
            )}
          >
            {isPlaying ? (
              <Pause className="size-4" strokeWidth={1.5} />
            ) : (
              <Play className="size-4 translate-x-px" strokeWidth={1.5} />
            )}
          </button>

          <button
            type="button"
            onClick={() => onFavorite(recording)}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remove ${recording.title} from your collection`
                : `Save ${recording.title} to your collection`
            }
            className={cn(
              "relative z-20 grid size-10 place-items-center rounded-full border backdrop-blur-sm transition-all duration-300 active:scale-90",
              isFavorite
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-background/50 text-muted-foreground hover:text-foreground",
            )}
          >
            <Heart className={cn("size-4", isFavorite && "fill-current")} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <p className="meta flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-primary">{recording.category}</span>
          <span aria-hidden="true" className="text-subtle">
            /
          </span>
          <span>{recording.location}</span>
        </p>

        <h3 className="text-2xl leading-tight text-foreground sm:text-[1.75rem]">
          <Link
            to="/sounds/$slug"
            params={{ slug: recording.slug }}
            className="after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {recording.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {recording.description}
        </p>

        <p className="meta mt-auto flex items-center gap-3 pt-2">
          {unavailable ? (
            <span className="text-sand">Recording wanted</span>
          ) : (
            <span className="tabular-nums">{formatTime(recording.duration)}</span>
          )}
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
          <span>{recording.country}</span>
        </p>
      </div>
    </article>
  );
}
