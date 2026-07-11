import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThumbImage } from "@/components/ui/ThumbImage";
import { Icon } from "@/components/ui/Icon";
import { colors, radius, spacing } from "@/theme/tokens";
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
    <View style={styles.root}>
      <ThumbImage thumbhash={content.thumbhash} style={StyleSheet.absoluteFill} />
      <View style={[StyleSheet.absoluteFill, styles.overlay]} />

      <View style={styles.center}>
        <View style={styles.lock}>
          <Icon name="lock" size={26} color={colors.white} />
        </View>
        <Text style={styles.title}>{content.promptTitle ?? "Photo privée"}</Text>
        <Text style={styles.subtitle}>Visible après un match ou avec BPM Premium</Text>
        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Débloquer la photo"
        >
          <Text style={styles.ctaText}>Débloquer</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", aspectRatio: 4 / 5, alignItems: "center", justifyContent: "center" },
  overlay: { backgroundColor: "rgba(0,0,0,0.55)" },
  center: { alignItems: "center", gap: spacing.sm, paddingHorizontal: spacing.xxl },
  lock: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  title: { fontSize: 16, fontWeight: "700", color: colors.white },
  subtitle: { fontSize: 12, color: "rgba(255,255,255,0.75)", textAlign: "center" },
  cta: {
    marginTop: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  ctaText: { fontSize: 14, fontWeight: "700", color: colors.onLight },
  pressed: { opacity: 0.85 },
});
