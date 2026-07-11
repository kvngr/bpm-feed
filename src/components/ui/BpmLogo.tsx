import Svg, { Path } from "react-native-svg";
import { colors } from "@/theme/tokens";

interface BpmLogoProps {
  size?: number;
  color?: string;
}

/**
 * The BPM mark: a single-stroke ECG heartbeat pulse — "Battements Par Minute".
 * Drawn as SVG so it stays crisp at any size and can be tinted per placement
 * (active tab, splash, exhausted state).
 */
export function BpmLogo({ size = 24, color = colors.text }: BpmLogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1.5 12H6l2.4-6 3.4 12 3-9 1.9 3h4.3"
        stroke={color}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
