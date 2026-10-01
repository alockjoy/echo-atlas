import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { useAudio } from "@/components/audio/AudioProvider";
import { Reveal } from "@/components/ui/reveal";
import { featuredRecording } from "@/data/recordings";
import { formatCoords, formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FeaturedSection() {
  const audio = useAudio();
  const playing = audio.isPlayingRecording(featuredRecording);

  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden bg-elevated">
            <img
              src={featuredRecording.image}
              alt={featuredRecording.imageAlt}
              loading="lazy"
              width={1600}
              height={1200}
              className={cn(
                "aspect-[4/3] w-full object-cover transition-[transform,opacity] duration-[2000ms] ease-out",
                playing ? "scale-[1.04] opacity-100" : "scale-100 opacity-85",
              )}
            />
            <div className="image-veil opacity-50" />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="eyebrow text-primary">Featured recording</p>
          <h2 className="mt-5 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] text-foreground">
            Listen closer.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted-foreground">
            {featuredRecording.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-y-4 border-t border-border pt-6">
            <div>
              <dt className="eyebrow">Place</dt>
              <dd className="mt-1 text-sm text-foreground">{featuredRecording.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Category</dt>
              <dd className="mt-1 text-sm text-foreground">{featuredRecording.category}</dd>
            </div>
            <div>
              <dt className="eyebrow">Coordinates</dt>
              <dd className="mt-1 font-mono text-xs text-muted-foreground">
                {formatCoords(featuredRecording.latitude, featuredRecording.longitude)}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Recorded</dt>
              <dd className="mt-1 font-mono text-xs text-muted-foreground">
                {formatDate(featuredRecording.recordedAt)}
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <AudioPlayer recording={featuredRecording} />
          </div>

          <Link
            to="/sounds/$slug"
            params={{ slug: featuredRecording.slug }}
            className="link-underline meta mt-8 inline-flex items-center gap-2 text-foreground"
          >
            Open the full entry
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
