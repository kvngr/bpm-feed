import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { Icon } from "./Icon";
import { colors, buttonShadow, circleStyle, ACTION_BUTTON_SIZE } from "@/theme/tokens";
import { haptics } from "@/lib/haptics";

interface LikeButtonProps {
  liked: boolean;
  onToggle: () => void;
}

const PARTICLE_COUNT = 6;
const PARTICLE_RADIUS = 22; // how far particles travel from the heart
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
  return { dx: Math.cos(angle) * PARTICLE_RADIUS, dy: Math.sin(angle) * PARTICLE_RADIUS };
});

/** A single dot flying outward as the burst plays (progress 0 → 1). */
function Particle({ progress, dx, dy }: { progress: SharedValue<number>; dx: number; dy: number }) {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.15, 1], [0, 1, 0]),
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, dx]) },
      { translateY: interpolate(progress.value, [0, 1], [0, dy]) },
      { scale: interpolate(progress.value, [0, 0.4, 1], [0.2, 1, 0.3]) },
    ],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: "absolute", left: "50%", top: "50%", marginLeft: -3, marginTop: -3 },
        { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.brand },
        style,
      ]}
    />
  );
}

/** The expanding ring behind the heart. */
function Ring({ progress }: { progress: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.1, 1], [0, 0.5, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.5, 1.8]) }],
  }));
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        { position: "absolute", left: "50%", top: "50%", marginLeft: -17, marginTop: -17 },
        { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: colors.brand },
        style,
      ]}
    />
  );
}

/**
 * Controlled like button. On a *new* like it fires a haptic, pops the heart
 * with a spring overshoot, and plays a one-shot ring + particle burst. Unliking
 * is a quieter dip. `progress` rests at 0 so the burst is invisible until fired.
 */
export function LikeButton({ liked, onToggle }: LikeButtonProps) {
  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  const handlePress = () => {
    const willLike = !liked;
    if (willLike) {
      haptics.medium();
      scale.value = withSequence(
        withTiming(1.35, { duration: 120, easing: Easing.out(Easing.quad) }),
        withSpring(1, { damping: 6, stiffness: 220, mass: 0.6 })
      );
      progress.value = 0;
      progress.value = withTiming(1, { duration: 520, easing: Easing.out(Easing.quad) });
    } else {
      haptics.selection();
      scale.value = withSequence(
        withTiming(0.8, { duration: 100 }),
        withSpring(1, { damping: 10, stiffness: 200 })
      );
    }
    onToggle();
  };

  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={liked ? "Retirer le like" : "Liker"}
      style={[buttonShadow, circleStyle(ACTION_BUTTON_SIZE)]}
    >
      <Ring progress={progress} />
      {PARTICLES.map((p, i) => (
        <Particle key={i} progress={progress} dx={p.dx} dy={p.dy} />
      ))}
      <Animated.View style={heartStyle}>
        <Icon
          name={liked ? "heart" : "heart-outline"}
          size={25}
          color={liked ? colors.brand : colors.brand}
        />
      </Animated.View>
    </Pressable>
  );
}
