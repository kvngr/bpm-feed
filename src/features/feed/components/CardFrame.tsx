import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LikeButton } from "./LikeButton";
import { cardShadow, colors, radius, spacing } from "@/theme/tokens";

interface CardFrameProps {
  children: React.ReactNode;
  /** Show the floating like button (photos, prompts). */
  likeable?: boolean;
  onLikeChange?: (liked: boolean) => void;
}

/**
 * Card shell: an elevated dark surface on a soft shadow, with the like button
 * hanging off the bottom-right corner. Three layers on purpose — the shadow
 * layer must not clip (or the shadow vanishes), the inner layer clips content
 * to the rounded corners, and the heart sits above both so its burst radiates
 * freely.
 */
export function CardFrame({ children, likeable = false, onLikeChange }: CardFrameProps) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    const next = !liked;
    setLiked(next);
    onLikeChange?.(next);
  };

  return (
    <View style={styles.wrap}>
      <View style={[styles.shadow, cardShadow]}>
        <View style={styles.clip}>{children}</View>
      </View>
      {likeable ? (
        <View style={styles.likeWrap}>
          <LikeButton liked={liked} onToggle={toggleLike} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "relative", marginBottom: spacing.lg },
  shadow: { borderRadius: radius.lg, backgroundColor: colors.surface },
  clip: { borderRadius: radius.lg, overflow: "hidden" },
  likeWrap: { position: "absolute", bottom: 12, right: 12 },
});
