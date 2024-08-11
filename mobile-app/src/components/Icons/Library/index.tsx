import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function Library(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1674_8235)">
        <Path
          d="M22.667 26.667h-16c-.734 0-1.334-.6-1.334-1.334v-16C5.333 8.6 4.733 8 4 8s-1.333.6-1.333 1.333v17.334c0 1.466 1.2 2.666 2.666 2.666h17.334c.733 0 1.333-.6 1.333-1.333s-.6-1.333-1.333-1.333zm4-24h-16A2.674 2.674 0 008 5.333v16C8 22.8 9.2 24 10.667 24h16c1.466 0 2.666-1.2 2.666-2.667v-16c0-1.466-1.2-2.666-2.666-2.666zm0 13.333l-3.334-2L20 16V5.333h6.667V16z"
          fill="url(#paint0_linear_1674_8235)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1674_8235"
          x1={16.0001}
          y1={2.66669}
          x2={16.0001}
          y2={29.3334}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1674_8235">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
