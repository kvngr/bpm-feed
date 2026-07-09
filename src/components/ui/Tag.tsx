import { Text, View } from "react-native";
import { Icon } from "./Icon";
import { colors } from "@/theme/tokens";

interface TagProps {
  label: string;
  icon?: string;
  /** `solid` for the brand-filled variant, `soft` for the tinted default. */
  variant?: "soft" | "solid";
}

/**
 * Small pill used for sports, prompt categories, etc.
 */
export function Tag({ label, icon, variant = "soft" }: TagProps) {
  const solid = variant === "solid";
  return (
    <View
      className={`flex-row items-center gap-1.5 self-start rounded-full px-3 py-1.5 ${
        solid ? "bg-brand" : "bg-surface-sunken"
      }`}
    >
      {icon ? (
        <Icon name={icon} size={14} color={solid ? colors.white : colors.ink} />
      ) : null}
      <Text className={`text-xs font-semibold ${solid ? "text-white" : "text-ink"}`}>
        {label}
      </Text>
    </View>
  );
}
