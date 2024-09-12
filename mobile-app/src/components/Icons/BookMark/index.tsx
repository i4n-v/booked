import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function BookMark(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_2398_10712)">
        <Path
          d="M22.667 4H9.333a2.675 2.675 0 00-2.666 2.667V28L16 24l9.333 4V6.667C25.333 5.2 24.133 4 22.667 4z"
          fill="url(#paint0_linear_2398_10712)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_2398_10712"
          x1={16.0001}
          y1={4}
          x2={16.0001}
          y2={28}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_2398_10712">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
