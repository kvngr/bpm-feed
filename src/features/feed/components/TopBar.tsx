import { Pressable, StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { colors, spacing, typography } from "@/theme/tokens";

interface TopBarProps {
  /** The current profile's name (or the BPM wordmark when there's none). */
  title: string;
  canUndo: boolean;
  onUndo: () => void;
}

const CONTROL_SIZE = 40;

/**
 * The feed's top app bar: the current profile's name on the left, and the
 * global controls on the right — filters, "rewind" (undo the last pass/like),
 * and boost.
 *
 * Only *rewind* is wired in this exercise; filters and boost are presentational
 * chrome (real features, but out of scope) — they give press feedback but open
 * nothing.
 */
export function TopBar({ title, canUndo, onUndo }: TopBarProps) {
  return (
    <View style={styles.bar}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.controls}>
        <Pressable
          style={({ pressed }) => [styles.control, pressed && styles.pressed]}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Filtres"
        >
          <Icon name="tune-variant" size={19} color={colors.text} />
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.control,
            pressed && styles.pressed,
            !canUndo && styles.disabled,
          ]}
          onPress={onUndo}
          disabled={!canUndo}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityState={{ disabled: !canUndo }}
          accessibilityLabel="Revenir au profil précédent"
        >
          <Icon name="backup-restore" size={20} color={canUndo ? colors.text : colors.textFaint} />
        </Pressable>

        <View>
          <Pressable
            style={({ pressed }) => [styles.control, styles.boost, pressed && styles.pressed]}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Boost ton profil"
          >
            <Icon name="lightning-bolt" size={19} color={colors.white} />
          </Pressable>
          <View style={styles.boostBadge}>
            <Badge count={1} color={colors.brand} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  },
  title: { ...typography.screenTitle, flexShrink: 1, marginRight: spacing.md },
  controls: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  control: {
    width: CONTROL_SIZE,
    height: CONTROL_SIZE,
    borderRadius: CONTROL_SIZE / 2,
    backgroundColor: colors.surfaceHigh,
    alignItems: "center",
    justifyContent: "center",
  },
  boost: { backgroundColor: colors.boost },
  boostBadge: { position: "absolute", top: -4, right: -4 },
  pressed: { opacity: 0.6 },
  disabled: { opacity: 0.4 },
});
