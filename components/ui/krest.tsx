import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Krest = () => (
  <Svg
    width={24}
    height={24}
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
    viewBox="0 0 512 512">
    <Path
      fill="#f44336"
      d="M232.5-.5h46c99.771 12.949 170.938 64.949 213.5 156 10.136 24.879 16.636 50.546 19.5 77v46c-12.949 99.771-64.949 170.938-156 213.5-24.878 10.136-50.545 16.636-77 19.5h-46c-99.773-12.951-170.94-64.951-213.5-156-10.136-24.879-16.636-50.546-19.5-77v-46C12.449 132.729 64.449 61.562 155.5 19c24.879-10.136 50.546-16.636 77-19.5Z"
      style={{
        opacity: 0.998,
      }}
    />
    <Path
      fill="#faf8f7"
      d="M169.5 155.5c7.624-1.051 14.624.449 21 4.5a5915.65 5915.65 0 0 0 65 64.5 6378.206 6378.206 0 0 1 68-66.5c14.129-5.848 24.629-2.014 31.5 11.5 1.549 7.619.216 14.619-4 21a5915.65 5915.65 0 0 0-64.5 65 6378.206 6378.206 0 0 1 66.5 68c4.686 10.8 2.853 20.3-5.5 28.5-9.266 4.977-18.266 4.644-27-1a5915.65 5915.65 0 0 0-65-64.5 6378.206 6378.206 0 0 1-68 66.5c-10.866 4.788-20.366 2.954-28.5-5.5-4.977-9.266-4.644-18.266 1-27a5915.65 5915.65 0 0 0 64.5-65 6378.206 6378.206 0 0 1-66.5-68c-5.983-14.342-2.15-25.008 11.5-32Z"
      style={{
        opacity: 1,
      }}
    />
  </Svg>
)
export default Krest
