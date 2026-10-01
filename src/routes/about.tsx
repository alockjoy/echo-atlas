import { createFileRoute, Link } from "@tanstack/react-router";

import aboutRecorder from "@/assets/about-recorder.jpg";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Echo Atlas" },
      {
        name: "description",
        content:
          "Why sound matters, how this archive is put together, and the editorial principles behind Echo Atlas.",
      },
      { property: "og:title", content: "About — Echo Atlas" },
      { property: "og:description", content: "Listening is a way of remembering." },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    heading: "Audio is real or absent",
    body: "Every player on this site either plays an actual recording or says plainly that the archive does not hold one. Nothing simulates playback.",
  },
  {
    heading: "No invented facts",
    body: "The essays are reflective writing. We do not attach dates, statistics, interviews or historical events to them as if they were verified reporting.",
  },
  {
    heading: "Places, then claims",
    body: "A place can be worth preserving without being formally endangered. We write “sounds worth preserving” rather than making claims we cannot source.",
  },
  {
    heading: "Credit where it is due",
    body: "Recordings held here come from openly licensed field recordings, and each entry links back to its source.",
  },
];

function AboutPage() {
  return (
    <div className="pt-[4.5rem]">
      <section className="shell pt-12 sm:pt-16">
        <p className="eyebrow text-primary">About</p>
        <h1 className="mt-5 max-w-[22ch] text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1] text-foreground">
          Listening is a way of remembering.
        </h1>
      </section>

      <Reveal className="shell mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative overflow-hidden bg-elevated lg:col-span-6">
          <img
            src={aboutRecorder}
            alt="A handheld field recorder resting on a weathered wooden surface in low light"
            loading="lazy"
            width={1280}
            height={1600}
            className="aspect-[4/5] w-full object-cover opacity-85"
          />
          <div className="image-veil opacity-50" />
        </div>

        <div className="lg:col-span-6">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-snug text-foreground">
            Why sound matters
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            Photographs tell you what a place looked like. Sound tells you what it was like to
            stand there — the distance of traffic, the pitch of a room, how much water was moving
            nearby. It is the sense we document least and lose most quietly.
          </p>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            Echo Atlas exists to hold a small number of those recordings carefully: each one mapped
            to its place, described in plain language, and set beside writing about why it is worth
            hearing twice.
          </p>

          <h2 className="mt-14 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-snug text-foreground">
            How the archive is collected
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            Entries begin as places. A place is catalogued with its coordinates, its category and a
            description of what you would hear if you stood there. When an openly licensed field
            recording of that place exists, it is attached and credited. When it does not, the entry
            stays in the atlas marked as a recording still wanted.
          </p>
          <p className="mt-5 text-[1.0625rem] leading-[1.75] text-muted-foreground">
            That second group matters. An archive that only shows what it already has hides its own
            gaps.
          </p>
        </div>
      </Reveal>

      <section className="shell mt-24 border-t border-border pt-16">
        <h2 className="eyebrow text-primary">Editorial principles</h2>
        <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.heading} delay={i * 0.05} className="bg-background p-7 sm:p-9">
              <h3 className="font-display text-2xl text-foreground">{p.heading}</h3>
              <p className="mt-4 text-[0.975rem] leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell mt-24 grid gap-8 border-t border-border py-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug text-foreground">
            Get in touch
          </h2>
          <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-muted-foreground">
            Echo Atlas is an independent demonstration project. It has no organisational partners
            or external contributors — if you have a recording of a place you think belongs here,
            the archive would like to hear it.
          </p>
          <a href="mailto:hello@echoatlas.example" className="btn-base btn-primary mt-8">
            hello@echoatlas.example
          </a>
          <p className="meta mt-4 normal-case tracking-normal">
            A placeholder address for this demonstration — replace it with a real inbox before
            publishing.
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 className="eyebrow">Start somewhere</h2>
          <ul className="mt-6 space-y-3">
            {[
              { to: "/atlas", label: "Open the Atlas" },
              { to: "/explore", label: "Browse every entry" },
              { to: "/stories", label: "Read the stories" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="link-underline font-display text-2xl text-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
