import { Pressable, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors } from "@/theme/tokens";

/** Full-screen error with a retry action. */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center gap-4 px-10">
      <Icon name="heart-broken-outline" size={44} color={colors.brand} />
      <Text className="text-center text-lg font-semibold text-ink">
        Impossible de charger le feed
      </Text>
      <Text className="text-center text-sm text-ink-muted">
        Vérifie ta connexion et réessaie.
      </Text>
      <Pressable
        onPress={onRetry}
        className="mt-2 rounded-full bg-brand px-6 py-3"
        accessibilityRole="button"
      >
        <Text className="font-semibold text-white">Réessayer</Text>
      </Pressable>
    </View>
  );
}
