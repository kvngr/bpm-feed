import { View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProfileDeck } from "../hooks/useProfileDeck";
import { ProfileView } from "./ProfileView";
import { PassButton } from "@/components/ui/PassButton";
import { EmptyState } from "@/components/feedback/EmptyState";
import { haptics } from "@/lib/haptics";
import type { Profile } from "@/domain/types";

interface ProfileDeckProps {
  profiles: Profile[];
  refreshing: boolean;
  onRefresh: () => void;
}

/**
 * One profile at a time. The current profile scrolls vertically; the sticky
 * pass button (bottom-left) throws it away and reveals the next one. When the
 * deck runs out, a "seen everyone" state offers to start over.
 */
export function ProfileDeck({ profiles, refreshing, onRefresh }: ProfileDeckProps) {
  const insets = useSafeAreaInsets();
  const { profile, exhausted, animatedStyle, pass, like, reset } = useProfileDeck(profiles);

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

  return (
    <View className="flex-1">
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <ProfileView
          key={profile.userId}
          profile={profile}
          onLiked={like}
          refreshing={refreshing}
          onRefresh={onRefresh}
          bottomInset={insets.bottom + 96}
        />
      </Animated.View>

      <View
        pointerEvents="box-none"
        style={{ position: "absolute", left: 20, bottom: insets.bottom + 20 }}
      >
        <PassButton onPress={handlePass} />
      </View>
    </View>
  );
}
