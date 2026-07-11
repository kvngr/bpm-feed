import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "@/components/ui/Icon";
import { BpmLogo } from "@/components/ui/BpmLogo";
import { Badge } from "@/components/ui/Badge";
import { colors, spacing } from "@/theme/tokens";

export type TabKey = "home" | "likes" | "matches" | "profile";

interface TabDef {
  key: TabKey;
  label: string;
  /** MaterialCommunityIcons glyph (Home uses the BPM logo instead). */
  icon?: string;
  logo?: boolean;
  badge?: number;
}

const TABS: TabDef[] = [
  { key: "home", label: "Home", logo: true },
  { key: "likes", label: "Likes", icon: "heart-outline", badge: 4 },
  { key: "matches", label: "Matches", icon: "chat-outline" },
  { key: "profile", label: "Profile", icon: "account-outline" },
];

interface TabBarProps {
  active: TabKey;
  onSelect: (key: TabKey) => void;
}

/** Bottom navigation, BPM-style: BPM pulse on Home, then Likes / Matches / Profile. */
export function TabBar({ active, onSelect }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const tint = isActive ? colors.text : colors.textFaint;
        return (
          <Pressable
            key={tab.key}
            style={styles.item}
            onPress={() => onSelect(tab.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab.label}
          >
            <View>
              {tab.logo ? (
                <BpmLogo size={24} color={tint} />
              ) : (
                <Icon name={tab.icon as string} size={24} color={tint} />
              )}
              {tab.badge ? (
                <View style={styles.badge}>
                  <Badge count={tab.badge} />
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, { color: tint }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.canvas,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
    paddingTop: spacing.sm,
  },
  item: { flex: 1, alignItems: "center", gap: 4, paddingVertical: 2 },
  label: { fontSize: 11, fontWeight: "600" },
  badge: { position: "absolute", top: -5, right: -10 },
});
