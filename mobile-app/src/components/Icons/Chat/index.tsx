import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function Chat(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1207_3681)">
        <Path
          d="M26.667 2.667H5.333a2.675 2.675 0 00-2.666 2.666v24L8 24h18.667c1.466 0 2.666-1.2 2.666-2.667v-16c0-1.466-1.2-2.666-2.666-2.666z"
          fill="url(#paint0_linear_1207_3681)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1207_3681"
          x1={16.0001}
          y1={2.66669}
          x2={16.0001}
          y2={29.3334}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1207_3681">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
