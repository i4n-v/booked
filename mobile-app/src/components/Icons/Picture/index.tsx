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

export default function Picture(props: SvgProps) {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props} >
      <G clip-path="url(#clip0_1748_10478)">
        <Path
          d="M19.25 17.4167V4.58333C19.25 3.575 18.425 2.75 17.4167 2.75H4.58333C3.575 2.75 2.75 3.575 2.75 4.58333V17.4167C2.75 18.425 3.575 19.25 4.58333 19.25H17.4167C18.425 19.25 19.25 18.425 19.25 17.4167ZM8.15833 12.815L10.0833 15.1342L12.925 11.4767C13.1083 11.2383 13.475 11.2383 13.6583 11.4858L16.8758 15.7758C17.105 16.0783 16.885 16.5092 16.5092 16.5092H5.51833C5.13333 16.5092 4.9225 16.0692 5.16083 15.7667L7.44333 12.8333C7.6175 12.595 7.96583 12.5858 8.15833 12.815Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1748_10478">
          <Rect width="22" height="22" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
