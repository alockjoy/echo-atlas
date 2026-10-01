import type { Category } from "./categories";

import amazonCanopy from "@/assets/rec-amazon-canopy.jpg";
import arctic from "@/assets/rec-arctic.jpg";
import ballaro from "@/assets/rec-ballaro-market.jpg";
import cicadas from "@/assets/rec-cicadas-greece.jpg";
import fieldAmbience from "@/assets/rec-field-ambience.jpg";
import highlands from "@/assets/rec-highlands.jpg";
import kyotoFloor from "@/assets/rec-kyoto-floor.jpg";
import oldDhaka from "@/assets/rec-old-dhaka.jpg";
import sahara from "@/assets/rec-sahara.jpg";
import stationTunnel from "@/assets/rec-station-tunnel.jpg";
import subway from "@/assets/rec-subway.jpg";
import tokyoLine from "@/assets/rec-tokyo-line.jpg";
import tropicalShore from "@/assets/rec-tropical-shore.jpg";
import venice from "@/assets/rec-venice.jpg";

export interface RecordingSource {
  /** Where the audio or the place description comes from. */
  label: string;
  url?: string;
}

export interface Recording {
  id: string;
  slug: string;
  title: string;
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  category: Category;
  /** Short editorial description shown on cards and panels. */
  description: string;
  /** Longer editorial text for the detail page. */
  story: string[];
  image: string;
  imageAlt: string;
  /** Null when the archive has no playable recording for this place yet. */
  audioUrl: string | null;
  /** Catalogued length in seconds; null when no audio is held. */
  duration: number | null;
  recordedAt: string | null;
  featured: boolean;
  tags: string[];
  source: RecordingSource;
}

/**
 * Archive entries. Audio, where present, links to real openly licensed field
 * recordings on Wikimedia Commons. Entries with `audioUrl: null` are places
 * catalogued in the atlas for which the archive does not yet hold a recording,
 * and the interface says so rather than faking playback. Descriptions are
 * editorial writing, not verified historical claims.
 */
export const recordings: Recording[] = [
  {
    id: "r1",
    slug: "waves-on-a-tropical-shore",
    title: "Waves on a Tropical Shore",
    location: "Indian Ocean coast",
    country: "Sri Lanka",
    latitude: 5.95,
    longitude: 80.46,
    category: "Water & Weather",
    description:
      "Six unbroken minutes of surf arriving on a shallow sand shelf — the slowest rhythm in the archive.",
    story: [
      "Water is the sound most people reach for first. It asks nothing of the listener. It simply continues.",
      "This recording was made at the waterline, close enough that each wave fills the frame and then drains out of it. Listen for the pause between sets: the shore briefly empty, sand draining, and then the next arrival building from the left.",
      "Coastlines are among the fastest-changing places on the planet, which makes a six-minute recording of one particular stretch of sand a small, specific document.",
    ],
    image: tropicalShore,
    imageAlt: "Dusk waves breaking on a dark tropical shore beneath heavy cloud",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/64/Ocean_Waves_on_a_Tropical_Beach.ogg",
    duration: 384,
    recordedAt: "2014-03-01",
    featured: true,
    tags: ["surf", "water", "night", "long-form"],
    source: {
      label: "“Ocean Waves on a Tropical Beach”, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Ocean_Waves_on_a_Tropical_Beach.ogg",
    },
  },
  {
    id: "r2",
    slug: "the-201-series-on-the-chuo-line",
    title: "The 201 Series on the Chūō Line",
    location: "Ochanomizu to Yotsuya",
    country: "Japan",
    latitude: 35.6998,
    longitude: 139.7639,
    category: "Urban",
    description:
      "A commuter train between two Tokyo stations: motor whine, rail joints, doors, and the quiet of a carriage in motion.",
    story: [
      "Rolling stock has a voice, and it is replaced on a schedule. Each generation of carriage sounds different — different motors, different brakes, different announcements.",
      "This recording follows one train through the city above ground. The texture changes with the architecture: open cuttings, bridges, the compression of a station roof overhead.",
      "The 201 series has since left this line. The recording is what remains of how it sounded to sit inside it.",
    ],
    image: tokyoLine,
    imageAlt: "Empty Tokyo commuter train carriage at night with teal reflections in the windows",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a2/Sound_of_a_MoHa_201_series_electric_multiple_unit_train_on_the_Ch%C5%AB%C5%8D_Main_Line_%28Ochanomizu%E2%80%93Yotsuya%29%2C_Tokyo%2C_Japan_-_20101010.ogg",
    duration: 270,
    recordedAt: "2010-10-10",
    featured: true,
    tags: ["rail", "transit", "tokyo", "machines"],
    source: {
      label: "MoHa 201 series on the Chūō Main Line, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Sound_of_a_MoHa_201_series_electric_multiple_unit_train_on_the_Ch%C5%AB%C5%8D_Main_Line_(Ochanomizu%E2%80%93Yotsuya),_Tokyo,_Japan_-_20101010.ogg",
    },
  },
  {
    id: "r3",
    slug: "mercato-ballaro-at-midday",
    title: "Mercato Ballarò at Midday",
    location: "Palermo, Sicily",
    country: "Italy",
    latitude: 38.1105,
    longitude: 13.3615,
    category: "Cultural",
    description:
      "Vendors calling prices across a narrow street market — overlapping voices, crates, and footsteps on stone.",
    story: [
      "A market is a vocal instrument. The calls are shaped by the width of the street, the height of the awnings, and the number of people walking through.",
      "Here the voices come from both sides at once, each vendor pitching above the last. Beneath them: wheels on stone, plastic crates, and the particular hush that follows a passing scooter.",
      "Selling by voice is a practice that quietly disappears as markets move indoors and prices move onto screens.",
    ],
    image: ballaro,
    imageAlt: "Crowded Sicilian street market with canvas awnings and crates of produce",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e8/Italia_Palermo_mercato-Ballaro_20161225_122421.ogg",
    duration: 77,
    recordedAt: "2016-12-25",
    featured: false,
    tags: ["voices", "market", "street", "trade"],
    source: {
      label: "Mercato Ballarò, Palermo, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Italia_Palermo_mercato-Ballaro_20161225_122421.ogg",
    },
  },
  {
    id: "r4",
    slug: "nightingale-floor-daikakuji",
    title: "Nightingale Floor, Daikaku-ji",
    location: "Kyoto",
    country: "Japan",
    latitude: 35.0271,
    longitude: 135.6786,
    category: "Historical",
    description:
      "Floorboards built to sing under footsteps — a security system you can only hear, recorded in a temple corridor.",
    story: [
      "Some sounds were designed. The uguisubari, or nightingale floor, chirps when weight crosses it because of the way its nails sit in their clamps.",
      "This is fifteen seconds of someone walking a corridor. Every step answers back.",
      "Architecture that makes noise on purpose is rare, and it only survives where the building survives.",
    ],
    image: kyotoFloor,
    imageAlt: "Dim wooden corridor of a Japanese temple with polished floorboards and paper screens",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Kyoto_Daikakuji_Nightingale_Floor_SDR008.ogg",
    duration: 15,
    recordedAt: null,
    featured: false,
    tags: ["architecture", "footsteps", "temple", "craft"],
    source: {
      label: "Kyoto Daikaku-ji nightingale floor, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Kyoto_Daikakuji_Nightingale_Floor_SDR008.ogg",
    },
  },
  {
    id: "r5",
    slug: "the-station-tunnel",
    title: "The Station Tunnel",
    location: "Tampere",
    country: "Finland",
    latitude: 61.4981,
    longitude: 23.7739,
    category: "Urban",
    description:
      "Footsteps, rolling cases and distant announcements folded into the reverb of a pedestrian tunnel under the platforms.",
    story: [
      "Tunnels are amplifiers with a long memory. Nothing arrives dry; everything is smeared slightly into what came before it.",
      "What makes this recording hold attention is distance — people approaching, passing, receding, each one drawing a line through the space.",
      "Stations are rebuilt roughly once a generation, and their tunnels are usually the first thing to go.",
    ],
    image: stationTunnel,
    imageAlt: "Empty tiled pedestrian tunnel at night lit by cold fluorescent lights",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e6/WWS_TheStationTunnelOfTheTampereStation.ogg",
    duration: 160,
    recordedAt: null,
    featured: false,
    tags: ["reverb", "footsteps", "transit"],
    source: {
      label: "World Wide Soundscapes, Tampere station tunnel, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:WWS_TheStationTunnelOfTheTampereStation.ogg",
    },
  },
  {
    id: "r6",
    slug: "field-ambience-midsummer",
    title: "Field Ambience, Midsummer",
    location: "Lake shore meadow",
    country: "Estonia",
    latitude: 58.5953,
    longitude: 25.0136,
    category: "Nature",
    description:
      "Two minutes of a northern meadow at midsummer dusk: insects, distant birds, wind moving through tall grass.",
    story: [
      "At high latitudes the summer night never fully arrives, and the soundscape stays suspended in a long low light.",
      "Listen to the layers: insects close to the microphone, birds at the treeline, and a wind that rises and falls across the whole frame.",
      "Open meadow is one of the easiest habitats to lose and one of the hardest to notice losing.",
    ],
    image: fieldAmbience,
    imageAlt: "Northern meadow of tall grass and wildflowers under pale dusk light",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0a/20090610_0_ambience.ogg",
    duration: 123,
    recordedAt: "2009-06-10",
    featured: true,
    tags: ["insects", "wind", "meadow", "dusk"],
    source: {
      label: "Field ambience recording, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:20090610_0_ambience.ogg",
    },
  },
  {
    id: "r7",
    slug: "cicadas-at-noon",
    title: "Cicadas at Noon",
    location: "Attica hillside",
    country: "Greece",
    latitude: 37.9838,
    longitude: 23.7275,
    category: "Nature",
    description:
      "A dry hillside at the hottest hour, saturated by cicadas until the whole landscape sounds like one instrument.",
    story: [
      "Cicada song is temperature-dependent. It is, in a literal sense, the sound of heat.",
      "Stand inside it and individual insects disappear; what remains is a single wide band of noise that moves as you move.",
      "Recordings like this one are how future listeners will know what a Mediterranean summer used to sound like.",
    ],
    image: cicadas,
    imageAlt: "Hazy Mediterranean hillside with olive and pine trees at midday",
    audioUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Cicadas_in_Greece.ogg",
    duration: 28,
    recordedAt: null,
    featured: false,
    tags: ["insects", "heat", "summer"],
    source: {
      label: "“Cicadas in Greece”, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Cicadas_in_Greece.ogg",
    },
  },
  {
    id: "r8",
    slug: "dupont-to-st-george",
    title: "Dupont to St George",
    location: "Toronto",
    country: "Canada",
    latitude: 43.6745,
    longitude: -79.4064,
    category: "Urban",
    description:
      "One subway interval, end to end: departure, tunnel roar, braking, and the chime of opening doors.",
    story: [
      "Metro systems are among the most heavily used acoustic spaces on earth, and almost nobody listens to them on purpose.",
      "This recording covers a single hop between two stations, which is long enough to hear a complete shape: acceleration, steady state, deceleration, release.",
      "Signalling chimes and door tones change with every modernisation. They date a recording as precisely as a photograph.",
    ],
    image: subway,
    imageAlt: "Empty curved underground metro platform lit in cold teal light",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/TTC_Subway_Line_1_Ambience_-_Dupont_to_St_George_%28Freesound%29.ogg",
    duration: 175,
    recordedAt: null,
    featured: false,
    tags: ["transit", "underground", "machines"],
    source: {
      label: "TTC Line 1 ambience, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:TTC_Subway_Line_1_Ambience_-_Dupont_to_St_George_(Freesound).ogg",
    },
  },
  {
    id: "r9",
    slug: "birdsong-in-the-canopy",
    title: "Birdsong in the Canopy",
    location: "Amazon basin",
    country: "Brazil",
    latitude: -3.4653,
    longitude: -62.2159,
    category: "Nature",
    description:
      "A short, close recording of tropical birdsong carrying through dense canopy — a fragment from a research archive.",
    story: [
      "Rainforest song is shaped by obstruction. Calls that travel through layers of leaves arrive blurred, and birds compensate with repetition and pitch.",
      "This is a brief excerpt rather than a long ambience: a single voice, clearly placed, with the forest behind it.",
      "Short clips matter. They are often all that exists for a specific place in a specific year.",
    ],
    image: amazonCanopy,
    imageAlt: "Misty Amazon rainforest canopy in layered green silhouettes",
    audioUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/Singing-in-the-Rain-Forest-How-a-Tropical-Bird-Song-Transfers-Information-pone.0001580.s001.ogg",
    duration: 5,
    recordedAt: null,
    featured: false,
    tags: ["birds", "rainforest", "fragment"],
    source: {
      label: "PLoS ONE supporting audio, Wikimedia Commons",
      url: "https://commons.wikimedia.org/wiki/File:Singing-in-the-Rain-Forest-How-a-Tropical-Bird-Song-Transfers-Information-pone.0001580.s001.ogg",
    },
  },
  {
    id: "r10",
    slug: "rickshaw-bells-of-old-dhaka",
    title: "Rickshaw Bells of Old Dhaka",
    location: "Old Dhaka",
    country: "Bangladesh",
    latitude: 23.7104,
    longitude: 90.4074,
    category: "Urban",
    description:
      "Thumb bells, horns and conversation in the lanes of the old city. Catalogued and awaiting a field recording.",
    story: [
      "In Old Dhaka the bell is a language: a double tap to pass, a long trill to warn, a flat ring held in traffic.",
      "The archive has catalogued this place and is looking for an openly licensed recording of it. Until one is held, this page stays open as a listing rather than a listening.",
    ],
    image: oldDhaka,
    imageAlt: "Narrow Old Dhaka street at dusk crowded with cycle rickshaws and worn facades",
    audioUrl: null,
    duration: null,
    recordedAt: null,
    featured: false,
    tags: ["street", "bells", "voices", "wanted"],
    source: { label: "Place catalogued by the archive; recording not yet held." },
  },
  {
    id: "r11",
    slug: "wind-across-the-moor",
    title: "Wind Across the Moor",
    location: "Scottish Highlands",
    country: "Scotland",
    latitude: 57.2736,
    longitude: -4.4572,
    category: "Nature",
    description:
      "Open moorland weather with nothing to break it. Catalogued and awaiting a field recording.",
    story: [
      "Wind has no sound of its own. Everything you hear is the thing it is passing: heather, stone, water, your own coat.",
      "The archive has catalogued this location and is seeking an openly licensed recording made on the moor itself.",
    ],
    image: highlands,
    imageAlt: "Dark Highland moor and distant hills under heavy grey cloud",
    audioUrl: null,
    duration: null,
    recordedAt: null,
    featured: false,
    tags: ["wind", "moor", "weather", "wanted"],
    source: { label: "Place catalogued by the archive; recording not yet held." },
  },
  {
    id: "r12",
    slug: "sand-and-silence",
    title: "Sand and Silence",
    location: "Sahara",
    country: "North Africa",
    latitude: 23.4162,
    longitude: 12.8766,
    category: "Nature",
    description:
      "One of the quietest soundscapes on the planet, where silence is the subject. Catalogued and awaiting a recording.",
    story: [
      "True quiet is rare and difficult to record. The noise floor of the equipment becomes audible before the landscape does.",
      "The archive has catalogued the dunes and is seeking an openly licensed recording quiet enough to be worth publishing.",
    ],
    image: sahara,
    imageAlt: "Sahara dunes at blue hour with a single distant figure on a ridge",
    audioUrl: null,
    duration: null,
    recordedAt: null,
    featured: false,
    tags: ["silence", "desert", "wanted"],
    source: { label: "Place catalogued by the archive; recording not yet held." },
  },
  {
    id: "r13",
    slug: "oars-in-a-side-canal",
    title: "Oars in a Side Canal",
    location: "Venice",
    country: "Italy",
    latitude: 45.4371,
    longitude: 12.3326,
    category: "Historical",
    description:
      "Water against brick in a canal too narrow for engines. Catalogued and awaiting a field recording.",
    story: [
      "Venice is a city with almost no road noise, which makes every other sound unusually legible: water, voices, bells, footsteps on a bridge.",
      "The archive has catalogued this canal and is seeking an openly licensed recording made from the water.",
    ],
    image: venice,
    imageAlt: "Quiet narrow Venice canal at dawn with a moored wooden boat",
    audioUrl: null,
    duration: null,
    recordedAt: null,
    featured: false,
    tags: ["water", "city", "boats", "wanted"],
    source: { label: "Place catalogued by the archive; recording not yet held." },
  },
  {
    id: "r14",
    slug: "ice-at-the-edge-of-the-sea",
    title: "Ice at the Edge of the Sea",
    location: "Arctic Ocean",
    country: "High Arctic",
    latitude: 80.0,
    longitude: 10.0,
    category: "Water & Weather",
    description:
      "Floes grinding and settling at the ice edge. Catalogued and awaiting a field recording.",
    story: [
      "Sea ice is never still. It knocks, sighs and cracks, and underwater it is startlingly loud.",
      "The archive has catalogued the ice edge and is seeking an openly licensed recording of sufficient length to publish.",
    ],
    image: arctic,
    imageAlt: "Fractured Arctic sea ice floes in dark water under pale overcast light",
    audioUrl: null,
    duration: null,
    recordedAt: null,
    featured: false,
    tags: ["ice", "polar", "water", "wanted"],
    source: { label: "Place catalogued by the archive; recording not yet held." },
  },
];

export const featuredRecording: Recording = recordings.find(
  (r) => r.slug === "waves-on-a-tropical-shore",
)!;

export function getRecording(slug: string): Recording | undefined {
  return recordings.find((r) => r.slug === slug);
}

export function getRecordingsByIds(ids: string[]): Recording[] {
  return ids.map((id) => recordings.find((r) => r.id === id)).filter((r): r is Recording => !!r);
}

export function relatedRecordings(recording: Recording, count = 3): Recording[] {
  return recordings
    .filter((r) => r.id !== recording.id)
    .sort((a, b) => {
      const score = (r: Recording) =>
        (r.category === recording.category ? 2 : 0) +
        (r.country === recording.country ? 1 : 0) +
        (r.audioUrl ? 0.5 : 0);
      return score(b) - score(a);
    })
    .slice(0, count);
}
