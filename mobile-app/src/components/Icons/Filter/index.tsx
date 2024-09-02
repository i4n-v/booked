import React from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export default function Filter({ color, ...props }: SvgProps) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M4 25.267v-2h8.233v2H4zM4 8.733v-2h13.767v2H4zM14.233 28v-7.5h2v2.767H28v2H16.233V28h-2zm-4-8.267V17H4v-2h6.233v-2.8h2v7.533h-2zm4-2.733v-2H28v2H14.233zm5.534-5.5V4h2v2.733H28v2h-6.233V11.5h-2z"
        fill="#fff"
      />
    </Svg>
  );
}
