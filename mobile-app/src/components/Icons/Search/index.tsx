import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function Search(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1675_7369)">
        <Path
          d="M20.666 18.667h-1.053l-.373-.36a8.667 8.667 0 001.973-7.12c-.627-3.707-3.72-6.667-7.453-7.12a8.673 8.673 0 00-9.693 9.693c.453 3.733 3.413 6.827 7.12 7.453a8.667 8.667 0 007.12-1.973l.36.373v1.054l5.666 5.666c.547.547 1.44.547 1.987 0a1.408 1.408 0 000-1.986l-5.654-5.68zm-8 0c-3.32 0-6-2.68-6-6s2.68-6 6-6 6 2.68 6 6-2.68 6-6 6z"
          fill="url(#paint0_linear_1675_7369)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1675_7369"
          x1={15.3644}
          y1={3.99915}
          x2={15.3644}
          y2={26.7433}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1675_7369">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
