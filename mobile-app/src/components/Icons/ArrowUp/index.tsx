import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function ArrowUp(props: SvgProps) {
  return (
    <Svg width={21} height={9} viewBox="0 0 21 9" fill="none" {...props}>
      <G clipPath="url(#clip0_355_667)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.668.252a1.5 1.5 0 011.664 0l9 6a1.5 1.5 0 11-1.664 2.496L10.5 3.303 2.332 8.748A1.5 1.5 0 11.668 6.252l9-6z"
          fill="url(#paint0_linear_355_667)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_355_667"
          x1={10.5002}
          y1={0}
          x2={10.5002}
          y2={9.00016}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_355_667">
          <Path fill="#fff" d="M0 0H21V9H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
