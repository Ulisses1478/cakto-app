import Svg, { Path } from "react-native-svg";

import { theme } from "@/styles/theme";

function CheckCircle() {
  return (
    <Svg width="49" height="48" viewBox="0 0 49 48" fill="none">
      <Path
        d="M40.5 22.5372V24.0092C40.498 27.4594 39.3808 30.8166 37.3149 33.5801C35.2491 36.3435 32.3452 38.3651 29.0366 39.3434C25.7279 40.3217 22.1916 40.2042 18.9551 39.0085C15.7187 37.8128 12.9554 35.6029 11.0775 32.7085C9.19963 29.814 8.30767 26.3901 8.53468 22.9473C8.7617 19.5045 10.0955 16.2273 12.3372 13.6045C14.579 10.9817 17.6085 9.15377 20.9739 8.39339C24.3393 7.63301 27.8604 7.9809 31.012 9.38516M40.5 11.2L24.5 27.216L19.7 22.416"
        stroke={theme.color.secondary.bright}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CheckCircleLarge() {
  return (
    <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <Path
        d="M66.6666 37.5621V40.0154C66.6634 45.7659 64.8013 51.3612 61.3582 55.9669C57.9151 60.5727 53.0754 63.942 47.5609 65.5725C42.0464 67.2029 36.1527 67.0071 30.7586 65.0143C25.3645 63.0215 20.7591 59.3383 17.6292 54.5143C14.4994 49.6902 13.0128 43.9836 13.3911 38.2456C13.7695 32.5076 15.9925 27.0456 19.7287 22.6743C23.4649 18.3029 28.5141 15.2564 34.1231 13.9891C39.7322 12.7219 45.6007 13.3017 50.8533 15.6421M66.6666 18.6668L40 45.3602L32 37.3602"
        stroke={theme.color.secondary.normal}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Object.freeze({
  CheckCircle,
  CheckCircleLarge,
});
