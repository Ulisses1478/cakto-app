import Svg, { Path, SvgProps } from "react-native-svg";

import { theme } from "@/styles/theme";

function Small(props?: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.33333 4H14.6667M4 6.66667H20M18.2222 6.66667L17.5989 16.0171C17.5053 17.42 17.4586 18.1215 17.1556 18.6533C16.8888 19.1216 16.4864 19.498 16.0015 19.7331C15.4506 20 14.7476 20 13.3416 20H10.6584C9.25236 20 8.54936 20 7.99852 19.7331C7.51356 19.498 7.11119 19.1216 6.84443 18.6533C6.54143 18.1215 6.49467 17.42 6.40114 16.0171L5.77778 6.66667"
        stroke={theme.color.red.negative_ligther}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Medium(props?: SvgProps) {
  return (
    <Svg width="49" height="48" viewBox="0 0 49 48" fill="none" {...props}>
      <Path
        d="M19.1667 8H29.8333M8.5 13.3333H40.5M36.9444 13.3333L35.6977 32.0343C35.5107 34.8401 35.4171 36.243 34.8111 37.3067C34.2776 38.2432 33.4729 38.9961 32.503 39.4661C31.4013 40 29.9953 40 27.1833 40H21.8167C19.0047 40 17.5987 40 16.497 39.4661C15.5271 38.9961 14.7224 38.2432 14.1889 37.3067C13.5829 36.243 13.4893 34.8401 13.3023 32.0343L12.0556 13.3333"
        stroke={theme.color.red.negative_ligther}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Object.freeze({
  Small,
  Medium,
});
