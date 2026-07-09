import { httpClient } from "./client";
import type { Card, FeedResponse, Profile } from "@/domain/types";
import feedFixture from "../../assets/mock/feed-response-example.json";

/**
 * The example feed lives behind a time-limited Notion signed URL. We try it
 * first (so the app exercises a real axios + network path), then fall back to
 * the bundled fixture when the URL has expired or the device is offline.
 *
 * Point this at the real BPM endpoint in production.
 */
export const FEED_URL =
  "https://file.notion.so/f/f/12645ff8-25b3-8171-b404-0003f6ab982e/cbe04cbc-69aa-47bf-8c8d-89eb6baa758a/feed-response-example.json?table=block&id=39845ff8-25b3-804a-895f-dc2d370de1f2&spaceId=12645ff8-25b3-8171-b404-0003f6ab982e&expirationTimestamp=1783627200000&signature=aXJah9_3-L2SUwmrt4GnRdnllFyhWBWMM_iuGAti6kY&downloadName=feed-response-example.json";

/** Cards can arrive unordered; always render them by `position`. */
function sortCards(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => a.position - b.position);
}

function normalize(data: FeedResponse): FeedResponse {
  const profiles: Profile[] = (data.profiles ?? []).map((profile) => ({
    ...profile,
    cards: sortCards(profile.cards ?? []),
  }));
  return { profiles };
}

export async function fetchFeed(): Promise<FeedResponse> {
  try {
    const { data } = await httpClient.get<FeedResponse>(FEED_URL);
    if (data?.profiles?.length) return normalize(data);
    throw new Error("Empty feed payload");
  } catch {
    // Graceful offline / expired-signature fallback to the bundled sample.
    return normalize(feedFixture as FeedResponse);
  }
}
