import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function Add(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 25.333a.971.971 0 01-.717-.283.971.971 0 01-.283-.717V17H7.667a.971.971 0 01-.717-.283.971.971 0 01-.283-.717c0-.289.094-.528.283-.717A.971.971 0 017.667 15H15V7.667c0-.29.095-.528.283-.717A.971.971 0 0116 6.667c.289 0 .528.094.717.283a.971.971 0 01.283.717V15h7.333c.29 0 .528.095.717.283a.97.97 0 01.283.717.971.971 0 01-.283.717.971.971 0 01-.717.283H17v7.333a.971.971 0 01-.283.717.971.971 0 01-.717.283z"
        fill="url(#paint0_linear_552_963)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_552_963"
          x1={16.0001}
          y1={6.66669}
          x2={16.0001}
          y2={25.3334}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
