import { Pressable, Text, View } from "react-native";
import { ThumbImage } from "@/components/ui/ThumbImage";
import { Icon } from "@/components/ui/Icon";
import { colors } from "@/theme/tokens";
import type { LockedPictureCard as LockedPictureCardModel } from "@/domain/types";

/**
 * A private photo. There's no `imageUrl` — only a thumbhash — so we show a
 * heavily blurred placeholder behind a lock and an unlock CTA (premium gate).
 */
export function LockedPictureCard({
  content,
}: {
  content: LockedPictureCardModel["content"];
}) {
  return (
    <View className="w-full aspect-[4/5] items-center justify-center">
      <ThumbImage
        thumbhash={content.thumbhash}
        blurRadius={24}
        className="absolute inset-0 h-full w-full"
      />
      <View className="absolute inset-0 bg-brand-dark/55" />

      <View className="items-center gap-2 px-6">
        <View className="mb-1 h-14 w-14 items-center justify-center rounded-full bg-white/15">
          <Icon name="lock" size={26} color={colors.white} />
        </View>
        <Text className="text-base font-semibold text-white">
          {content.promptTitle ?? "Photo privée"}
        </Text>
        <Text className="text-center text-xs text-white/75">
          Visible après un match ou avec BPM Premium
        </Text>
        <Pressable className="mt-2 rounded-full bg-white px-5 py-2.5">
          <Text className="text-sm font-semibold text-brand">Débloquer</Text>
        </Pressable>
      </View>
    </View>
  );
}
