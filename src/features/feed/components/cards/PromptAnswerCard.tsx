import { Text, View } from "react-native";
import type { PromptAnswerCard as PromptAnswerCardModel } from "@/domain/types";

/**
 * A written answer to a prompt — Hinge's signature layout: the question small
 * and muted, the answer large and given all the visual weight.
 */
export function PromptAnswerCard({
  content,
}: {
  content: PromptAnswerCardModel["content"];
}) {
  return (
    <View className="px-6 pb-16 pt-6">
      <Text className="text-[13px] font-semibold uppercase tracking-wider text-ink-muted">
        {content.promptTitle}
      </Text>
      <Text className="mt-3 pr-14 text-[26px] font-semibold leading-9 text-ink">
        {content.answerText}
      </Text>
    </View>
  );
}
