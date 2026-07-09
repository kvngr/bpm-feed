import { Pressable, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors } from "@/theme/tokens";

interface EmptyStateProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Generic empty placeholder; also used for the "seen everyone" state. */
export function EmptyState({
  icon = "account-search-outline",
  title = "Personne à l'horizon",
  subtitle = "Reviens un peu plus tard, de nouveaux profils arrivent chaque jour.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 px-10">
      <Icon name={icon} size={44} color={colors.inkMuted} />
      <Text className="text-center text-lg font-semibold text-ink">{title}</Text>
      <Text className="text-center text-sm text-ink-muted">{subtitle}</Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          className="mt-2 rounded-full bg-brand px-6 py-3"
        >
          <Text className="font-semibold text-white">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
