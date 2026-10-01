import { useMemo, useRef } from "react";

import { seededBars } from "@/lib/format";
import { cn } from "@/lib/utils";

interface WaveformProps {
  seed: string;
  bars?: number;
  /** 0..1 playback position. */
  progress?: number;
  playing?: boolean;
  onSeekRatio?: ((ratio: number) => void) | undefined;
  className?: string;
  /** Visual size of the bars. */
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 gap-px sm:gap-[2px]",
  md: "h-16 gap-px sm:gap-[3px]",
  lg: "h-20 gap-px sm:h-28 sm:gap-[3px]",
};

export function Waveform({
  seed,
  bars = 72,
  progress = 0,
  playing = false,
  onSeekRatio,
  className,
  size = "md",
}: WaveformProps) {
  const values = useMemo(() => seededBars(seed, bars), [seed, bars]);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePointer = (clientX: number) => {
    if (!onSeekRatio || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    onSeekRatio(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
  };

  const interactive = Boolean(onSeekRatio);

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      onClick={interactive ? (e) => handlePointer(e.clientX) : undefined}
      className={cn(
        "flex w-full min-w-0 items-center overflow-hidden",
        sizes[size],
        interactive && "cursor-pointer",
        className,
      )}
    >
      {values.map((v, i) => {
        const played = i / values.length <= progress;
        return (
          <span
            key={i}
            className={cn(
              "flex-1 origin-center rounded-full transition-colors duration-500",
              played ? "bg-primary" : "bg-border-strong",
              playing && "animate-[bar-breathe_1.8s_ease-in-out_infinite]",
            )}
            style={{
              height: `${Math.round(v * 100)}%`,
              minWidth: 1,
              animationDelay: playing ? `${(i % 12) * 90}ms` : undefined,
              opacity: played ? 1 : 0.7,
            }}
          />
        );
      })}
    </div>
  );
}
