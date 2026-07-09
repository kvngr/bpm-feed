import { useMutation } from "@tanstack/react-query";
import { sendLike, type LikePayload } from "@/api/likes";

/**
 * Fire-and-forget "like" mutation. The button owns its own visual toggle, so
 * we don't need optimistic cache surgery here — just report the intent.
 */
export function useLikeCard() {
  return useMutation({
    mutationFn: (payload: LikePayload) => sendLike(payload),
  });
}
