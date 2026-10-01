import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Pause, Play } from "lucide-react";

import heroForest from "@/assets/hero-forest.jpg";
import { useAudio } from "@/components/audio/AudioProvider";
import { Waveform } from "@/components/audio/Waveform";
import { featuredRecording } from "@/data/recordings";
import { formatTime } from "@/lib/format";

export function Hero() {
  const reduced = useReducedMotion();
  const audio = useAudio();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 120]);
  const textY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -40]);

  const playing = audio.isPlayingRecording(featuredRecording);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden pt-28">
      <motion.img
        src={heroForest}
        alt="Mist drifting through a dense dark forest at first light"
        style={{ y: imageY }}
        width={1920}
        height={1280}
        className="absolute inset-0 -z-10 size-full scale-110 object-cover opacity-55"
      />
      <div className="hero-veil absolute inset-0 -z-10" />

      <motion.div style={{ y: textY }} className="shell w-full pb-16 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="eyebrow text-primary"
            >
              A digital archive of place &amp; sound
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-6 max-w-[18ch] text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.95] tracking-[-0.015em] text-foreground"
            >
              Some sounds should never disappear.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground"
            >
              Echo Atlas collects the voices of places — tide against a reef, a night market at
              full volume, a wooden floor that sings when walked on. Every place has a voice. Some
              voices are slowly disappearing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link to="/atlas" className="btn-base btn-primary">
                Explore the Atlas
              </Link>
              <Link to="/stories" className="btn-base btn-ghost">
                Discover the Stories
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="lg:col-span-5"
          >
            <div className="border border-border bg-background/50 p-5 backdrop-blur-md sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="eyebrow flex items-center gap-2 text-primary">
                  <span className="relative grid size-2 place-items-center">
                    <span className="absolute size-2 rounded-full bg-primary" />
                    {playing ? (
                      <span className="pulse-ring absolute size-2 rounded-full bg-primary/60" />
                    ) : null}
                  </span>
                  {playing ? "Now listening" : "In the archive"}
                </p>
                <p className="meta tabular-nums">
                  {formatTime(audio.isCurrent(featuredRecording) ? audio.currentTime : 0)} /{" "}
                  {formatTime(featuredRecording.duration)}
                </p>
              </div>

              <div className="mt-5 flex items-start gap-4">
                <button
                  type="button"
                  onClick={() => audio.toggle(featuredRecording)}
                  aria-label={playing ? "Pause the featured recording" : "Play the featured recording"}
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {playing ? (
                    <Pause className="size-4" strokeWidth={1.5} />
                  ) : (
                    <Play className="size-4 translate-x-px" strokeWidth={1.5} />
                  )}
                </button>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-xl text-foreground">
                    {featuredRecording.title}
                  </h2>
                  <p className="meta mt-1 truncate">
                    {featuredRecording.location} · {featuredRecording.category}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <Waveform
                  seed={featuredRecording.slug}
                  bars={56}
                  size="sm"
                  playing={playing}
                  progress={
                    audio.isCurrent(featuredRecording) && audio.duration
                      ? Math.min(1, audio.currentTime / audio.duration)
                      : 0
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="meta mt-14 flex items-center gap-2"
        >
          <ArrowDown className="size-3.5 text-primary" strokeWidth={1.5} />
          Scroll to listen closer
        </motion.p>
      </motion.div>
    </section>
  );
}
