import { useState } from "react";
import { View } from "react-native";
import { LikeButton } from "@/components/ui/LikeButton";
import { cardShadow } from "@/theme/tokens";

interface CardFrameProps {
  children: React.ReactNode;
  /** Show the floating like button (photos, prompts). */
  likeable?: boolean;
  onLikeChange?: (liked: boolean) => void;
}

/**
 * Hinge-style card shell: a white surface floating on a soft shadow, with the
 * like button hanging off the bottom-right corner. Three layers on purpose —
 * the shadow layer must not clip (or the shadow vanishes), the inner layer
 * clips content to the rounded corners, and the heart sits above both so its
 * burst radiates freely.
 */
export function CardFrame({ children, likeable = false, onLikeChange }: CardFrameProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    onLikeChange?.(next);
  };

  return (
    <View className="relative mb-5">
      <View className="rounded-card bg-surface" style={cardShadow}>
        <View className="overflow-hidden rounded-card">{children}</View>
      </View>
      {likeable ? (
        <View className="absolute bottom-3 right-3">
          <LikeButton liked={liked} onToggle={toggleLike} />
        </View>
      ) : null}
    </View>
  );
}
