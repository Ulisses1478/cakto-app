import Svg, { Path, PathProps } from "react-native-svg";

import { theme } from "@/styles/theme";

export default function Edit(props: { path?: PathProps }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.8309 10.4803L13.5197 7.16916M4 20L6.80157 19.6887C7.14385 19.6507 7.315 19.6317 7.47496 19.5799C7.61688 19.5339 7.75194 19.469 7.87648 19.3869C8.01684 19.2943 8.1386 19.1726 8.38213 18.9291L19.3142 7.99696C20.2286 7.0826 20.2286 5.60013 19.3143 4.68577C18.3999 3.77141 16.9174 3.77141 16.0031 4.68577L5.07094 15.6179C4.82742 15.8614 4.70566 15.9832 4.6131 16.1235C4.53098 16.2481 4.46606 16.3831 4.42012 16.525C4.36833 16.685 4.34932 16.8561 4.31128 17.1984L4 20Z"
        stroke={theme.color.secondary.normal}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
    </Svg>
  );
}
