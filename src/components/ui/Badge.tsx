import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme/tokens";

interface BadgeProps {
  count?: number;
  color?: string;
}

/**
 * Small count pill (notification badge). Renders nothing for a falsy/zero
 * count. Positioning is the caller's job (usually absolute, top-right of an
 * icon).
 */
export function Badge({ count, color = colors.brand }: BadgeProps) {
  if (!count) return null;
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{count > 9 ? "9+" : count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.canvas,
  },
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "800",
    includeFontPadding: false,
    textAlign: "center",
  },
});
