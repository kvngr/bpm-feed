import { Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { INFO_FIELDS } from "@/domain/infoFields";
import { colors } from "@/theme/tokens";
import type { InfoCard as InfoCardModel } from "@/domain/types";

/**
 * Profile vitals as a wrap of chips (Hinge-style). Rows whose value resolves to
 * `null` (e.g. missing education) are dropped, so no empty chips appear.
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
    <View className="p-6">
      <Text className="mb-4 text-lg font-bold text-ink">Bon à savoir</Text>
      <View className="flex-row flex-wrap gap-2">
        {visible.map((row) => (
          <View
            key={row.key}
            className="flex-row items-center gap-1.5 rounded-full bg-surface-sunken px-3.5 py-2"
          >
            <Icon name={row.icon} size={15} color={colors.brand} />
            <Text className="text-sm font-medium text-ink">{row.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
