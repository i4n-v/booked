import React from "react";
import {
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  Svg,
  SvgProps,
} from "react-native-svg";

export default function Send(props: SvgProps) {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <G clip-path="url(#clip0_1748_10597)">
        <Path
          d="M3.11634 18.7L19.1122 11.8433C19.8547 11.5225 19.8547 10.4775 19.1122 10.1566L3.11634 3.29997C2.51134 3.03414 1.84217 3.48331 1.84217 4.13414L1.83301 8.35997C1.83301 8.81831 2.17217 9.21247 2.63051 9.26747L15.583 11L2.63051 12.7233C2.17217 12.7875 1.83301 13.1816 1.83301 13.64L1.84217 17.8658C1.84217 18.5166 2.51134 18.9658 3.11634 18.7Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1748_10597">
          <Rect width="22" height="22" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
