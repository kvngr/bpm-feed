/**
 * BPM design tokens — the single source of truth for the app's look.
 *
 * BPM ("Battements Par Minute") is a sport-focused dating app; the product is
 * dark-themed — a deep charcoal canvas, softly elevated cards, and neon
 * activity rings. These are plain JS values consumed by `StyleSheet.create`
 * everywhere: styling stays explicit, fully type-checked, and free of any
 * build-time utility-class transform.
 */
import type { TextStyle, ViewStyle } from "react-native";

export const colors = {
  // Canvas & surfaces (dark, low → high elevation)
  canvas: "#0B0B0D", // app background
  surface: "#161619", // elevated cards (prompt, sport, info)
  surfaceHigh: "#1F1F24", // controls, chips, pressed states
  hairline: "#2A2A31", // hairline borders / dividers
  ringTrack: "#26262C", // unfilled portion of an activity ring

  // Text
  text: "#FFFFFF",
  textMuted: "#9A9AA3",
  textFaint: "#65656E",

  // Brand & accents
  brand: "#FF3B6B", // heartbeat pink-red — the "like"
  boost: "#2E90FA", // electric blue — the "boost" control
  onLight: "#17171A", // ink drawn on the white action buttons

  white: "#FFFFFF",
  black: "#000000",
} as const;

/** Neon activity-ring palette, outer → inner (tuned to read on the dark surface). */
export const RING_PALETTE = ["#C6F24E", "#A575FF", "#FF5C93"] as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 22, // cards
  xl: 28,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

/** Shared diameter for the floating like + pass buttons (kept identical). */
export const ACTION_BUTTON_SIZE = 56;

/** Soft shadow for elevated cards. */
export const cardShadow = {
  shadowColor: "#000000",
  shadowOpacity: 0.35,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 12 },
  elevation: 6,
} as const;

/** Tighter, stronger shadow for the floating action buttons. */
export const buttonShadow = {
  shadowColor: "#000000",
  shadowOpacity: 0.5,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 },
  elevation: 9,
} as const;

/**
 * Circle for the floating action buttons. Sizing + fill live here in one place
 * so the like and pass buttons are guaranteed pixel-identical.
 */
export const circleStyle = (size: number, backgroundColor: string): ViewStyle => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor,
  alignItems: "center",
  justifyContent: "center",
});

/** Shared type ramp — keeps weights and sizes consistent across screens. */
export const typography = {
  screenTitle: { fontSize: 30, fontWeight: "800", letterSpacing: -0.6, color: colors.text },
  cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  promptQuestion: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.textMuted,
  },
  promptAnswer: { fontSize: 23, fontWeight: "700", lineHeight: 31, color: colors.text },
  body: { fontSize: 15, fontWeight: "500", color: colors.text },
  label: { fontSize: 13, fontWeight: "600", color: colors.text },
  caption: { fontSize: 11, fontWeight: "500", color: colors.textMuted },
  overline: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    color: colors.textMuted,
  },
} as const satisfies Record<string, TextStyle>;
