import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors, radius, spacing, typography } from "@/theme/tokens";

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
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={30} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {actionLabel && onAction ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingHorizontal: 40,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  title: { ...typography.cardTitle, fontSize: 18, textAlign: "center" },
  subtitle: { ...typography.caption, textAlign: "center", lineHeight: 19 },
  button: {
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
  },
  buttonText: { color: colors.white, fontWeight: "700", fontSize: 15 },
  pressed: { opacity: 0.85 },
});
