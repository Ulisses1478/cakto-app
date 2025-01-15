import Svg, { Path, PathProps } from "react-native-svg";

function Up(props?: { fill?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20V4M12 4L6 10M12 4L18 10"
        stroke={props?.fill ?? "white"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Down(props: { fill?: string }) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4V20M12 20L6 14M12 20L18 14"
        stroke={props?.fill ?? "white"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default {
  Up,
  Down,
};
