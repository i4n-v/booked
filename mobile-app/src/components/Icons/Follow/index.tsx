import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function User({ color, ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1712_11027)">
        <Path
          d="M20 16a5.332 5.332 0 005.334-5.333A5.332 5.332 0 0020 5.333a5.332 5.332 0 00-5.333 5.334A5.332 5.332 0 0020 16zM8 13.333v-2.666c0-.734-.6-1.334-1.333-1.334s-1.333.6-1.333 1.334v2.666H2.667c-.733 0-1.333.6-1.333 1.334 0 .733.6 1.333 1.333 1.333h2.667v2.667c0 .733.6 1.333 1.333 1.333S8 19.4 8 18.667V16h2.667C11.4 16 12 15.4 12 14.667c0-.734-.6-1.334-1.333-1.334H8zm12 5.334c-3.56 0-10.666 1.786-10.666 5.333v1.333c0 .734.6 1.334 1.333 1.334h18.666c.734 0 1.334-.6 1.334-1.334V24c0-3.547-7.107-5.333-10.667-5.333z"
          fill="url(#paint0_linear_1712_11027)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1712_11027"
          x1={16.0002}
          y1={5.33337}
          x2={16.0002}
          y2={26.6667}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color ? color : "#9B51E0"} />
          <Stop offset={1} stopColor={color ? color : "#720ECF"} />
        </LinearGradient>
        <ClipPath id="clip0_1712_11027">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
