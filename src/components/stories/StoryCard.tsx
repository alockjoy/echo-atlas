import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { Story } from "@/data/stories";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  story: Story;
  /** Flip the image to the other side for alternating editorial rows. */
  flipped?: boolean;
}

export function StoryCard({ story, flipped = false }: StoryCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate grid items-center gap-8 lg:grid-cols-12 lg:gap-12",
        flipped && "lg:[&>*:first-child]:order-2",
      )}
    >
      <div className="relative overflow-hidden bg-elevated lg:col-span-7">
        <img
          src={story.coverImage}
          alt={story.coverAlt}
          loading="lazy"
          width={1280}
          height={960}
          className="aspect-[4/3] w-full object-cover opacity-85 transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.03] group-hover:opacity-100"
        />
        <div className="image-veil opacity-60" />
      </div>

      <div className="lg:col-span-5">
        <p className="meta flex items-center gap-3">
          <span className="text-primary">{story.category}</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span>{story.location}</span>
        </p>

        <h3 className="mt-5 text-[2rem] leading-[1.05] text-foreground sm:text-[2.75rem]">
          <Link
            to="/stories/$slug"
            params={{ slug: story.slug }}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {story.title}
          </Link>
        </h3>

        <p className="mt-5 max-w-prose text-[0.975rem] leading-relaxed text-muted-foreground">
          {story.excerpt}
        </p>

        <p className="meta mt-6 flex items-center gap-3">
          <span>{story.readingTime} min read</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          <span className="inline-flex items-center gap-1.5 text-foreground transition-colors group-hover:text-primary">
            Listen to the story
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </span>
        </p>
      </div>
    </article>
  );
}
