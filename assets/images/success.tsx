import { theme } from "@/styles/theme";
import Svg, { Path } from "react-native-svg";

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

export default Object.freeze({
  CheckCircle,
});
