import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";

export function Back(props: Partial<TouchableOpacityProps>) {
  const { style, onPress, ...rest } = props;

  const currentStyles = {
    width: theme.size.lg,
    height: theme.size.lg,
    borderWidth: theme.borderWidth.hairline,
    borderColor: theme.color.white[100],
    borderRadius: theme.borderRadius.pill,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    ...(style as any),
  };

  return (
    <TouchableOpacity style={currentStyles} onPress={onPress} {...rest}>
      <Image.Chevron.Left onPress={onPress} />
    </TouchableOpacity>
  );
}
