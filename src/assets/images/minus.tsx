import { theme } from "@/styles/theme";
import Svg, { Path } from "react-native-svg";

export default function Minus() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12H19"
        stroke={theme.color.secondary.normal}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
