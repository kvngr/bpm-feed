import { StyleSheet, Text, View } from "react-native";
import { ActivityRings } from "@/components/ui/ActivityRings";
import { RING_PALETTE, colors, spacing, typography } from "@/theme/tokens";
import { frequencyLevel, sessionsPerWeek } from "@/domain/labels";
import type { Sport, SportCard as SportCardModel } from "@/domain/types";

/** One legend line: sport name, a dotted leader, and its weekly session count. */
function SessionRow({ sport, color }: { sport: Sport; color: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.sportName} numberOfLines={1}>
        {sport.sportName}
      </Text>
      <View style={styles.leader} />
      <Text style={[styles.value, { color }]}>{sessionsPerWeek(sport.trainingFrequency)}</Text>
    </View>
  );
}

/**
 * BPM's signature card: training intensity as Apple-Watch-style activity rings
 * (one ring per sport, filled by frequency), beside a legend of weekly sessions.
 * The rings encode intensity, so each row's value is color-matched to its ring.
 */
export function SportCard({ content }: { content: SportCardModel["content"] }) {
  const sports = content.sports.slice(0, RING_PALETTE.length);
  const rings = sports.map((sport, i) => ({
    value: frequencyLevel(sport.trainingFrequency) / 3,
    color: RING_PALETTE[i],
  }));

  return (
    <View style={styles.card}>
      <ActivityRings rings={rings} size={116} trackColor={colors.ringTrack} />
      <View style={styles.legend}>
        <Text style={styles.overline}>Séances / semaine</Text>
        {sports.map((sport, i) => (
          <SessionRow key={sport.sportKey} sport={sport} color={RING_PALETTE[i]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xl,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xxl,
  },
  legend: { flex: 1, gap: spacing.md },
  overline: { ...typography.overline, marginBottom: 2 },
  row: { flexDirection: "row", alignItems: "center" },
  sportName: { ...typography.body, flexShrink: 1 },
  leader: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderStyle: "dotted",
    borderColor: colors.hairline,
    marginHorizontal: spacing.sm,
  },
  value: { fontSize: 15, fontWeight: "800" },
});
