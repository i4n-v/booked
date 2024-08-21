import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function ArrowBack({ color, ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1696_9935)">
        <Path
          d="M22.16 3.987a1.666 1.666 0 00-2.36 0L8.72 15.067c-.52.52-.52 1.36 0 1.88l11.08 11.08a1.666 1.666 0 002.36 0 1.666 1.666 0 000-2.36L12.507 16l9.666-9.667c.64-.64.64-1.706-.013-2.346z"
          fill="url(#paint0_linear_1696_9935)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1696_9935"
          x1={15.4909}
          y1={3.49664}
          x2={15.4909}
          y2={28.5166}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1696_9935">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
