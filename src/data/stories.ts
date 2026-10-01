import fishingBoats from "@/assets/story-fishing-boats.jpg";
import forestRain from "@/assets/story-forest-rain.jpg";
import instruments from "@/assets/story-instruments.jpg";
import marketVoices from "@/assets/story-market-voices.jpg";
import oldRailway from "@/assets/story-old-railway.jpg";

export interface StorySection {
  heading: string;
  paragraphs: string[];
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  coverImage: string;
  coverAlt: string;
  excerpt: string;
  intro: string;
  content: StorySection[];
  readingTime: number;
  relatedRecordingIds: string[];
  source: string;
}

/**
 * Editorial essays written for this archive. They are reflective pieces about
 * listening, not reportage: no dates, statistics, interviews or historical
 * events are presented as verified fact.
 */
export const stories: Story[] = [
  {
    id: "s1",
    slug: "the-last-wooden-fishing-boats",
    title: "The Last Wooden Fishing Boats",
    location: "Northern Atlantic coast",
    category: "Human Stories",
    coverImage: fishingBoats,
    coverAlt: "Weathered wooden fishing boats on a grey pebble shore under overcast sky",
    excerpt:
      "A wooden hull answers the water differently than a fibreglass one. Anyone who has worked on both will tell you so.",
    intro:
      "There is a sound a wooden boat makes at rest that no other kind of boat makes: a slow, hollow knocking as the swell works along the hull, pitched by the volume of air inside it.",
    content: [
      {
        heading: "A hull as a resonator",
        paragraphs: [
          "Wood is compliant. It flexes, it holds moisture, and it rings. Put a hand on a wooden hull in a swell and you can feel the frequency change as the boat settles into the trough.",
          "Replace the material and the voice goes with it. Not worse, not better — simply absent. The new hull is quieter, which is usually counted as an improvement.",
        ],
      },
      {
        heading: "What the harbour used to sound like",
        paragraphs: [
          "A working harbour full of wooden boats had a chorus: dozens of hulls knocking slightly out of phase, ropes creaking, blocks turning.",
          "Listening to a shore like this is a way of counting what is still afloat.",
        ],
      },
      {
        heading: "How to listen",
        paragraphs: [
          "Start with the water in the archive. Train your ear on surf, then on a harbour, then on a single hull.",
          "The point is not nostalgia. It is attention — the kind that notices a sound while it is still there to notice.",
        ],
      },
    ],
    readingTime: 4,
    relatedRecordingIds: ["r1", "r14"],
    source: "Editorial essay written for Echo Atlas.",
  },
  {
    id: "s2",
    slug: "the-rhythm-of-an-old-railway",
    title: "The Rhythm of an Old Railway",
    location: "Rural Europe",
    category: "Historical",
    coverImage: oldRailway,
    coverAlt: "Rusted railway tracks curving into fog beside an old signal post",
    excerpt:
      "Jointed track gives a train its rhythm. Welded rail takes it away and gives back a smooth, continuous rush.",
    intro:
      "Every railway has a meter. It is set by the length of the rails, the spacing of the sleepers, and the speed of the train, and it changes when any of those change.",
    content: [
      {
        heading: "Counting the joints",
        paragraphs: [
          "The four-beat clatter that people associate with trains comes from bogies crossing gaps in jointed rail. Modern continuous welded rail removes the gaps, and with them the beat.",
          "What replaces it is not silence but a wide, steady rush, more like weather than percussion.",
        ],
      },
      {
        heading: "Signals and bells",
        paragraphs: [
          "Mechanical signals had moving parts you could hear: wires, counterweights, the knock of an arm dropping. Their replacements are mute.",
          "A station's acoustic identity is often carried by these small devices rather than by the trains themselves.",
        ],
      },
      {
        heading: "Recording a line",
        paragraphs: [
          "The best railway recordings are made from inside a carriage, where the track, the body of the train and the architecture outside all arrive together.",
          "The archive holds two such recordings. Played back to back, they describe two different centuries of engineering.",
        ],
      },
    ],
    readingTime: 5,
    relatedRecordingIds: ["r2", "r8", "r5"],
    source: "Editorial essay written for Echo Atlas.",
  },
  {
    id: "s3",
    slug: "voices-of-traditional-markets",
    title: "Voices of Traditional Markets",
    location: "Mediterranean",
    category: "Cultural",
    coverImage: marketVoices,
    coverAlt: "Empty covered market hall at dawn with light falling through high windows",
    excerpt:
      "Selling out loud is a skill with technique: pitch, interval, and a pause long enough for an answer.",
    intro:
      "A market call is a performance tuned to a specific street. Change the street and the call changes with it.",
    content: [
      {
        heading: "The architecture does the mixing",
        paragraphs: [
          "Narrow lanes with hard surfaces return a voice quickly and brightly. Covered halls stretch it out. Vendors adjust without thinking about it.",
          "This is why a recording made three streets away sounds like a different trade entirely.",
        ],
      },
      {
        heading: "Overlap as information",
        paragraphs: [
          "Several voices at once is not noise to the people inside it. Regulars can follow one stall across the whole hall.",
          "Listening back, you can learn the geography of a market by which voice gets louder as the microphone moves.",
        ],
      },
      {
        heading: "What disappears quietly",
        paragraphs: [
          "When pricing moves to printed signs and screens, the calling stops. Nothing is announced; the hall simply gets quieter year by year.",
          "The archive keeps one midday recording of a working street market, which is one more than most places have.",
        ],
      },
    ],
    readingTime: 4,
    relatedRecordingIds: ["r3", "r10"],
    source: "Editorial essay written for Echo Atlas.",
  },
  {
    id: "s4",
    slug: "forests-after-the-rain",
    title: "Forests After the Rain",
    location: "Temperate rainforest",
    category: "Nature",
    coverImage: forestRain,
    coverAlt: "Wet dark forest after rain with water on bark and leaves",
    excerpt:
      "The minutes after rain are the most detailed a forest ever sounds: thousands of individual drops, each one placed.",
    intro:
      "During rain a forest is a single broad noise. Afterwards it becomes a set of distinct events, and the space between them opens up.",
    content: [
      {
        heading: "Drip as rhythm",
        paragraphs: [
          "Water leaves the canopy in stages. Leaves release onto branches, branches onto the understorey, understorey onto the floor.",
          "Each surface has its own pitch, which is why post-rain forest sounds tuned.",
        ],
      },
      {
        heading: "Birds return on a schedule",
        paragraphs: [
          "Song resumes in a recognisable order as the air clears. First the closest, boldest voices; then the treeline; then everything else.",
          "A recording that captures the whole return is worth more than a longer one made in settled weather.",
        ],
      },
      {
        heading: "Where to point a microphone",
        paragraphs: [
          "Low and under cover, away from a single loud dripline. The goal is the whole room, not one faucet.",
          "The archive's meadow and canopy recordings make a useful pair: one open, one closed.",
        ],
      },
    ],
    readingTime: 3,
    relatedRecordingIds: ["r6", "r9", "r7"],
    source: "Editorial essay written for Echo Atlas.",
  },
  {
    id: "s5",
    slug: "the-sound-of-handmade-instruments",
    title: "The Sound of Handmade Instruments",
    location: "Workshop",
    category: "Cultural",
    coverImage: instruments,
    coverAlt: "Dim luthier workshop with handmade stringed instruments hanging on a dark wall",
    excerpt:
      "Before an instrument is played it is tapped, scraped and listened to. Most of a maker's work is heard, not seen.",
    intro:
      "A workshop is full of diagnostic sounds: a knuckle on a soundboard, a plane taking a shaving, a brace being tapped to find its note.",
    content: [
      {
        heading: "Tap tones",
        paragraphs: [
          "Makers tap wood to hear its stiffness. The pitch tells them how much more to remove.",
          "It is a measurement taken entirely by ear, and it is transmitted by apprenticeship rather than documentation.",
        ],
      },
      {
        heading: "The room is part of the instrument",
        paragraphs: [
          "Instruments are voiced in the space where they are built. Move the bench and the maker hears something slightly different.",
          "This is one reason recordings of workshops are as interesting as recordings of performances.",
        ],
      },
      {
        heading: "Keeping the process, not just the object",
        paragraphs: [
          "Museums keep finished instruments. Very few keep the sound of them being made.",
          "An archive of places should include the rooms where things are built as well as the landscapes they are played in.",
        ],
      },
    ],
    readingTime: 4,
    relatedRecordingIds: ["r4", "r3"],
    source: "Editorial essay written for Echo Atlas.",
  },
];

export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
