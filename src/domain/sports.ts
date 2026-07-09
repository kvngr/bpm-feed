/**
 * Maps the API's `sportIcon` slugs to MaterialCommunityIcons glyph names.
 * Any unrecognised slug falls back to a generic dumbbell so a new sport
 * never renders as a blank space.
 */
const SPORT_ICONS: Record<string, string> = {
  mountain: "terrain",
  running: "run",
  yoga: "yoga",
  dumbbell: "dumbbell",
  bike: "bike",
  wave: "waves",
  tennis: "tennis",
  medal: "medal",
  swimmer: "swim",
  ball: "soccer",
  "boxing-glove": "boxing-glove",
};

export function sportIcon(slug: string): string {
  return SPORT_ICONS[slug] ?? "dumbbell";
}
