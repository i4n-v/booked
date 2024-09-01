import React from "react";
import { ClipPath, Defs, G, LinearGradient, Path, Stop, Svg, SvgProps } from "react-native-svg";

export default function FavoriteOutlined(props: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#clip0_1331_5184)">
        <Path
          d="M26.213 5.32C22.693 2.92 18.347 4.04 16 6.787 13.653 4.04 9.307 2.907 5.787 5.32c-1.867 1.28-3.04 3.44-3.12 5.72-.187 5.173 4.4 9.32 11.4 15.68l.133.12c1.013.92 2.573.92 3.587-.013l.146-.134c7-6.346 11.574-10.493 11.4-15.666-.08-2.267-1.253-4.427-3.12-5.707zm-10.08 19.413l-.133.134-.133-.134c-6.347-5.746-10.534-9.546-10.534-13.4 0-2.666 2-4.666 4.667-4.666 2.053 0 4.053 1.32 4.76 3.146h2.493c.694-1.826 2.694-3.146 4.747-3.146 2.667 0 4.667 2 4.667 4.666 0 3.854-4.187 7.654-10.534 13.4z"
          fill="url(#paint0_linear_1331_5184)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1331_5184"
          x1={15.9996}
          y1={3.99915}
          x2={15.9996}
          y2={27.5284}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1331_5184">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
