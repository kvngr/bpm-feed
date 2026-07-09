import { Text, View } from "react-native";
import { Icon } from "@/components/ui/Icon";
import { ActivityRings, RING_PALETTE } from "@/components/ui/ActivityRings";
import { frequencyLabel, frequencyLevel } from "@/domain/labels";
import { sportIcon } from "@/domain/sports";
import type { Sport, SportCard as SportCardModel } from "@/domain/types";

/** Legend row: sport icon tinted to its ring color + name + frequency. */
function LegendRow({ sport, color }: { sport: Sport; color: string }) {
  return (
    <View className="flex-row items-center gap-2.5">
      <View
        style={{ backgroundColor: `${color}22` }}
        className="h-8 w-8 items-center justify-center rounded-full"
      >
        <Icon name={sportIcon(sport.sportIcon)} size={15} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-[13px] font-semibold text-ink" numberOfLines={1}>
          {sport.sportName}
        </Text>
        <Text className="text-[11px] text-ink-muted">
          {frequencyLabel(sport.trainingFrequency)}
        </Text>
      </View>
    </View>
  );
}

/**
 * BPM's signature card: training intensity shown as Apple-Watch-style activity
 * rings (one ring per sport, filled by training frequency), with a
 * color-matched legend. The rings encode intensity, so no separate label.
 */
export function SportCard({ content }: { content: SportCardModel["content"] }) {
  const sports = content.sports.slice(0, RING_PALETTE.length);
  const rings = sports.map((sport, i) => ({
    value: frequencyLevel(sport.trainingFrequency) / 3,
    color: RING_PALETTE[i],
  }));

  return (
    <View className="gap-4 p-6">
      <Text className="text-lg font-bold text-ink">Ses sports</Text>
      <View className="flex-row items-center gap-5">
        <ActivityRings rings={rings} size={128} />
        <View className="flex-1 gap-3">
          {sports.map((sport, i) => (
            <LegendRow key={sport.sportKey} sport={sport} color={RING_PALETTE[i]} />
          ))}
        </View>
      </View>
    </View>
  );
}
