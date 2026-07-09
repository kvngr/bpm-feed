import { Pressable } from "react-native";
import { Icon } from "./Icon";
import { colors, buttonShadow, circleStyle, ACTION_BUTTON_SIZE } from "@/theme/tokens";

interface PassButtonProps {
  onPress: () => void;
  size?: number;
}

/**
 * Floating "pass" control — a white circle with a soft shadow, matching the
 * like button exactly (same static `[buttonShadow, circleStyle]` pattern; a
 * `style`-as-function breaks the white fill under NativeWind). Press feedback
 * comes from the haptic + the profile flying away. Positioning is the caller's.
 */
export function PassButton({ onPress, size = ACTION_BUTTON_SIZE }: PassButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Passer ce profil"
      hitSlop={8}
      style={[buttonShadow, circleStyle(size)]}
    >
      <Icon name="close" size={Math.round(size * 0.46)} color={colors.inkMuted} />
    </Pressable>
  );
}
