import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "@/lib/queryClient";
import { AppShell } from "@/navigation/AppShell";

/**
 * App root: wires the global providers (data + safe area) around the app shell
 * (bottom tab bar → feed). All feature logic lives under `src/features`.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppShell />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
