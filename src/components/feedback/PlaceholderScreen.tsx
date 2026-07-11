import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/Icon";
import { colors, radius, spacing, typography } from "@/theme/tokens";

interface PlaceholderScreenProps {
  icon: string;
  title: string;
  subtitle: string;
}

/**
 * Honest stub for the tabs beyond the feed (Likes / Matches / Profile). The
 * feed is the focus of this exercise; these screens are intentionally not
 * built, so we say so plainly rather than shipping a dead tab.
 */
export function PlaceholderScreen({ icon, title, subtitle }: PlaceholderScreenProps) {
  return (
    <SafeAreaView edges={["top"]} style={styles.root}>
      <View style={styles.iconWrap}>
        <Icon name={icon} size={30} color={colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.pill}>
        <Text style={styles.pillText}>Bientôt disponible</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: spacing.md,
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
  title: { ...typography.cardTitle, fontSize: 20 },
  subtitle: { ...typography.caption, textAlign: "center", lineHeight: 19 },
  pill: {
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  pillText: { fontSize: 12, fontWeight: "700", color: colors.textMuted },
});
