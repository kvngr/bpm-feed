import type { Card, KnownCard } from "@/domain/types";
import { CardFrame } from "./CardFrame";
import { PictureCard } from "./cards/PictureCard";
import { PromptAnswerCard } from "./cards/PromptAnswerCard";
import { SportCard } from "./cards/SportCard";
import { InfoCard } from "./cards/InfoCard";
import { LockedPictureCard } from "./cards/LockedPictureCard";
import { UnknownCard } from "./cards/UnknownCard";

const KNOWN_TYPES = new Set<KnownCard["type"]>([
  "picture",
  "prompt_answer",
  "sport_card",
  "info_card",
  "locked_picture",
]);

/** Only photos and written answers get a like affordance (Hinge-style). */
const LIKEABLE = new Set<KnownCard["type"]>(["picture", "prompt_answer"]);

interface CardRendererProps {
  card: Card;
  onLike: (cardId: string) => void;
}

/** Compile-time exhaustiveness guard: adding a `KnownCard` variant without a
 *  matching `switch` case becomes a type error here. */
function assertNever(card: never): never {
  throw new Error(`Unhandled card type: ${JSON.stringify(card)}`);
}

/**
 * Picks the right component for a card. Unknown types bypass the frame and
 * degrade via `UnknownCard`. Once we've guarded the known set, the `switch`
 * narrows the discriminated union with no casts in the individual arms.
 */
export function CardRenderer({ card, onLike }: CardRendererProps) {
  if (!KNOWN_TYPES.has(card.type as KnownCard["type"])) {
    return <UnknownCard type={card.type} />;
  }

  const known = card as KnownCard;

  const body = (() => {
    switch (known.type) {
      case "picture":
        return <PictureCard content={known.content} />;
      case "prompt_answer":
        return <PromptAnswerCard content={known.content} />;
      case "sport_card":
        return <SportCard content={known.content} />;
      case "info_card":
        return <InfoCard content={known.content} />;
      case "locked_picture":
        return <LockedPictureCard content={known.content} />;
      default:
        return assertNever(known);
    }
  })();

  return (
    <CardFrame
      likeable={LIKEABLE.has(known.type)}
      onLikeChange={(liked) => liked && onLike(known.id)}
    >
      {body}
    </CardFrame>
  );
}
