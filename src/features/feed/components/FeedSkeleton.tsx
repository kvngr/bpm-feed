import { useEffect } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import { radius, spacing } from "@/theme/tokens";

/** A single pulsing placeholder block driven by a shared progress value. */
function Block({ progress, style }: { progress: SharedValue<number>; style: ViewStyle }) {
  const animatedStyle = useAnimatedStyle(() => ({ opacity: 0.45 + progress.value * 0.35 }));
  return <Animated.View style={[styles.block, style, animatedStyle]} />;
}

/** Placeholder shown while the first feed load is in flight. */
export function FeedSkeleton() {
  const progress = useSharedValue(0);

  // Single mount effect to start the shared shimmer loop for every block.
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [progress]);

  return (
    <View style={styles.container}>
      <Block progress={progress} style={styles.title} />
      <Block progress={progress} style={styles.photo} />
      <Block progress={progress} style={styles.card} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  block: { backgroundColor: "rgba(255,255,255,0.07)" },
  title: { width: 150, height: 30, borderRadius: radius.sm, marginBottom: spacing.lg },
  photo: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  card: { width: "100%", height: 150, borderRadius: radius.lg },
});
