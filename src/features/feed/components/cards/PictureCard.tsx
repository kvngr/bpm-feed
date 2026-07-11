import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThumbImage } from "@/components/ui/ThumbImage";
import { ACTION_BUTTON_SIZE, colors, spacing } from "@/theme/tokens";
import type { PictureCard as PictureCardModel } from "@/domain/types";

/**
 * A profile photo. When it answers a prompt (`promptTitle` set) we lay a soft
 * bottom gradient scrim under the caption so the text stays legible over any
 * image. Right padding keeps the caption clear of the floating like button.
 */
export function PictureCard({ content }: { content: PictureCardModel["content"] }) {
  return (
    <View style={styles.root}>
      <ThumbImage uri={content.imageUrl} thumbhash={content.thumbhash} style={styles.image} />
      {content.promptTitle ? (
        <>
          <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.66)"]} style={styles.scrim} />
          <View style={styles.captionWrap}>
            <Text style={styles.caption}>{content.promptTitle}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", aspectRatio: 4 / 5 },
  image: { height: "100%", width: "100%" },
  scrim: { position: "absolute", left: 0, right: 0, bottom: 0, height: "45%" },
  captionWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl,
    // Keep the caption clear of the like button in the bottom-right corner.
    paddingRight: ACTION_BUTTON_SIZE + spacing.xl,
  },
  caption: { fontSize: 18, fontWeight: "700", lineHeight: 24, color: colors.white },
});
