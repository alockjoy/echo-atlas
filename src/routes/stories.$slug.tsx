import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { Reveal } from "@/components/ui/reveal";
import { getRecordingsByIds } from "@/data/recordings";
import { getStory } from "@/data/stories";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Story unavailable — Echo Atlas" }, { name: "robots", content: "noindex" }],
      };
    }
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Echo Atlas` },
        { name: "description", content: story.excerpt },
        { property: "og:title", content: `${story.title} — Echo Atlas` },
        { property: "og:description", content: story.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: StoryPage,
});

function StoryPage() {
  const { story } = Route.useLoaderData();
  const related = getRecordingsByIds(story.relatedRecordingIds);

  return (
    <article className="pt-[4.5rem]">
      <header className="relative isolate flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={story.coverImage}
          alt={story.coverAlt}
          width={1920}
          height={1280}
          className="absolute inset-0 -z-10 size-full object-cover opacity-55"
        />
        <div className="hero-veil absolute inset-0 -z-10" />
        <div className="shell w-full pb-14">
          <p className="eyebrow text-primary">
            {story.category} · {story.location}
          </p>
          <h1 className="mt-5 max-w-[22ch] text-[clamp(2.5rem,7vw,5rem)] leading-[0.98] text-foreground">
            {story.title}
          </h1>
          <p className="meta mt-6">{story.readingTime} min read</p>
        </div>
      </header>

      <div className="shell grid gap-12 py-20 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-2">
          <p className="font-display text-[clamp(1.5rem,3vw,2.125rem)] leading-snug text-foreground">
            {story.intro}
          </p>

          {story.content.map((section) => (
            <section key={section.heading} className="mt-14">
              <h2 className="eyebrow text-primary">{section.heading}</h2>
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-[1.0625rem] leading-[1.75] text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <p className="meta mt-14 border-l border-sand/60 pl-4 normal-case tracking-normal">
            {story.source}
          </p>

          <Link to="/stories" className="btn-base btn-ghost mt-12">
            <ArrowLeft className="size-4" strokeWidth={1.5} />
            All stories
          </Link>
        </div>

        <aside className="lg:col-span-3 lg:col-start-10">
          <h2 className="eyebrow">Listen alongside</h2>
          <div className="mt-6 space-y-10">
            {related.map((recording) => (
              <Reveal key={recording.id}>
                <Link
                  to="/sounds/$slug"
                  params={{ slug: recording.slug }}
                  className="block font-display text-xl text-foreground transition-colors hover:text-primary"
                >
                  {recording.title}
                </Link>
                <p className="meta mt-1">{recording.location}</p>
                <div className="mt-4">
                  <AudioPlayer recording={recording} />
                </div>
              </Reveal>
            ))}
            {related.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recordings in the archive are paired with this essay yet.
              </p>
            ) : null}
          </div>
        </aside>
      </div>
    </article>
  );
}
