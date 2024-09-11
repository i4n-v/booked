import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps } from "react-native-svg";

export default function More(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M15.996 26.667a1.53 1.53 0 01-1.129-.472 1.553 1.553 0 01-.467-1.133c0-.441.157-.818.472-1.129a1.553 1.553 0 011.133-.466c.441 0 .818.157 1.129.471.31.314.466.692.466 1.133 0 .442-.157.818-.471 1.129a1.553 1.553 0 01-1.133.467zm0-9.067a1.53 1.53 0 01-1.129-.471 1.553 1.553 0 01-.467-1.134c0-.441.157-.817.472-1.128a1.553 1.553 0 011.133-.467c.441 0 .818.157 1.129.471.31.315.466.692.466 1.134 0 .441-.157.817-.471 1.128a1.553 1.553 0 01-1.133.467zm0-9.067a1.53 1.53 0 01-1.129-.471 1.553 1.553 0 01-.467-1.133c0-.442.157-.818.472-1.129a1.553 1.553 0 011.133-.467c.441 0 .818.157 1.129.472.31.314.466.692.466 1.133 0 .441-.157.818-.471 1.129a1.553 1.553 0 01-1.133.466z"
        fill="url(#paint0_linear_1732_9981)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1732_9981"
          x1={16.0004}
          y1={5.33331}
          x2={16.0004}
          y2={26.6666}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
