import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import type { useProfileDeck } from "../hooks/useProfileDeck";
import { ProfileView } from "./ProfileView";
import { PassButton } from "./PassButton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { haptics } from "@/lib/haptics";
import { ACTION_BUTTON_SIZE, spacing } from "@/theme/tokens";

interface ProfileDeckProps {
  deck: ReturnType<typeof useProfileDeck>;
  refreshing: boolean;
  onRefresh: () => void;
}

/**
 * One profile at a time. The current profile scrolls vertically; the sticky
 * pass button (bottom-left) throws it away and reveals the next. A soft bottom
 * scrim fades scrolling content beneath the floating button so the ✕ always
 * reads as a control on top — never as text collision. When the deck runs out,
 * a "seen everyone" state offers to start over.
 */
export function ProfileDeck({ deck, refreshing, onRefresh }: ProfileDeckProps) {
  const { profile, exhausted, animatedStyle, pass, like, reset } = deck;

  if (exhausted || !profile) {
    return (
      <EmptyState
        icon="check-circle-outline"
        title="Tu as tout vu !"
        subtitle="Tu as parcouru tous les profils du moment."
        actionLabel="Revoir les profils"
        onAction={reset}
      />
    );
  }

  const handlePass = () => {
    haptics.medium();
    pass();
  };

  // The tab bar below already owns the bottom safe area, so this is a fixed gap.
  const buttonBottom = spacing.lg;

  return (
    <View style={styles.root}>
      <Animated.View style={[styles.deck, animatedStyle]}>
        <ProfileView
          key={profile.userId}
          profile={profile}
          onLiked={like}
          refreshing={refreshing}
          onRefresh={onRefresh}
          bottomInset={buttonBottom + ACTION_BUTTON_SIZE + spacing.xxl}
        />
      </Animated.View>

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(11,11,13,0)", "rgba(11,11,13,0.85)"]}
        style={[styles.scrim, { height: buttonBottom + ACTION_BUTTON_SIZE + spacing.xxl }]}
      />

      <View pointerEvents="box-none" style={[styles.passWrap, { bottom: buttonBottom }]}>
        <PassButton onPress={handlePass} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  deck: { flex: 1 },
  scrim: { position: "absolute", left: 0, right: 0, bottom: 0 },
  passWrap: { position: "absolute", left: spacing.xl },
});
