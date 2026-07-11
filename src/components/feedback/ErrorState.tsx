import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors, radius, spacing, typography } from "@/theme/tokens";

/** Full-screen error with a retry action. */
export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.root}>
      <View style={styles.iconWrap}>
        <Icon name="heart-broken-outline" size={30} color={colors.brand} />
      </View>
      <Text style={styles.title}>Impossible de charger le feed</Text>
      <Text style={styles.subtitle}>Vérifie ta connexion et réessaie.</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Réessayer</Text>
      </Pressable>
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
  subtitle: { ...typography.caption, textAlign: "center" },
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
