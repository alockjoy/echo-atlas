import { SoundCard } from "@/components/sounds/SoundCard";
import { useAudio } from "@/components/audio/AudioProvider";
import { useFavorites } from "@/hooks/useFavorites";
import type { Recording } from "@/data/recordings";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

interface SoundGridProps {
  recordings: Recording[];
  /** Editorial rhythm: every fifth card spans two columns. */
  editorial?: boolean;
  className?: string;
}

export function SoundGrid({ recordings, editorial = true, className }: SoundGridProps) {
  const audio = useAudio();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <ul className={cn("grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3", className)}>
      {recordings.map((recording, index) => {
        const wide = editorial && index % 7 === 0 && index !== 0;
        const tall = editorial && index % 7 === 3;
        return (
          <Reveal
            as="li"
            key={recording.id}
            delay={Math.min(index, 5) * 0.05}
            className={cn("bg-background", wide && "lg:col-span-2")}
          >
            <SoundCard
              recording={recording}
              variant={wide ? "wide" : tall ? "tall" : "default"}
              isPlaying={audio.isPlayingRecording(recording)}
              isFavorite={isFavorite(recording.id)}
              onPlay={(r) => audio.toggle(r)}
              onFavorite={(r) => toggleFavorite(r.id)}
            />
          </Reveal>
        );
      })}
    </ul>
  );
}
