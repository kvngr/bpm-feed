import { RefreshControl, ScrollView } from "react-native";
import { useLikeCard } from "../hooks/useLikeCard";
import { CardRenderer } from "./CardRenderer";
import { colors, spacing } from "@/theme/tokens";
import type { Profile } from "@/domain/types";

interface ProfileViewProps {
  profile: Profile;
  /** Called after a like is recorded so the deck can advance to the next profile. */
  onLiked: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  bottomInset: number;
}

/**
 * A single profile: its ordered card stack, scrolled vertically (the name lives
 * in the top bar). Liking a card records the like and advances the deck.
 */
export function ProfileView({
  profile,
  onLiked,
  refreshing,
  onRefresh,
  bottomInset,
}: ProfileViewProps) {
  const like = useLikeCard();

  const handleLike = (cardId: string) => {
    like.mutate({ userId: profile.userId, cardId });
    onLiked();
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xs,
        paddingBottom: bottomInset,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.textMuted}
          colors={[colors.brand]}
        />
      }
    >
      {profile.cards.map((card) => (
        <CardRenderer key={card.id} card={card} onLike={handleLike} />
      ))}
    </ScrollView>
  );
}
