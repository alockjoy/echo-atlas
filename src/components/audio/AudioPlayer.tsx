import { Heart, Pause, Play, Volume2, VolumeX } from "lucide-react";

import { Waveform } from "@/components/audio/Waveform";
import { useAudio } from "@/components/audio/AudioProvider";
import { useFavorites } from "@/hooks/useFavorites";
import type { Recording } from "@/data/recordings";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  recording: Recording;
  size?: "md" | "lg";
  className?: string;
}

export function AudioPlayer({ recording, size = "md", className }: AudioPlayerProps) {
  const audio = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isCurrent = audio.isCurrent(recording);
  const playing = audio.isPlayingRecording(recording);
  const unavailable = !recording.audioUrl;
  const liveDuration = isCurrent ? audio.duration : recording.duration;
  const position = isCurrent ? audio.currentTime : 0;
  const progress = liveDuration ? Math.min(1, position / liveDuration) : 0;
  const saved = isFavorite(recording.id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => !unavailable && audio.toggle(recording)}
          disabled={unavailable}
          aria-label={
            unavailable
              ? `No recording available for ${recording.title}`
              : playing
                ? `Pause ${recording.title}`
                : `Play ${recording.title}`
          }
          className={cn(
            "grid shrink-0 place-items-center rounded-full border transition-all duration-300",
            size === "lg" ? "size-16 sm:size-20" : "size-13 sm:size-14",
            unavailable
              ? "cursor-not-allowed border-border text-subtle"
              : "border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground",
          )}
        >
          {playing ? (
            <Pause className={size === "lg" ? "size-7" : "size-5"} strokeWidth={1.5} />
          ) : (
            <Play
              className={cn(size === "lg" ? "size-7" : "size-5", "translate-x-[1px]")}
              strokeWidth={1.5}
            />
          )}
        </button>

        <div className="min-w-0 flex-1">
          <Waveform
            seed={recording.slug}
            bars={size === "lg" ? 96 : 64}
            progress={progress}
            playing={playing}
            size={size === "lg" ? "lg" : "md"}
            onSeekRatio={isCurrent && liveDuration ? audio.seekRatio : undefined}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 sm:min-w-[16rem]">
          <span className="sr-only">Seek within {recording.title}</span>
          <span className="meta tabular-nums">{formatTime(position)}</span>
          <input
            type="range"
            min={0}
            max={liveDuration ?? 0}
            step={0.5}
            value={position}
            disabled={unavailable || !isCurrent || !liveDuration}
            onChange={(e) => audio.seek(Number(e.target.value))}
            className="h-1 min-w-0 flex-1 appearance-none rounded-full bg-border-strong accent-primary disabled:opacity-40"
          />
          <span className="meta tabular-nums">{formatTime(liveDuration)}</span>
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={audio.toggleMute}
            aria-label={audio.muted ? "Unmute playback" : "Mute playback"}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {audio.muted ? (
              <VolumeX className="size-4" strokeWidth={1.5} />
            ) : (
              <Volume2 className="size-4" strokeWidth={1.5} />
            )}
          </button>
          <label className="flex items-center gap-2">
            <span className="sr-only">Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={audio.muted ? 0 : audio.volume}
              onChange={(e) => audio.setVolume(Number(e.target.value))}
              className="h-1 w-20 appearance-none rounded-full bg-border-strong accent-primary"
            />
          </label>

          <button
            type="button"
            onClick={() => toggleFavorite(recording.id)}
            aria-pressed={saved}
            aria-label={saved ? "Remove from your collection" : "Save to your collection"}
            className={cn(
              "chip",
              saved && "chip-active",
              "transition-transform active:scale-95",
            )}
          >
            <Heart className={cn("size-3.5", saved && "fill-current")} strokeWidth={1.5} />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {unavailable ? (
        <p className="meta mt-4 border-l border-sand/60 pl-3 text-left normal-case tracking-normal">
          No audio held for this entry yet — the place is catalogued, the recording is still wanted.
        </p>
      ) : null}

      {isCurrent && audio.status === "error" && audio.errorMessage ? (
        <p
          role="status"
          className="meta mt-4 border-l border-destructive pl-3 normal-case tracking-normal text-foreground"
        >
          {audio.errorMessage}
        </p>
      ) : null}

      {isCurrent && audio.status === "loading" ? (
        <p role="status" className="meta mt-4">
          Loading audio…
        </p>
      ) : null}
    </div>
  );
}
