/**
 * Design tokens for the places that need a raw value in JS — vector-icon
 * colors, gradient stops, and cross-platform shadows (which NativeWind can't
 * express reliably). Keep colors in sync with `tailwind.config.js`.
 */
import type { ViewStyle } from "react-native";

export const colors = {
  canvas: "#F2EEE7",
  brand: "#5B2E8A",
  brandSoft: "#8B5FB0",
  brandDark: "#2A1140",
  ink: "#231F1D",
  inkMuted: "#7D746B",
  inkFaint: "#B7ADA3",
  surface: "#FFFFFF",
  surfaceSunken: "#F0EBE3",
  white: "#FFFFFF",
} as const;

/** Soft shadow used by floating cards. */
export const cardShadow = {
  shadowColor: "#2A1140",
  shadowOpacity: 0.08,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 10 },
  elevation: 4,
} as const;

/** Stronger, tighter shadow used by the floating action buttons. */
export const buttonShadow = {
  shadowColor: "#2A1140",
  shadowOpacity: 0.18,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  elevation: 6,
} as const;

/** Shared diameter for the floating like + pass buttons (keeps them consistent). */
export const ACTION_BUTTON_SIZE = 54;

/**
 * Circle style for the floating action buttons. Sizing is done here in plain
 * style (not NativeWind classes) so the like and pass buttons are guaranteed
 * pixel-identical regardless of how their `style` prop is shaped.
 */
export const circleStyle = (size: number): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: colors.white,
  alignItems: "center",
  justifyContent: "center",
});
