export const CATEGORIES = [
  "Nature",
  "Urban",
  "Cultural",
  "Historical",
  "Water & Weather",
  "Human Stories",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Filters used on the atlas map. */
export const ATLAS_CATEGORIES = ["Nature", "Urban", "Cultural", "Historical"] as const;
