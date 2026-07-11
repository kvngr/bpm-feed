import { View, type StyleProp, type ViewStyle } from "react-native";
import { Image } from "expo-image";

interface ThumbImageProps {
  /** Remote image. When absent (e.g. locked photos) only the placeholder shows. */
  uri?: string | null;
  /** Base-83 thumbhash used as an instant blurry placeholder. */
  thumbhash?: string | null;
  /** Wrapper style — owns size, rounding, and positioning. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Progressive image: shows the decoded thumbhash immediately, then fades in the
 * full photo once loaded. The wrapping `View` owns layout so callers style the
 * box, not the third-party `Image`.
 */
export function ThumbImage({ uri, thumbhash, style }: ThumbImageProps) {
  return (
    <View style={style}>
      <Image
        style={{ width: "100%", height: "100%" }}
        source={uri ?? undefined}
        placeholder={thumbhash ? { thumbhash } : undefined}
        placeholderContentFit="cover"
        contentFit="cover"
        transition={300}
      />
    </View>
  );
}
