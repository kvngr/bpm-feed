/**
 * Human-readable (French) labels + icons for the enum-like values in the feed.
 *
 * Keeping every mapping here means the UI components never hard-code copy:
 * they ask this module "what does `flexitarian` mean?" and get back a label.
 * Unknown values degrade gracefully via `humanize()` instead of showing raw
 * snake_case keys.
 */
import type { TrainingFrequency } from "./types";

/** Turn `have_want_more` into `Have want more` as a last-resort fallback. */
export function humanize(value: string): string {
  const spaced = value.replace(/[_-]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

function pick(dict: Record<string, string>, value: string): string {
  return dict[value] ?? humanize(value);
}

/** Training frequency → an intensity level (drives the activity-ring fill). */
const frequencyLevels: Record<TrainingFrequency, 1 | 2 | 3> = {
  little: 1,
  mid: 2,
  hard: 3,
};

export function frequencyLevel(value: string): 1 | 2 | 3 {
  return (frequencyLevels as Record<string, 1 | 2 | 3>)[value] ?? 1;
}

/** Sessions-per-week shorthand shown on the sport card (little → "1-2", hard → "5+"). */
const sessionsByFrequency: Record<TrainingFrequency, string> = {
  little: "1-2",
  mid: "3-4",
  hard: "5+",
};

export function sessionsPerWeek(value: string): string {
  return (sessionsByFrequency as Record<string, string>)[value] ?? "—";
}

const relationshipType: Record<string, string> = {
  exclusive: "Relation sérieuse",
  casual: "Relation légère",
  intimate: "Sans prise de tête",
};

const zodiac: Record<string, string> = {
  aries: "Bélier",
  taurus: "Taureau",
  gemini: "Gémeaux",
  cancer: "Cancer",
  leo: "Lion",
  virgo: "Vierge",
  libra: "Balance",
  scorpio: "Scorpion",
  sagittarius: "Sagittaire",
  capricorn: "Capricorne",
  aquarius: "Verseau",
  pisces: "Poissons",
};

const diet: Record<string, string> = {
  omnivore: "Omnivore",
  flexitarian: "Flexitarien",
  pescatarian: "Pescetarien",
  vegetarian: "Végétarien",
  vegan: "Vegan",
};

const frequencyWord: Record<string, string> = {
  never: "Jamais",
  socially: "Socialement",
  sometimes: "Parfois",
  often: "Souvent",
};

const smoking: Record<string, string> = {
  never: "Non-fumeur·se",
  sometimes: "Parfois",
  often: "Souvent",
};

const kids: Record<string, string> = {
  want: "En veut",
  dont_want: "N'en veut pas",
  have: "En a",
  dont_have: "N'en a pas",
  have_want_more: "En a, en veut d'autres",
  unsure: "Ne sait pas encore",
};

const pets: Record<string, string> = {
  dog: "Chien",
  cat: "Chat",
  other: "Autre animal",
  none: "Pas d'animaux",
  want: "En voudrait",
};

const religion: Record<string, string> = {
  agnostic: "Agnostique",
  atheist: "Athée",
  spiritual: "Spirituel·le",
  christian: "Chrétien·ne",
  muslim: "Musulman·e",
  buddhist: "Bouddhiste",
  other: "Autre",
};

export const label = {
  relationshipType: (v: string) => pick(relationshipType, v),
  zodiac: (v: string) => pick(zodiac, v),
  diet: (v: string) => pick(diet, v),
  drinking: (v: string) => pick(frequencyWord, v),
  smoking: (v: string) => pick(smoking, v),
  kids: (v: string) => pick(kids, v),
  pets: (v: string) => pick(pets, v),
  religion: (v: string) => pick(religion, v),
};
