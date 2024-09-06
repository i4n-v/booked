import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function ArrowDown(props: SvgProps) {
  return (
    <Svg width={22} height={10} viewBox="0 0 22 10" fill="none" {...props}>
      <G clipPath="url(#clip0_355_666)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.382 8.76a1.5 1.5 0 01-1.664.002L.709 2.775A1.5 1.5 0 012.37.277l8.176 5.433 8.16-5.458a1.5 1.5 0 011.668 2.494l-8.99 6.013z"
          fill="url(#paint0_linear_355_666)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_355_666"
          x1={10.5504}
          y1={9.01257}
          x2={10.537}
          y2={0.0124254}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_355_666">
          <Path fill="#fff" transform="rotate(179.915 10.522 4.506)" d="M0 0H21V9H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
