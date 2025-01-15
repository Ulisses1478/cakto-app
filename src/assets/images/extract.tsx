import { Svg, Path } from "react-native-svg";

function AutomaticDebit() {
  return (
    <Svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <Path
        d="M5.33301 18.4001C5.33301 18.4001 5.46242 19.3059 9.21145 23.055C12.9605 26.804 19.0389 26.804 22.7879 23.055C24.1162 21.7267 24.9739 20.106 25.3609 18.4001M5.33301 18.4001V24.8001M5.33301 18.4001H11.733M26.6663 14.1334C26.6663 14.1334 26.5369 13.2276 22.7879 9.47852C19.0389 5.72949 12.9605 5.72949 9.21145 9.47852C7.88316 10.8068 7.02548 12.4275 6.63842 14.1334M26.6663 14.1334V7.73341M26.6663 14.1334H20.2663"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function Transfer() {
  return (
    <Svg width="33" height="32" viewBox="0 0 33 32" fill="none">
      <Path
        d="M26.13 21.9258H7.16699M7.16699 21.9258L11.9077 17.1851M7.16699 21.9258L11.9077 26.6666M7.16699 10.074H26.13M26.13 10.074L21.3892 5.33325M26.13 10.074L21.3892 14.8147"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default {
  AutomaticDebit,
  Transfer,
};
