import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors, spacing } from "@/theme/tokens";

/**
 * Forward-compatibility net: if the API introduces a card type this client
 * doesn't know, we skip it silently in production. In __DEV__ we surface a hint
 * so the gap is noticed.
 */
export function UnknownCard({ type }: { type: string }) {
  if (!__DEV__) return null;
  return (
    <View style={styles.root}>
      <Icon name="help-circle-outline" size={20} color={colors.textMuted} />
      <Text style={styles.text}>Type de carte non pris en charge : {type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.lg,
  },
  text: { flex: 1, fontSize: 13, color: colors.textMuted },
});
