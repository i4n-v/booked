import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function Favorite({ color, ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1331_5183)">
        <Path
          d="M17.8 26.84a2.661 2.661 0 01-3.587-.013l-.146-.134c-7-6.333-11.574-10.48-11.4-15.653.08-2.267 1.24-4.44 3.12-5.72C9.307 2.92 13.653 4.04 16 6.787c2.347-2.747 6.693-3.88 10.213-1.467 1.88 1.28 3.04 3.453 3.12 5.72.187 5.173-4.4 9.32-11.4 15.68l-.133.12z"
          fill="url(#paint0_linear_1331_5183)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1331_5183"
          x1={16.0003}
          y1={3.99915}
          x2={16.0003}
          y2={27.5284}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1331_5183">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
