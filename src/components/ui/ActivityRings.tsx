import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

/** Muted palette (reads on a light surface), outer → inner: green, violet, rose. */
export const RING_PALETTE = ["#5BBE8E", "#8E71C9", "#DF7CA3"];

export interface RingSpec {
  /** Fill fraction, 0 → 1. */
  value: number;
  color: string;
}

interface ActivityRingsProps {
  rings: RingSpec[];
  size?: number;
  strokeWidth?: number;
  /** Space between concentric rings. */
  gap?: number;
  /** Track behind the unfilled part of each ring. */
  trackColor?: string;
}

/**
 * Concentric progress rings, Apple-Watch-activity style. Each ring is an arc
 * whose length encodes `value`, starting at 12 o'clock and sweeping clockwise
 * (the whole group is rotated -90°), with rounded caps. A soft glow is faked
 * with two wider, low-opacity strokes underneath the crisp arc — reliable
 * across platforms without SVG filters. Tuned for a light surface.
 */
export function ActivityRings({
  rings,
  size = 136,
  strokeWidth = 12,
  gap = 7,
  trackColor = "#E9E3D8",
}: ActivityRingsProps) {
  const center = size / 2;
  const widestGlow = strokeWidth + 12;
  const rOuter = center - widestGlow / 2 - 1;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation={-90} originX={center} originY={center}>
          {rings.map((ring, i) => {
            const r = rOuter - i * (strokeWidth + gap);
            if (r <= 0) return null;

            const circumference = 2 * Math.PI * r;
            const value = Math.max(0, Math.min(1, ring.value));
            const dash = value * circumference;
            const dashArray: [number, number] = [dash, circumference];

            return (
              <G key={i}>
                {/* Track behind the ring */}
                <Circle
                  cx={center}
                  cy={center}
                  r={r}
                  stroke={trackColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                />
                {/* Glow (wide, faint) */}
                {value > 0 ? (
                  <Circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke={ring.color}
                    strokeOpacity={0.05}
                    strokeWidth={strokeWidth + 9}
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    fill="none"
                  />
                ) : null}
                {value > 0 ? (
                  <Circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke={ring.color}
                    strokeOpacity={0.1}
                    strokeWidth={strokeWidth + 4}
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    fill="none"
                  />
                ) : null}
                {/* Crisp arc */}
                {value > 0 ? (
                  <Circle
                    cx={center}
                    cy={center}
                    r={r}
                    stroke={ring.color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    fill="none"
                  />
                ) : null}
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
