import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Galochka = () => (
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
    viewBox="0 0 512 512">
    <Path
      fill="#00ba00"
      d="M236.5 31.5c93.792-3.697 165.292 33.97 214.5 113 37.338 71.021 38.672 142.688 4 215-43.78 77.166-110.28 117.499-199.5 121-85.751-3.435-150.917-41.435-195.5-114-29.775-55.311-36.442-113.311-20-174C64.833 115.667 115.667 64.833 192.5 40c14.621-3.825 29.288-6.658 44-8.5Zm99 144c16.197-.301 25.53 7.532 28 23.5a33.559 33.559 0 0 1-3.5 12.5A9514.234 9514.234 0 0 1 244.5 328c-9.89 8.748-20.556 9.748-32 3L153 271.5c-7.333-10-7.333-20 0-30 9.388-8.854 19.888-10.354 31.5-4.5l41 41c1 .667 2 .667 3 0l98-98a56.846 56.846 0 0 1 9-4.5Z"
      style={{
        opacity: 0.995,
      }}
    />
  </Svg>
)
export default Galochka
