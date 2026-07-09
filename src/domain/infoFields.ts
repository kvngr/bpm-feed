/**
 * Declarative description of the rows shown on an `info_card`.
 *
 * Each row knows its icon and how to derive its display text from the profile
 * info. Returning `null` from `value()` hides the row entirely — that's how we
 * deal with nullable fields (e.g. `education: null`) without branching in JSX.
 *
 * `age` and `city` are intentionally omitted here: they already appear in the
 * profile header, so the info card avoids duplicating them.
 */
import type { ProfileInfo } from "./types";
import { label } from "./labels";

export interface InfoField {
  key: keyof ProfileInfo;
  icon: string; // MaterialCommunityIcons glyph name
  value: (info: ProfileInfo) => string | null;
}

export const INFO_FIELDS: InfoField[] = [
  {
    key: "height",
    icon: "human-male-height",
    value: (i) => (i.height ? `${i.height} cm` : null),
  },
  {
    key: "relationshipType",
    icon: "heart-outline",
    value: (i) => (i.relationshipType ? label.relationshipType(i.relationshipType) : null),
  },
  {
    key: "job",
    icon: "briefcase-outline",
    value: (i) => i.job ?? null,
  },
  {
    key: "education",
    icon: "school-outline",
    value: (i) => i.education ?? null,
  },
  {
    key: "originCity",
    icon: "map-marker-outline",
    value: (i) => (i.originCity ? `Originaire de ${i.originCity}` : null),
  },
  {
    key: "zodiac",
    icon: "star-four-points-outline",
    value: (i) => (i.zodiac ? label.zodiac(i.zodiac) : null),
  },
  {
    key: "diet",
    icon: "silverware-fork-knife",
    value: (i) => (i.diet ? label.diet(i.diet) : null),
  },
  {
    key: "drinking",
    icon: "glass-wine",
    value: (i) => (i.drinking ? `Alcool · ${label.drinking(i.drinking)}` : null),
  },
  {
    key: "smoking",
    icon: "smoking-off",
    value: (i) => (i.smoking ? `Tabac · ${label.smoking(i.smoking)}` : null),
  },
  {
    key: "kids",
    icon: "baby-carriage",
    value: (i) => (i.kids ? `Enfants · ${label.kids(i.kids)}` : null),
  },
  {
    key: "pets",
    icon: "paw-outline",
    value: (i) => (i.pets ? label.pets(i.pets) : null),
  },
  {
    key: "religion",
    icon: "hands-pray",
    value: (i) => (i.religion ? label.religion(i.religion) : null),
  },
];
