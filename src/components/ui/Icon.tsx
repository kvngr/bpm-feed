import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@/theme/tokens";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

/**
 * Thin wrapper around MaterialCommunityIcons so the rest of the app can pass
 * glyph names as plain strings (our domain maps produce strings, not the
 * library's literal union).
 */
export function Icon({ name, size = 20, color = colors.ink }: IconProps) {
  return <MaterialCommunityIcons name={name as never} size={size} color={color} />;
}
