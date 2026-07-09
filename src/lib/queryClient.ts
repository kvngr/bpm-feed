import { QueryClient } from "@tanstack/react-query";

/**
 * Single app-wide query client. Feed data is fairly stable within a session,
 * so we keep a generous stale time and avoid noisy refetch-on-focus.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
