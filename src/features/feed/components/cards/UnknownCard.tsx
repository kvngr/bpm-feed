import { Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors } from "@/theme/tokens";

/**
 * Forward-compatibility net: if the API introduces a card type this client
 * doesn't know, we skip it silently in production. In __DEV__ we surface a
 * hint so the gap is noticed.
 */
export function UnknownCard({ type }: { type: string }) {
  if (!__DEV__) return null;
  return (
    <View className="flex-row items-center gap-3 p-5">
      <Icon name="help-circle-outline" size={20} color={colors.inkMuted} />
      <Text className="flex-1 text-sm text-ink-muted">
        Type de carte non pris en charge : {type}
      </Text>
    </View>
  );
}
