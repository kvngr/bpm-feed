import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFeed } from "../hooks/useFeed";
import { ProfileDeck } from "../components/ProfileDeck";
import { FeedSkeleton } from "@/components/feedback/FeedSkeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";

/** Minimal top app bar with the centered BPM wordmark. */
function FeedHeader() {
  return (
    <View className="items-center px-5 pb-3 pt-1">
      <Text className="text-2xl font-extrabold lowercase tracking-tight text-brand">bpm</Text>
    </View>
  );
}

/**
 * The one screen of the app. Maps query state to UI and hands successful data
 * to the profile deck (one profile at a time). No list of everyone at once.
 */
export function FeedScreen() {
  const { data, isPending, isError, isRefetching, refetch } = useFeed();
  const profiles = data?.profiles ?? [];

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <StatusBar style="dark" />
      <FeedHeader />
      {isPending ? (
        <FeedSkeleton />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : profiles.length === 0 ? (
        <EmptyState />
      ) : (
        <ProfileDeck profiles={profiles} refreshing={isRefetching} onRefresh={refetch} />
      )}
    </SafeAreaView>
  );
}
