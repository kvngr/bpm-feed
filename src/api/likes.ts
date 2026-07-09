/**
 * Stubbed "like a card" endpoint.
 *
 * There's no write API in the exercise, so this resolves locally. In a real
 * app it would `httpClient.post("/likes", payload)` — the call site
 * (`useLikeCard`) wouldn't change.
 */
export interface LikePayload {
  userId: string;
  cardId: string;
}

export async function sendLike(payload: LikePayload): Promise<LikePayload> {
  // Simulate a resolved network write.
  return Promise.resolve(payload);
}
