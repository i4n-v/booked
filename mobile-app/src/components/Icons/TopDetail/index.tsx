import React from "react";
import { Circle, Defs, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function TopDetail(props: SvgProps) {
  return (
    <Svg width={178} height={181} viewBox="0 0 178 181" fill="none" {...props}>
      <Path
        d="M67 47.5C67 121.23 6.782 181-67.5 181S-202 121.23-202 47.5C-202-26.23-141.782-86-67.5-86S67-26.23 67 47.5z"
        fill="url(#paint0_linear_1842_10450)"
      />
      <Circle cx={43.5} cy={-47.5} r={134.5} fill="url(#paint1_linear_1842_10450)" />
      <Defs>
        <LinearGradient
          id="paint0_linear_1842_10450"
          x1={-67.5}
          y1={-86}
          x2={-67.5}
          y2={181}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#720ECF" />
          <Stop offset={1} stopColor="#54079D" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1842_10450"
          x1={43.5}
          y1={-182}
          x2={43.5}
          y2={87}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
