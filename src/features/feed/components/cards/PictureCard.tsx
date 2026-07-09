import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThumbImage } from "@/components/ui/ThumbImage";
import type { PictureCard as PictureCardModel } from "@/domain/types";

/**
 * A profile photo. When it answers a prompt (`promptTitle` set) we lay a soft
 * bottom gradient scrim under the caption so the text stays legible over any
 * image. Right padding keeps the caption clear of the floating like button.
 */
export function PictureCard({ content }: { content: PictureCardModel["content"] }) {
  return (
    <View className="w-full aspect-[4/5]">
      <ThumbImage
        uri={content.imageUrl}
        thumbhash={content.thumbhash}
        className="h-full w-full"
      />
      {content.promptTitle ? (
        <>
          <LinearGradient
            colors={["rgba(35,20,45,0)", "rgba(35,20,45,0.62)"]}
            style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "42%" }}
          />
          <View className="absolute inset-x-0 bottom-0 p-5 pr-20">
            <Text className="text-lg font-semibold leading-6 text-white">
              {content.promptTitle}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
}
