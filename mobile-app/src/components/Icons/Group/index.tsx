import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, ClipPath, SvgProps } from "react-native-svg";

function Group(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1734_10483)">
        <Path
          d="M16 17c2.173 0 4.093.52 5.653 1.2A3.98 3.98 0 0124 21.84v.827C24 23.4 23.4 24 22.667 24H9.333C8.6 24 8 23.4 8 22.667v-.814c0-1.573.907-3.013 2.347-3.64A13.921 13.921 0 0116 17zm-10.667.333C6.8 17.333 8 16.133 8 14.667 8 13.2 6.8 12 5.333 12a2.675 2.675 0 00-2.666 2.667c0 1.466 1.2 2.666 2.666 2.666zM6.84 18.8a9.31 9.31 0 00-1.507-.133c-1.32 0-2.573.28-3.706.773A2.681 2.681 0 000 21.907v.76C0 23.4.6 24 1.333 24H6v-2.147c0-1.106.307-2.146.84-3.053zm19.827-1.467c1.466 0 2.666-1.2 2.666-2.666 0-1.467-1.2-2.667-2.666-2.667A2.675 2.675 0 0024 14.667c0 1.466 1.2 2.666 2.667 2.666zM32 21.907c0-1.08-.64-2.04-1.627-2.467a9.267 9.267 0 00-3.706-.773 9.31 9.31 0 00-1.507.133c.533.907.84 1.947.84 3.053V24h4.667C31.4 24 32 23.4 32 22.667v-.76zM16 8c2.213 0 4 1.787 4 4s-1.787 4-4 4-4-1.787-4-4 1.787-4 4-4z"
          fill="url(#paint0_linear_1734_10483)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1734_10483"
          x1={16}
          y1={8}
          x2={16}
          y2={24}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1734_10483">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Group;
