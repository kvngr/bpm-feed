import { StyleSheet, Text, View } from "react-native";
import { ACTION_BUTTON_SIZE, spacing, typography } from "@/theme/tokens";
import type { PromptAnswerCard as PromptAnswerCardModel } from "@/domain/types";

/**
 * A written answer to a prompt — the question small and muted, the answer large
 * and given all the visual weight. The generous bottom padding reserves the
 * bottom-right corner for the floating like button, so the answer text can
 * never be clipped or overlapped by it (however long it runs).
 */
export function PromptAnswerCard({
  content,
}: {
  content: PromptAnswerCardModel["content"];
}) {
  return (
    <View style={styles.root}>
      <Text style={styles.question}>{content.promptTitle}</Text>
      <Text style={styles.answer}>{content.answerText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
    // Clears the like button's vertical band (offset 12 + button + margin).
    paddingBottom: ACTION_BUTTON_SIZE + spacing.xl,
  },
  question: { ...typography.promptQuestion, marginBottom: spacing.md },
  answer: typography.promptAnswer,
});
