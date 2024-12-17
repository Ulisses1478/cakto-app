import Svg, { Path, SvgProps, PathProps } from "react-native-svg";

function Left(props: SvgProps) {
  return (
    <Svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...props}>
      <Path
        d="M10 12.5L2 7L10 1.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Right(props: { svg?: SvgProps; path?: PathProps }) {
  return (
    <Svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      {...props.svg}
      style={{ transform: [{ rotate: "180deg" }] }}
    >
      <Path
        d="M10 12.5L2 7L10 1.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
    </Svg>
  );
}

export default Object.freeze({
  Left,
  Right,
});
