import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { StoryCard } from "@/components/stories/StoryCard";
import { Reveal } from "@/components/ui/reveal";
import { stories } from "@/data/stories";

export function StoriesPreview() {
  return (
    <section className="shell border-t border-border py-24 sm:py-32">
      <Reveal className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-primary">Disappearing sounds</p>
          <h2 className="mt-5 text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground">
            Some sounds exist only in memory.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-[1.0625rem] leading-relaxed text-muted-foreground">
            Five essays about listening to things that are on their way out — written for this
            archive as demonstration concepts, not reportage.
          </p>
          <Link
            to="/stories"
            className="link-underline meta mt-6 inline-flex items-center gap-2 text-foreground"
          >
            All stories
            <ArrowRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </Reveal>

      <div className="mt-20 space-y-24">
        {stories.slice(0, 3).map((story, i) => (
          <Reveal key={story.id}>
            <StoryCard story={story} flipped={i % 2 === 1} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
