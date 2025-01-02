import Svg, { Path, PathProps } from "react-native-svg";

import { theme } from "@/styles/theme";

export default function X(props: { path?: PathProps }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 7L7 17M7 7L17 17"
        stroke={theme.color.white["100"]}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
    </Svg>
  );
}
