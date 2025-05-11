import * as React from "react"
import Svg, { Path } from "react-native-svg"
const RedHeart = () => (
  <Svg
    width={26}
    height={26}
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 512 512"
  >
    <Path
      fill="#f44335"
      d="M511.5 165.5v32c-4.075 28.152-15.242 53.152-33.5 75A32047.97 32047.97 0 0 0 266.5 487c-7.333 4.667-14.667 4.667-22 0A31748.027 31748.027 0 0 0 34 273.5c-19.096-21.525-30.596-46.525-34.5-75v-34c7.81-51.125 34.81-88.291 81-111.5 49.543-19.415 95.877-13.748 139 17a351.901 351.901 0 0 1 36 34.5 1699.405 1699.405 0 0 1 30-29.5c42.027-34.008 88.694-42.008 140-24 49.407 22.576 78.074 60.742 86 114.5Z"
      style={{
        opacity: 0.997,
      }}
    />
  </Svg>
)
export default RedHeart
