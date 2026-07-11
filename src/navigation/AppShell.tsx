import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { FeedScreen } from "@/features/feed/screens/FeedScreen";
import { PlaceholderScreen } from "@/components/feedback/PlaceholderScreen";
import { TabBar, type TabKey } from "./TabBar";
import { colors } from "@/theme/tokens";

/** Copy for the not-yet-built tabs. Keeps `AppShell` declarative. */
const PLACEHOLDERS: Record<Exclude<TabKey, "home">, { icon: string; title: string; subtitle: string }> = {
  likes: {
    icon: "heart-multiple-outline",
    title: "Tes likes",
    subtitle: "Retrouve ici les profils qui ont accéléré ton rythme cardiaque.",
  },
  matches: {
    icon: "chat-outline",
    title: "Tes matchs",
    subtitle: "Vos conversations et vos prochaines sessions de sport à deux.",
  },
  profile: {
    icon: "account-outline",
    title: "Ton profil",
    subtitle: "Gère tes photos, tes sports et tes préférences de rencontre.",
  },
};

/**
 * The app frame: a bottom tab bar switching between the feed (Home) and the
 * other tabs. There's only one built screen — the feed — so a single local
 * `tab` state is all the navigation this needs (no router dependency).
 */
export function AppShell() {
  const [tab, setTab] = useState<TabKey>("home");

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <View style={styles.body}>
        {tab === "home" ? <FeedScreen /> : <PlaceholderScreen {...PLACEHOLDERS[tab]} />}
      </View>
      <TabBar active={tab} onSelect={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.canvas },
  body: { flex: 1 },
});
