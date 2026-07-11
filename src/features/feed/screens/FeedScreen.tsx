import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFeed } from "../hooks/useFeed";
import { useProfileDeck } from "../hooks/useProfileDeck";
import { TopBar } from "../components/TopBar";
import { ProfileDeck } from "../components/ProfileDeck";
import { FeedSkeleton } from "../components/FeedSkeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { colors } from "@/theme/tokens";
import type { Profile } from "@/domain/types";

/** Stable empty reference so the deck doesn't reset every render while loading. */
const EMPTY: Profile[] = [];

/**
 * The feed screen. Owns the deck state so the top bar (current name + rewind)
 * and the deck stay in sync, then maps query state to UI. The feed shows one
 * profile at a time — never a list of everyone.
 */
export function FeedScreen() {
  const { data, isPending, isError, isRefetching, refetch } = useFeed();
  const profiles = data?.profiles ?? EMPTY;
  const deck = useProfileDeck(profiles);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <TopBar title={deck.profile?.firstname ?? "bpm"} canUndo={deck.canUndo} onUndo={deck.undo} />
      {isPending ? (
        <FeedSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : profiles.length === 0 ? (
        <EmptyState />
      ) : (
        <ProfileDeck deck={deck} refreshing={isRefetching} onRefresh={() => refetch()} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
});
