import * as Haptics from "expo-haptics";

/**
 * Fire-and-forget haptics. Every call is guarded so unsupported platforms
 * (web, simulators without a Taptic Engine) silently no-op instead of throwing.
 */
const run = (p: Promise<unknown> | void) => {
  if (p && typeof (p as Promise<unknown>).catch === "function") {
    (p as Promise<unknown>).catch(() => {});
  }
};

export const haptics = {
  light: () => run(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  medium: () => run(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  heavy: () => run(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)),
  success: () => run(Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  selection: () => run(Haptics.selectionAsync()),
};
