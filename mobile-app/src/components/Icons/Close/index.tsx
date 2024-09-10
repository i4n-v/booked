import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps
} from "react-native-svg"

function Close(props:SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1751_10239)">
        <Path
          d="M24.4 7.613c-.52-.52-1.36-.52-1.88 0L16 14.12 9.48 7.6c-.52-.52-1.36-.52-1.88 0-.52.52-.52 1.36 0 1.88L14.12 16 7.6 22.52c-.52.52-.52 1.36 0 1.88.52.52 1.36.52 1.88 0L16 17.88l6.52 6.52c.52.52 1.36.52 1.88 0 .52-.52.52-1.36 0-1.88L17.88 16l6.52-6.52a1.336 1.336 0 000-1.867z"
          fill="url(#paint0_linear_1751_10239)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1751_10239"
          x1={16}
          y1={7.20996}
          x2={16}
          y2={24.79}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1751_10239">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Close
