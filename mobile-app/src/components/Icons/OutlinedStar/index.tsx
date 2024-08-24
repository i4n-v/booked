import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps } from "react-native-svg";

export default function OutlinedStar(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_332_40)">
        <Path
          d="M26.2 12.053l-6.453-.56-2.52-5.933c-.454-1.08-2-1.08-2.454 0l-2.52 5.947-6.44.546c-1.173.094-1.653 1.56-.76 2.334l4.894 4.24L8.48 24.92c-.267 1.147.973 2.053 1.987 1.44L16 23.027l5.533 3.346c1.014.614 2.254-.293 1.987-1.44l-1.467-6.306 4.894-4.24c.893-.774.426-2.24-.747-2.334zM16 20.533l-5.013 3.027 1.333-5.707-4.427-3.84 5.84-.506L16 8.133l2.28 5.387 5.84.507-4.427 3.84 1.334 5.706L16 20.533z"
          fill="url(#paint0_linear_332_40)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_332_40"
          x1={16.0019}
          y1={4.75}
          x2={16.0019}
          y2={26.5711}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_332_40">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
