import { theme } from "@/styles/theme";
import Svg, { Path } from "react-native-svg";

function Triangle() {
  return (
    <Svg width="49" height="48" viewBox="0 0 49 48" fill="none">
      <Path
        d="M24.5 20.1395V26.3753M24.5 32.611H24.5156M22.3414 12.1761L9.51932 34.3232C8.80813 35.5517 8.45253 36.1659 8.50509 36.67C8.55093 37.1097 8.7813 37.5092 9.13885 37.7692C9.54878 38.0673 10.2585 38.0673 11.678 38.0673H37.322C38.7415 38.0673 39.4512 38.0673 39.8611 37.7692C40.2187 37.5092 40.4491 37.1097 40.4949 36.67C40.5475 36.1659 40.1919 35.5517 39.4807 34.3232L26.6586 12.176C25.95 10.952 25.5957 10.34 25.1334 10.1345C24.7302 9.95518 24.2698 9.95518 23.8666 10.1345C23.4043 10.34 23.05 10.952 22.3414 12.1761Z"
        stroke={theme.color.yellow.alert}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function X() {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.4 6.6L6.6 11.4M6.6 6.6L11.4 11.4M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
        stroke={theme.color.red.negative}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Object.freeze({
  Triangle,
  X,
});
