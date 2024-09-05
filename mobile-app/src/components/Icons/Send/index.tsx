import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function User({ color, ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_892_2986)">
        <Path
          d="M4.533 27.2L27.8 17.227c1.08-.467 1.08-1.987 0-2.454L4.533 4.8A1.323 1.323 0 002.68 6.013l-.013 6.147c0 .667.493 1.24 1.16 1.32L22.667 16l-18.84 2.507a1.349 1.349 0 00-1.16 1.333l.013 6.147c0 .946.973 1.6 1.853 1.213z"
          fill="url(#paint0_linear_892_2986)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_892_2986"
          x1={15.6384}
          y1={4.68683}
          x2={15.6384}
          y2={27.3132}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color ?? "#9B51E0"} />
          <Stop offset={1} stopColor={color ?? "#720ECF"} />
        </LinearGradient>
        <ClipPath id="clip0_892_2986">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
