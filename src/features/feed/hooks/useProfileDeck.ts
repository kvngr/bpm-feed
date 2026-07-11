import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import type { Profile } from "@/domain/types";

const { width: SCREEN_W } = Dimensions.get("window");

/**
 * Presents profiles one at a time, like a dating deck. `pass` throws the
 * current card off to the left, `like` to the right; both then reveal the next
 * profile with a small slide-in. `undo` rewinds to the previous profile (the
 * header's "rewind" control). Everything is index-driven — there is no list of
 * everyone on screen at once.
 */
export function useProfileDeck(profiles: Profile[]) {
  const [index, setIndex] = useState(0);

  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const busy = useRef(false);

  const settle = () => {
    translateX.value = 0;
    rotate.value = 0;
    opacity.value = 1;
    busy.current = false;
  };

  // New batch of profiles (e.g. after refresh) → start over from the top.
  useEffect(() => {
    setIndex(0);
    settle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles]);

  /** Slide a freshly shown profile in from `direction` (-1 = from the left). */
  const enterFrom = (direction: -1 | 1) => {
    translateX.value = direction * 24;
    rotate.value = 0;
    opacity.value = 0;
    translateX.value = withTiming(0, { duration: 260, easing: Easing.out(Easing.quad) });
    opacity.value = withTiming(1, { duration: 260 });
  };

  const revealNext = () => {
    busy.current = false;
    setIndex((i) => i + 1);
    enterFrom(1);
  };

  const leave = (direction: -1 | 1) => {
    if (busy.current) return;
    busy.current = true;
    translateX.value = withTiming(
      direction * SCREEN_W * 1.15,
      { duration: 300, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(revealNext)();
      },
    );
    rotate.value = withTiming(direction * 8, { duration: 300 });
    opacity.value = withTiming(0, { duration: 240 });
  };

  const undo = () => {
    if (busy.current || index === 0) return;
    setIndex((i) => Math.max(0, i - 1));
    enterFrom(-1); // mirror the exit: the previous profile slides back in from the left
  };

  const reset = () => {
    setIndex(0);
    settle();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { rotateZ: `${rotate.value}deg` }],
  }));

  return {
    profile: profiles[index] as Profile | undefined,
    exhausted: index >= profiles.length,
    canUndo: index > 0,
    animatedStyle,
    pass: () => leave(-1),
    like: () => leave(1),
    undo,
    reset,
  };
}
