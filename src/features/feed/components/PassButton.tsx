import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Icon } from "@/components/ui/Icon";
import { colors, buttonShadow, circleStyle, ACTION_BUTTON_SIZE } from "@/theme/tokens";

interface PassButtonProps {
  onPress: () => void;
  size?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Floating "pass" control — a dark circle with a hairline edge and a white ✕,
 * the mirror of the like button (same size + shadow tokens). A quick scale dip
 * gives press feedback; the rest of the feedback is the profile flying away.
 * Positioning is the caller's.
 */
export function PassButton({ onPress, size = ACTION_BUTTON_SIZE }: PassButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withTiming(0.9, { duration: 90 });
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 130 });
      }}
      accessibilityRole="button"
      accessibilityLabel="Passer ce profil"
      hitSlop={8}
      style={[
        buttonShadow,
        circleStyle(size, colors.surfaceHigh),
        { borderWidth: 1, borderColor: colors.hairline },
        animatedStyle,
      ]}
    >
      <Icon name="close" size={Math.round(size * 0.42)} color={colors.text} />
    </AnimatedPressable>
  );
}
