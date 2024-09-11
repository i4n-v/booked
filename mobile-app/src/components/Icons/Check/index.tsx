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

function Check(props:SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1688_9678)">
        <Path
          d="M12 21.6l-4.666-4.667a1.312 1.312 0 00-1.867 0c-.52.52-.52 1.347 0 1.867l5.587 5.587c.52.52 1.36.52 1.88 0l14.133-14.12c.52-.52.52-1.347 0-1.867a1.312 1.312 0 00-1.866 0L12 21.6z"
          fill="url(#paint0_linear_1688_9678)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_1688_9678"
          x1={16.2671}
          y1={8.01001}
          x2={16.2671}
          y2={24.7767}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9B51E0" />
          <Stop offset={1} stopColor="#720ECF" />
        </LinearGradient>
        <ClipPath id="clip0_1688_9678">
          <Path fill="#fff" d="M0 0H32V32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Check
