import { createFileRoute } from "@tanstack/react-router";

import { StoryCard } from "@/components/stories/StoryCard";
import { Reveal } from "@/components/ui/reveal";
import { stories } from "@/data/stories";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Stories — Echo Atlas" },
      {
        name: "description",
        content:
          "Editorial essays about sounds that are on their way out: wooden hulls, old railways, market voices, rain in forests, handmade instruments.",
      },
      { property: "og:title", content: "Stories — Echo Atlas" },
      {
        property: "og:description",
        content: "Some sounds exist only in memory.",
      },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <div className="pt-[4.5rem]">
      <section className="shell pt-12 sm:pt-16">
        <p className="eyebrow text-primary">Disappearing sounds</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] text-foreground lg:col-span-7">
            Some sounds exist only in memory.
          </h1>
          <p className="text-[0.975rem] leading-relaxed text-muted-foreground lg:col-span-5">
            Five essays written for this archive. They are demonstration concepts about listening —
            reflective writing rather than reportage, with no invented dates, figures or interviews.
          </p>
        </div>
      </section>

      <section className="shell mt-20 space-y-24 border-t border-border pt-20 pb-10">
        {stories.map((story, i) => (
          <Reveal key={story.id}>
            <StoryCard story={story} flipped={i % 2 === 1} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
