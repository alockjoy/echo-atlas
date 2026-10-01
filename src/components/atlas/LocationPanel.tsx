import { Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";

import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { useAudio } from "@/components/audio/AudioProvider";
import type { Recording } from "@/data/recordings";
import { relatedRecordings } from "@/data/recordings";
import { formatCoords, formatTime } from "@/lib/format";

interface LocationPanelProps {
  recording: Recording;
  onClose: () => void;
}

export function LocationPanel({ recording, onClose }: LocationPanelProps) {
  const audio = useAudio();
  const related = relatedRecordings(recording, 3);

  return (
    <div className="flex h-full flex-col overflow-y-auto border-border bg-surface/60 backdrop-blur-xl">
      <div className="relative shrink-0">
        <img
          src={recording.image}
          alt={recording.imageAlt}
          loading="lazy"
          width={1280}
          height={864}
          className="aspect-[16/10] w-full object-cover opacity-85"
        />
        <div className="image-veil" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the location panel"
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
        <div className="absolute inset-x-5 bottom-5">
          <p className="meta text-primary">{recording.category}</p>
          <h2 className="mt-2 text-[1.75rem] leading-tight text-foreground">{recording.title}</h2>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-6 p-5 sm:p-6">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <dt className="eyebrow">Place</dt>
            <dd className="mt-1 text-sm text-foreground">{recording.location}</dd>
          </div>
          <div>
            <dt className="eyebrow">Region</dt>
            <dd className="mt-1 text-sm text-foreground">{recording.country}</dd>
          </div>
          <div>
            <dt className="eyebrow">Coordinates</dt>
            <dd className="mt-1 font-mono text-xs text-muted-foreground">
              {formatCoords(recording.latitude, recording.longitude)}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Length</dt>
            <dd className="mt-1 font-mono text-xs text-muted-foreground">
              {recording.duration ? formatTime(recording.duration) : "No audio held"}
            </dd>
          </div>
        </dl>

        <p className="text-sm leading-relaxed text-muted-foreground">{recording.description}</p>

        <AudioPlayer recording={recording} />

        <div className="rule-top pt-5">
          <h3 className="eyebrow">Nearby in the archive</h3>
          <ul className="mt-4 space-y-3">
            {related.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => audio.play(r)}
                  disabled={!r.audioUrl}
                  className="group/row flex w-full items-center gap-3 text-left disabled:opacity-60"
                >
                  <img
                    src={r.image}
                    alt=""
                    loading="lazy"
                    width={96}
                    height={96}
                    className="size-12 shrink-0 object-cover opacity-80 transition-opacity group-hover/row:opacity-100"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-foreground">{r.title}</span>
                    <span className="meta block truncate">
                      {r.audioUrl ? formatTime(r.duration) : "Recording wanted"} · {r.location}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/sounds/$slug"
          params={{ slug: recording.slug }}
          className="btn-base btn-ghost mt-auto w-full"
        >
          Open full entry
          <ArrowRight className="size-4" strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
