import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, Pause, Play, X } from "lucide-react";

import { useAudio } from "@/components/audio/AudioProvider";
import { Waveform } from "@/components/audio/Waveform";
import { formatTime } from "@/lib/format";

export function MiniPlayer() {
  const audio = useAudio();
  const recording = audio.current;
  const visible = Boolean(recording) && audio.status !== "idle";

  return (
    <AnimatePresence>
      {visible && recording ? (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Now playing"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-xl"
        >
          <div className="shell flex items-center gap-3 py-3 sm:gap-5">
            <img
              src={recording.image}
              alt=""
              width={96}
              height={96}
              loading="lazy"
              className="size-11 shrink-0 object-cover sm:size-12"
            />

            <button
              type="button"
              onClick={() => audio.toggle(recording)}
              aria-label={audio.status === "playing" ? "Pause" : "Play"}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-primary/50 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {audio.status === "playing" ? (
                <Pause className="size-4" strokeWidth={1.5} />
              ) : (
                <Play className="size-4 translate-x-px" strokeWidth={1.5} />
              )}
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-foreground">{recording.title}</p>
              <p className="meta truncate">
                {recording.location} · {formatTime(audio.currentTime)}
                {audio.duration ? ` / ${formatTime(audio.duration)}` : ""}
              </p>
            </div>

            <div className="hidden w-48 lg:block xl:w-72">
              <Waveform
                seed={recording.slug}
                bars={48}
                size="sm"
                playing={audio.status === "playing"}
                progress={audio.duration ? audio.currentTime / audio.duration : 0}
                onSeekRatio={audio.duration ? audio.seekRatio : undefined}
              />
            </div>

            <Link
              to="/sounds/$slug"
              params={{ slug: recording.slug }}
              aria-label={`Open the full page for ${recording.title}`}
              className="grid size-10 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-primary"
            >
              <Maximize2 className="size-4" strokeWidth={1.5} />
            </Link>

            <button
              type="button"
              onClick={audio.stop}
              aria-label="Stop playback and close the player"
              className="grid size-10 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="h-px w-full bg-border">
            <div
              className="h-px bg-primary transition-[width] duration-300"
              style={{
                width: audio.duration
                  ? `${Math.min(100, (audio.currentTime / audio.duration) * 100)}%`
                  : "0%",
              }}
            />
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
