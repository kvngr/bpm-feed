import { View } from "react-native";
import { Image } from "expo-image";

interface ThumbImageProps {
  /** Remote image. When absent (e.g. locked photos) only the placeholder shows. */
  uri?: string | null;
  /** Base-83 thumbhash used as an instant blurry placeholder. */
  thumbhash?: string | null;
  /** Tailwind classes for the wrapper (size, rounding, overflow). */
  className?: string;
  blurRadius?: number;
}

/**
 * Progressive image: shows the decoded thumbhash immediately, then fades in
 * the full photo once loaded. Wrapping `View` owns layout + rounding so we
 * don't fight NativeWind over styling a third-party component.
 */
export function ThumbImage({ uri, thumbhash, className, blurRadius }: ThumbImageProps) {
  return (
    <View className={className}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={uri ?? undefined}
        placeholder={thumbhash ? { thumbhash } : undefined}
        placeholderContentFit="cover"
        contentFit="cover"
        transition={300}
        blurRadius={blurRadius}
      />
    </View>
  );
}
