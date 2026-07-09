import { Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { colors } from "@/theme/tokens";
import type { Profile } from "@/domain/types";

/** Name + age + city banner shown above each profile's card stack. */
export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <View className="mb-3 mt-1 px-1">
      <View className="flex-row items-end gap-2">
        <Text className="text-4xl font-extrabold tracking-tight text-ink">
          {profile.firstname}
        </Text>
        <Text className="mb-1 text-2xl font-medium text-ink-muted">{profile.age}</Text>
      </View>
      <View className="mt-1.5 flex-row items-center gap-1.5">
        <Icon name="map-marker" size={14} color={colors.inkMuted} />
        <Text className="text-sm text-ink-muted">{profile.city}</Text>
      </View>
    </View>
  );
}
