import { theme } from "@/styles/theme";
import Svg, { Path } from "react-native-svg";

export default function Edit() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 19.219H20M4 19.219H5.48848C5.92331 19.219 6.14073 19.219 6.34533 19.1699C6.52673 19.1263 6.70014 19.0545 6.8592 18.957C7.03861 18.8471 7.19234 18.6933 7.49981 18.3859L18.6667 7.21896C19.4031 6.48258 19.4031 5.28867 18.6667 4.55228C17.9303 3.8159 16.7364 3.81591 16 4.55229L4.83312 15.7192C4.52565 16.0267 4.37192 16.1804 4.26197 16.3598C4.1645 16.5189 4.09267 16.6923 4.04912 16.8737C4 17.0783 4 17.2957 4 17.7305V19.219Z"
        stroke={theme.color.secondary.normal}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
