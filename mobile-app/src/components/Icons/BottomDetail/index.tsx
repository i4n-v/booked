import React from "react";
import { Defs, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function BottomDetail(props: SvgProps) {
  return (
    <Svg width={200} height={159} viewBox="0 0 200 159" fill="none" {...props}>
      <Path
        d="M423.063 175.772c-211.532 14.455-167.695 109.279-211.532 175.772C94.706 351.544 0 272.848 0 175.772S94.706 0 211.531 0c116.826 0 211.532 78.696 211.532 175.772z"
        fill="url(#paint0_linear_1660_7548)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_1660_7548"
          x1={211.531}
          y1={0}
          x2={211.531}
          y2={351.544}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
