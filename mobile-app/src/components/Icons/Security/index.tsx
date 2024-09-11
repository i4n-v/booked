import React from "react";
import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

function Security(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M19 9.667h-1.334V7A6.669 6.669 0 0011 .333 6.67 6.67 0 004.333 7v2.667H3a2.675 2.675 0 00-2.667 2.666v13.334c0 1.466 1.2 2.666 2.667 2.666h16c1.466 0 2.666-1.2 2.666-2.666V12.333c0-1.466-1.2-2.666-2.666-2.666zm-8 12A2.675 2.675 0 018.333 19c0-1.467 1.2-2.667 2.667-2.667 1.466 0 2.666 1.2 2.666 2.667 0 1.467-1.2 2.667-2.666 2.667zm-4-12V7c0-2.213 1.786-4 4-4 2.213 0 4 1.787 4 4v2.667H7z"
        fill="url(#paint0_linear_2207_9788)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_2207_9788"
          x1={10.9997}
          y1={0.333252}
          x2={10.9997}
          y2={28.3333}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Security;
