import { Image } from "@/assets/images";
import { theme } from "@/styles/theme";
import { Pressable } from "react-native";

export function Back(props: { onPress: () => void }) {
  return (
    <Pressable
      style={{
        width: theme.size.lg,
        height: theme.size.lg,
        borderWidth: theme.borderWidth.hairline,
        borderColor: theme.color.white[100],
        borderRadius: theme.borderRadius.pill,
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <Image.Chevron.Left />
    </Pressable>
  );
}
