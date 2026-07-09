import { RefreshControl, ScrollView } from "react-native";
import { useLikeCard } from "../hooks/useLikeCard";
import { colors } from "@/theme/tokens";
import type { Profile } from "@/domain/types";
import { ProfileHeader } from "./ProfileHeader";
import { CardRenderer } from "./CardRenderer";

interface ProfileViewProps {
  profile: Profile;
  /** Called after a like is recorded so the deck can advance to the next profile. */
  onLiked: () => void;
  refreshing: boolean;
  onRefresh: () => void;
  bottomInset: number;
}

/**
 * A single profile: header + its ordered card stack, scrolled vertically.
 * Liking a card records the like and advances the deck (like other dating apps).
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
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: bottomInset }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.brand}
          colors={[colors.brand]}
        />
      }
    >
      <ProfileHeader profile={profile} />
      {profile.cards.map((card) => (
        <CardRenderer key={card.id} card={card} onLike={handleLike} />
      ))}
    </ScrollView>
  );
}
