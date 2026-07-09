import "./global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "@/lib/queryClient";
import { FeedScreen } from "@/features/feed/screens/FeedScreen";

/**
 * App root: wires the global providers (data + safe area) around the single
 * feed screen. All feature logic lives under `src/features/feed`.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <FeedScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
