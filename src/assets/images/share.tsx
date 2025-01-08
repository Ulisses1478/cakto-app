import Svg, { Path, PathProps } from "react-native-svg";

export default function Share(props: { path?: PathProps }) {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
      <Path
        d="M9.972 13.208L15.436 16.392M15.428 7.608L9.972 10.792M19.9 6.4C19.9 7.72548 18.8255 8.8 17.5 8.8C16.1745 8.8 15.1 7.72548 15.1 6.4C15.1 5.07452 16.1745 4 17.5 4C18.8255 4 19.9 5.07452 19.9 6.4ZM10.3 12C10.3 13.3255 9.22548 14.4 7.9 14.4C6.57452 14.4 5.5 13.3255 5.5 12C5.5 10.6745 6.57452 9.6 7.9 9.6C9.22548 9.6 10.3 10.6745 10.3 12ZM19.9 17.6C19.9 18.9255 18.8255 20 17.5 20C16.1745 20 15.1 18.9255 15.1 17.6C15.1 16.2745 16.1745 15.2 17.5 15.2C18.8255 15.2 19.9 16.2745 19.9 17.6Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props.path}
      />
    </Svg>
  );
}
