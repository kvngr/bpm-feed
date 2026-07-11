import { useQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/api/feed";

export const feedKeys = {
  all: ["feed"] as const,
};

/**
 * Loads the discovery feed. Components read `data`, `isPending`, `isError`
 * and `refetch` from here — no fetching logic leaks into the UI.
 */
export function useFeed() {
  return useQuery({
    queryKey: feedKeys.all,
    queryFn: ({ signal }) => fetchFeed(signal),
  });
}
