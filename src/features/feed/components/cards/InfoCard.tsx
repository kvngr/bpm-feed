import { StyleSheet, Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { INFO_FIELDS } from "@/domain/infoFields";
import { colors, radius, spacing, typography } from "@/theme/tokens";
import type { InfoCard as InfoCardModel } from "@/domain/types";

/**
 * Profile vitals as a wrap of chips. Rows whose value resolves to `null` (e.g.
 * missing education) are dropped, so no empty chips appear.
 */
export function InfoCard({ content }: { content: InfoCardModel["content"] }) {
  type Row = { key: string; icon: string; text: string | null };
  const rows: Row[] = INFO_FIELDS.map((field) => ({
    key: field.key,
    icon: field.icon,
    text: field.value(content),
  }));
  const visible = rows.filter((row): row is Row & { text: string } => !!row.text);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bon à savoir</Text>
      <View style={styles.chips}>
        {visible.map((row) => (
          <View key={row.key} style={styles.chip}>
            <Icon name={row.icon} size={15} color={colors.textMuted} />
            <Text style={styles.chipText}>{row.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.xxl },
  title: { ...typography.cardTitle, marginBottom: spacing.lg },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm,
  },
  chipText: typography.label,
});
