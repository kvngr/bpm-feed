import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

/** A single pulsing grey block driven by a shared progress value. */
function Block({ progress, className }: { progress: SharedValue<number>; className: string }) {
  const style = useAnimatedStyle(() => ({ opacity: 0.5 + progress.value * 0.5 }));
  return <Animated.View style={style} className={`bg-black/[0.06] ${className}`} />;
}

/** Placeholder shown while the first feed load is in flight. */
export function FeedSkeleton() {
  const progress = useSharedValue(0);

  // Single mount effect to start the shared shimmer loop for every block.
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 800 }), -1, true);
  }, [progress]);

  return (
    <View className="px-4 pt-4">
      {[0, 1].map((block) => (
        <View key={block} className="mb-8">
          <Block progress={progress} className="mb-4 h-8 w-40 rounded-xl" />
          <Block progress={progress} className="mb-4 aspect-[4/5] w-full rounded-3xl" />
          <Block progress={progress} className="h-28 w-full rounded-3xl" />
        </View>
      ))}
    </View>
  );
}
