/**
 * Domain types for the BPM feed.
 *
 * The API returns a list of `Profile`s, each made of ordered `cards`.
 * A card is a discriminated union on `type`, so rendering can stay fully
 * type-safe (see `CardRenderer`). Unknown/future card types are tolerated
 * via `UnknownCard` for forward-compatibility.
 */

export type TrainingFrequency = "hard" | "mid" | "little";

export type PromptCategory = "lifestyle" | "sport";

export interface BaseCard {
  id: string;
  position: number;
}

export interface PictureCard extends BaseCard {
  type: "picture";
  content: {
    storageKey: string;
    imageUrl: string;
    thumbhash: string;
    /** When set, the photo answers a prompt and we overlay its title. */
    promptKey: string | null;
    promptTitle: string | null;
  };
}

export interface PromptAnswerCard extends BaseCard {
  type: "prompt_answer";
  content: {
    promptKey: string;
    promptTitle: string;
    answerText: string;
    category: PromptCategory;
  };
}

export interface Sport {
  sportKey: string;
  sportName: string;
  sportIcon: string;
  trainingFrequency: TrainingFrequency;
}

export interface SportCard extends BaseCard {
  type: "sport_card";
  content: {
    sports: Sport[];
    trainingFrequency: TrainingFrequency;
  };
}

/** Free-form profile facts. Every field is optional/nullable in practice. */
export interface ProfileInfo {
  age: number;
  height: number;
  city: string;
  relationshipType: string;
  zodiac: string;
  diet: string;
  drinking: string;
  smoking: string;
  drugs: string;
  kids: string;
  pets: string;
  religion: string;
  job: string | null;
  education: string | null;
  originCity: string | null;
}

export interface InfoCard extends BaseCard {
  type: "info_card";
  content: ProfileInfo;
}

/** A premium/blurred photo: no `imageUrl`, only a thumbhash placeholder. */
export interface LockedPictureCard extends BaseCard {
  type: "locked_picture";
  content: {
    thumbhash: string;
    promptTitle: string | null;
  };
}

/** Any card type the client doesn't know about yet. */
export interface UnknownCard extends BaseCard {
  type: string;
  content: unknown;
}

export type KnownCard =
  | PictureCard
  | PromptAnswerCard
  | SportCard
  | InfoCard
  | LockedPictureCard;

export type Card = KnownCard | UnknownCard;

export interface Profile {
  userId: string;
  firstname: string;
  age: number;
  city: string;
  height: number;
  gender: string;
  cards: Card[];
}

export interface FeedResponse {
  profiles: Profile[];
}
