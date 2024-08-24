import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps } from "react-native-svg";

export default function Star(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_332_41)">
        <Path
          d="M19.24 13.333L17.28 6.88c-.387-1.267-2.173-1.267-2.547 0l-1.973 6.453H6.827C5.533 13.333 5 15 6.053 15.747l4.854 3.466L9 25.36c-.387 1.24 1.053 2.24 2.08 1.453L16 23.08l4.92 3.747c1.027.786 2.467-.214 2.08-1.454l-1.907-6.146 4.854-3.467c1.053-.76.52-2.413-.774-2.413H19.24v-.014z"
          fill="url(#paint0_linear_332_41)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_332_41"
          x1={16}
          y1={5.92999}
          x2={16}
          y2={27.1059}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_332_41">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
